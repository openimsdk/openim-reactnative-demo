import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GroupJoinSource } from "@/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import NavBar from "@/components/NavBar";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";
import { feedbackToast } from "@/utils/common";
import { useState } from "react";
import { TextInput } from "react-native-paper";

type SendApplicationProps = {
  isGroup: boolean;
  sourceID: string;
  isScan: boolean;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  send: {
    color: "black",
  },
  input: {
    height: 100,
  },
  title: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  outline: {
    borderWidth: 0,
  },
});

const SendApplication = () => {
  const route = useRoute();
  const { isGroup, sourceID, isScan } = route.params as SendApplicationProps;

  const [massge, setMessage] = useState("");
  const navigation = useNavigation();

  const sendApplication = () => {
    let func;
    if (isGroup) {
      func = OpenIMSDKRN.joinGroup(
        {
          groupID: sourceID,
          reqMsg: massge,
          joinSource: isScan ? GroupJoinSource.QrCode : GroupJoinSource.Search,
        },
        uuidv4(),
      );
    } else {
      func = OpenIMSDKRN.addFriend(
        {
          toUserID: sourceID,
          reqMsg: massge,
        },
        uuidv4(),
      );
    }
    func
      .then(() => {
        feedbackToast({ msg: "Send successfully" });
        navigation.goBack();
      })
      .catch((error) => feedbackToast({ msg: "Send Failed", error }));
  };

  const Rigth = (
    <TouchableOpacity onPress={sendApplication}>
      <Text style={styles.send}>Send</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NavBar title="Send Application" style={styles.border} rigth={Rigth} />
      <Text style={styles.title}>Send Application Request</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        dense
        multiline
        maxLength={20}
        outlineStyle={styles.outline}
        value={massge}
        onChangeText={(text: string) => setMessage(text)}
      />
    </View>
  );
};

export default SendApplication;
