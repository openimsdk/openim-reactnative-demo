import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Avatar from '../../components/avatar';
import TextChatCard from './chatCards/textChatCard';
import {
  GetAdvancedHistoryMessageListReverse,
  GetSelfInfo,
  GetUsersInfo,
  MarkConversationMessageAsRead,
  SendMessage,
} from '../../api/openimsdk';
import {API} from '../../api/typings';
import {useMessageStore} from '../../store/message';
import {useConversationStore} from '../../store/conversation';
import {ConversationItem} from '../../types/entity';
import OpenIMSDKRN from 'open-im-sdk-rn';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import ImageCard from './chatCards/imageCard';
import OptionModalView from './optionsModalView';
import {SendMsgParams} from '../../types/params';

const ChatRoom = (conversation: {
  route: {params: {item: ConversationItem}};
}) => {
  const updateCurrentConversation = useConversationStore(
    state => state.updateCurrentConversation,
  );
  const currentConversation = useConversationStore(
    state => state.currentConversation,
  );
  const messages = useMessageStore(state => state.historyMessageList);
  const flatListRef = useRef<FlatList>(null);
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const {getHistoryMessageListByReq} = useMessageStore.getState();
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const pushNewMessage = useMessageStore(state => state.pushNewMessage);
  const [inputMessage, setInputMessage] = useState(''); // State to hold the input message

  useEffect(() => {
    updateCurrentConversation(conversation.route.params.item);
    getHistoryMessageListByReq();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      const previousLength = messages.length;
      await getHistoryMessageListByReq(true); // Load more messages
      const newLength = useMessageStore.getState().historyMessageList.length;
      const newMessagesCount = newLength - previousLength;
      if (newMessagesCount > 0) {
        // Adjust scroll position based on number of new messages
        flatListRef.current?.scrollToIndex({
          index: newMessagesCount,
          animated: false,
        });
      }
    } catch (error) {
      console.error('Error refreshing messages:', error);
    }
    setIsRefreshing(false);
  };
  const handleLayout = () => {
    if (!initialLoadDone) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: false});
      }, 5);
      setTimeout(() => {
        setInitialLoadDone(true);
      }, 50);
    }
  };

  // Function to handle sending a message
  const sendMessage = async () => {
    // Add your logic to send the message here
    let text;
    try {
      const data = await OpenIMSDKRN.createTextMessage(inputMessage, '289893');

      text = data;
    } catch (error) {
      console.error('Error CreateTextMsg:', error); // Log the error
    }

    const offlinePushInfo = {
      title: 'you have a new message',
      desc: 'new message',
      ex: '',
      iOSPushSound: '+1',
      iOSBadgeCount: true,
    };
    if (currentConversation) {
      const options: SendMsgParams = {
        message: text,
        recvID: currentConversation.userID,
        groupID: currentConversation.groupID,
        offlinePushInfo,
      };
      const msg = await SendMessage(options);
      pushNewMessage(msg);
    }

    setInputMessage(''); // Clear the input field after sending
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigator.goBack()}>
          <Image source={require('../../../assets/imgs/back.png')} />
        </TouchableOpacity>
        {currentConversation?.conversationType === 1 ? (
          <View style={styles.userInfo}>
            <Avatar
              faceURL={conversation.route.params.item!.faceURL}
              nickname={conversation.route.params.item!.showName}
            />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>
                {conversation.route.params.item!.showName}
              </Text>
              {/* <Text style={styles.onlineStatus}>{user.onlineStatus}</Text> */}
            </View>
          </View>
        ) : null}
      </View>
      {!initialLoadDone && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <FlatList
        style={styles.messageList}
        data={messages}
        initialNumToRender={15}
        keyExtractor={item => item.clientMsgID}
        ref={flatListRef}
        renderItem={({item: message}) => {
          if (message.contentType === 101) {
            return <TextChatCard message={message} />;
          } else if (message.contentType === 102) {
            return <ImageCard message={message} />;
          } else {
            // Return a placeholder component or an empty View for other cases
            return <Text>Message not support on demo now</Text>;
          }
        }}
        refreshControl={
          <RefreshControl
            title={'Loading'} //android中设置无效
            colors={['red']} //android
            tintColor={'red'} //ios
            titleColor={'red'}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 200));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
            });
          });
        }}
        onLayout={handleLayout}
        onContentSizeChange={() => {}}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.moreOptionsButton}
          onPress={toggleModal}>
          <Image
            style={styles.moreOptionsButtonImage}
            source={require('../../../assets/imgs/options.png')}></Image>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={text => setInputMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        <OptionModalView isVisible={showModal} onClose={toggleModal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff', // Set your desired background color
    zIndex: 4,
  },
  backButton: {
    // Define your back button styles here
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  userDetails: {
    marginLeft: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineStatus: {
    fontSize: 14,
    color: '#888', // Adjust the color as needed
  },
  messageList: {
    flex: 1, // Allow the message list to take up the remaining space
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCDCDCff',
    zIndex: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff', // Set your desired background color
  },
  moreOptionsButton: {},
  moreOptionsButtonImage: {},
  input: {
    flex: 1, // Allow the input field to grow
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF', // Set your desired button background color
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff', // Set your desired button text color
  },
});

export default ChatRoom;
