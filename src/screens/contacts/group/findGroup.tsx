import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TextInput, StyleSheet, FlatList, Platform} from 'react-native';
import debounce from 'lodash.debounce';
import GroupCard from './findGroupCard';
import {SearchGroup} from '../../api/openimsdk';
import {GroupItem} from '../../../../store/types/entity';

const FindGroupPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<GroupItem[]>([]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const result = await SearchGroup([term], true, false);
      setSearchResults(result);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);
  
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Groups"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      {searchResults.length === 0 ? (
        <Text>No group matches the search word.</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(group) => group.groupID}
          renderItem={({ item }) => (
            <GroupCard
              key={item.groupID}
              nickname={item.groupName}
              faceURL={item.faceURL}
              groupID={item.groupID}
            />
          )}
          contentContainerStyle={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: Platform.OS === 'ios' ? 50 : 0,
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
