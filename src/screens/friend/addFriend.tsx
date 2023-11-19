import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import FriendCard from './friendCard';
import { searchBusinessUserInfo } from '../api/requests';
import { FlatList } from 'react-native-gesture-handler';
import { FriendUserItem } from '../../../store/type.d';

const AddFriendScreen = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const [searchResults, setSearchResults] = useState<FriendUserItem[]>([]);

  useEffect(() => {
    searchBusinessUserInfo(searchTerm)
      .then((response) => {
        // Handle the response here
        setSearchResults(response.data.data.users);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigator.goBack()}>
        <Image source={require('../../../assets/imgs/back.png')} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Friends"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
      </View>

      {/* Display search results as cards */}
      {searchResults === undefined || searchResults === null || searchResults.length === 0 || searchTerm === '' ? (
        <Text>No friend matches the search word.</Text>
      ) : (
        <FlatList
          data={searchResults || []}
          keyExtractor={(friend) => friend.userID.toString()}
          renderItem={({ item: friend }) => (
            <FriendCard
              key={friend.userID}
              nickname={friend.nickname}
              faceURL={friend.faceURL}
              userID={friend.userID}
            //style={styles.friendCard} // Add a style prop to your FriendCard component
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

export default AddFriendScreen;
