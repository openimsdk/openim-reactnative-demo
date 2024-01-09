import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import ConversationCard from './conversationCard';
import {useConversationStore} from '../../store/conversation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ConversationItem} from '../../types/entity';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatPage = () => {
  const conversationList: ConversationItem[] = useConversationStore(
    state => state.conversationList,
  );
  const navigator = useNavigation<NativeStackNavigationProp<any>>();

  const renderConversationItem: ListRenderItem<ConversationItem> = ({item}) => {
    return <ConversationCard item={item} />;
  };

  const handleAddFriend = () => {
    navigator.navigate('AddFriend');
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Chats</Text>
        <TouchableOpacity onPress={handleAddFriend}>
          <Ionicons name="add-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#000"
          style={styles.searchIcon}
        />
        <TextInput placeholder="Search" style={styles.searchBar} />
      </View>
      <FlatList
        data={conversationList}
        keyExtractor={item => item.conversationID}
        renderItem={renderConversationItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5FF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    paddingHorizontal: 8,
  },
  searchBar: {
    flex: 1,
    padding: 8,
    paddingRight: 40, // to avoid text overlapping the icon
    fontSize: 16,
    
  },
});

export default ChatPage;
