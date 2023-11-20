import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {FlatList} from 'react-native-gesture-handler';
import {SearchGroup} from '../../api/openimsdk';
import FriendCard from '../../friend/friendCard';
import GroupCard from './findGroupCard';
import { GroupItem } from '../../../../store/types/entity';

const FindGroupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const [searchResults, setSearchResults] = useState<GroupItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const result = await SearchGroup([searchTerm],true,false);
        setSearchResults(result);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Friends"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
      </View>

      {/* Display search results as cards */}
      {searchResults === null ||
      searchResults.length === 0 ||
      searchTerm === '' ? (
        <Text>No friend matches the search word.</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={group => group.groupID}
          renderItem={({item: group}) => (
            // <Text>{JSON.stringify(group)}</Text>
            <GroupCard
              key={group.groupID}
              nickname={group.groupName}
              faceURL={group.faceURL}
              groupID={group.groupID}
              // style={styles.friendCard} // Add a style prop to your FriendCard component
            />
          )}
          contentContainerStyle={styles.flatList} // Style the FlatList items
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: Platform.OS === 'ios' ? 50 : 0
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  backButton: {
    top: 16,
    left: 16,
  },
  userIDText: {
    marginBottom: 16,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  friendCard: {
    // Add any specific styles for your FriendCard here
  },
  flatList: {
    flexDirection: 'column',
  },
});

export default FindGroupPage;
