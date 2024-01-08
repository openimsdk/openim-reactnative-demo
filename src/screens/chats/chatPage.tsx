import React, {useEffect} from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ConversationCard from './conversationCard';
import {useConversationStore} from '../../store/conversation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ConversationItem} from '../../store/types/entity';

const ChatPage = () => {
  const conversationList: ConversationItem[] = useConversationStore(
    state => state.conversationList,
  );
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const renderConversationItem: ListRenderItem<ConversationItem> = ({item}) => {
    if (!item.conversationID) {
      return null; // or some placeholder component
    }

    return <ConversationCard item={item} />;
  };

  const handleAddFriend = () => {
    navigator.navigate('AddFriend');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.button}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Contacts</Text>
        <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
          <Text>Add Friend</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={conversationList}
        keyExtractor={item => item.conversationID || `item-${Math.random()}`}
        extraData={conversationList}
        renderItem={renderConversationItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
  header: {
    backgroundColor: '#F6F6F6FF',
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  button: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    // marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: '#E5E5E5FF',
    textAlign: 'center',
  },
});
export default ChatPage;
