import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../../components/avatar";
import { AcceptFriendApplication, RefuseFriendApplication } from "../api/openimsdk";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
interface FriendRequestItem {
  faceURL: string;
  fromUserID: string;
  nickname: string; 
  reqMsg: string; 
}
const FriendRequestVerifyPage = (props: { route: { params: FriendRequestItem  }; }) => {
  const navigator = useNavigation<NativeStackNavigationProp<any>>();
  const friendRequestInfo = props.route.params
  const onhandleAccept = () => {
    const options = {
      toUserID: friendRequestInfo.fromUserID,
      handleMsg: 'ok, i agree',
    }
    AcceptFriendApplication(options)
    navigator.navigate("Friends")
  }
  const onhandleReject = () => {
    const options = {
      toUserID: friendRequestInfo.fromUserID,
      handleMsg: 'reject',
    }
    RefuseFriendApplication(options)
    navigator.navigate("Friends")
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigator.goBack()}>
          <Image source={require("../../../assets/imgs/back.png")} />
        </TouchableOpacity>
        <Text style={styles.title}>New Friend</Text>
        <View></View>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <View style={styles.avatarContainer}>
            <Avatar nickname={friendRequestInfo.nickname} faceURL={friendRequestInfo.faceURL} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{friendRequestInfo.nickname}</Text>
            <Text style={styles.requestInfo}>{friendRequestInfo.reqMsg}</Text>
          </View>
        </View>

        <View style={styles.bodyBottom}>
          <TouchableOpacity style={styles.buttonAccept} onPress={onhandleAccept}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonReject} onPress={onhandleReject}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: "space-between",
  },
  bodyTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  requestInfo: {
    fontSize: 14,
    color: "#888", // Adjust the color as needed
  },
  bodyBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  buttonAccept: {
    flex: 1,
    backgroundColor: "green", // Set the background color for the Accept button
    padding: 10,
    borderRadius: 5,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonReject: {
    flex: 1,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FriendRequestVerifyPage;
