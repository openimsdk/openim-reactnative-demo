// FriendCard.js
import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import Avatar from '../../components/avatar';
import {AddFriend} from '../../api/openimsdk';
interface FriendCardInput {
  nickname: string;
  faceURL: string;
  userID: string;
}
const FriendCard = ({nickname, faceURL, userID}: FriendCardInput) => {
  const handleAddFriend = () => {
    AddFriend(userID);
  };
  return (
    <View style={styles.contactItem}>
      <Avatar nickname={nickname} faceURL={faceURL} />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{nickname}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Button title="Add Friend" onPress={handleAddFriend} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default FriendCard;
