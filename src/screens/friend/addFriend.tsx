import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useUserStore } from '../../../store/user';
import { AddFriend } from '../api/openimsdk';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const AddFriendScreen = () => {
const currentId = useUserStore((state) => state.selfInfo);
  const [otherUserId, setOtherUserId] = useState('');
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const handleAddFriend = () => {
    AddFriend(otherUserId);
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigator.goBack()}>
          <Image source={require("../../../assets/imgs/back.png")} />
        </TouchableOpacity>
      <Text>Your User ID: {currentId.userID}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Other User's ID"
        value={otherUserId}
        onChangeText={(text) => setOtherUserId(text)}
      />
      <Button title="Add Friend" onPress={handleAddFriend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
});

export default AddFriendScreen;
