import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../../components/avatar';
import { useUserStore } from '../../../store/user';

export const FriendRequestCard = ({ nickname, faceURL, handleResult, reqMsg, fromUserID }: { nickname: string, faceURL: string, handleResult: number, reqMsg: string, fromUserID: string }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  const handleViewPress = () => {
    navigation.navigate('FriendRequests', { nickname, faceURL, fromUserID, reqMsg });
  }

  const renderActionButton = () => {
    if(useUserStore(state=>state.selfInfo.userID === fromUserID)){
      return (
        <Text>Sent</Text>
      )
    }
    if (handleResult === 0) {
      return (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleViewPress}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }

  const renderResult = () => {
    if (handleResult === -1) {
      return <Text>Rejected</Text>;
    }
    if (handleResult === 1) {
      return <Text>Accepted</Text>;
    }
    return null;
  }

  return (
    <View style={styles.contactItem}>
      <Avatar nickname={nickname} faceURL={faceURL} />
      <View style={styles.infoContainer}>
        <Text>{nickname}</Text>
        {renderResult()}
      </View>
      {renderActionButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  actionButton: {
    backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});

export default FriendRequestCard;
