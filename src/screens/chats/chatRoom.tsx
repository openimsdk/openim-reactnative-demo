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
  const flatListRef = useRef<FlatList>(null);
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const {getHistoryMessageListByReq} = useMessageStore.getState();
  const [user, setUser] = useState({
    faceURL: '',
    nickname: '',
  });
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    updateCurrentConversation(conversation.route.params.item);
    getHistoryMessageListByReq();
    if (currentConversation?.conversationType === 1) {
      const getUser = async () => {
        try {
          const data = await GetUsersInfo([
            conversation.route.params.item!.userID,
          ]);

          setUser(JSON.parse(data)[0].publicInfo);
        } catch (error) {
          // Handle errors here
          console.error(error);
        }
      };
      getUser();
    }
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
  const messages = useMessageStore(state => state.historyMessageList);
  useEffect(() => {
    MarkConversationMessageAsRead(
      conversation.route.params.item.conversationID,
    );
    if (initialLoadDone && messages.length > 0) {
      // If the initial messages are loaded and there are messages, scroll to the bottom
      flatListRef.current?.scrollToEnd({animated: true});
    }
  }, [messages]);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const pushNewMessage = useMessageStore(state => state.pushNewMessage);
  const updateOneMessage = useMessageStore(state => state.updateOneMessage);
  const [inputMessage, setInputMessage] = useState(''); // State to hold the input message
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
            <Avatar faceURL={user.faceURL} nickname={user.nickname} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.nickname}</Text>
              {/* <Text style={styles.onlineStatus}>{user.onlineStatus}</Text> */}
            </View>
          </View>
        ) : null}
      </View>
      <FlatList
        style={styles.messageList}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef}
        extraData={messages}
        renderItem={({item: message}) => {
          if (message.contentType === 101) {
            return <TextChatCard message={message} />;
          } else if (message.contentType === 102) {
            return <ImageCard message={message} />;
          } else {
            // Return a placeholder component or an empty View for other cases
            return <View />;
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
        onContentSizeChange={() => {
          // // Scroll to the bottom when content size changes
          if (!initialLoadDone) {
            flatListRef.current?.scrollToEnd({animated: false});
            setInitialLoadDone(true);
          }
        }}
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
