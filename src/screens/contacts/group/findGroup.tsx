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


import { FlatList } from 'react-native-gesture-handler';
import { SearchGroup } from '../../api/openimsdk';

const FindGroupPage = () => {
    
  const [searchTerm, setSearchTerm] = useState('');
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(SearchGroup(searchTerm))
    setSearchResults(SearchGroup(searchTerm))
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigator.goBack()}>
        <Image source={require('../../../../assets/imgs/back.png')} />
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
      {searchResults === null || searchResults.length === 0 || searchTerm === '' ? (
        <Text>No friend matches the search word.</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(friend) => friend.userID.toString()}
          renderItem={({ item: friend }) => (
            <FriendCard
              key={friend.userID}
              nickname={friend.nickname}
              faceURL={friend.faceURL}
              userID={friend.userID}
              style={styles.friendCard} // Add a style prop to your FriendCard component
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
    marginTop:20,
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

