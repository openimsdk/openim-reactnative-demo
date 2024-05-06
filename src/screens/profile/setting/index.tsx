import { StyleSheet, View } from "react-native";

import NavBar from "@/components/NavBar";
import RowListItem from "@/components/RowListItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";
import { useState } from "react";
import Dialog from "react-native-dialog";
import OpenIMSDKRN from "open-im-sdk-rn";
import { feedbackToast } from "@/utils/common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  list: {
    marginTop: 8,
  },
});

const Items = [
  { id: 0, title: "Block Contacts" },
  { id: 1, title: "Clear Chat", danger: true },
];

const Setting = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();

  const toPage = (id: number) => {
    if (id === 0) return navigation.navigate("BlackList");
    setVisible(true);
    return null;
  };

  const tryClearChatLogs = () => {
    setVisible(false);
    OpenIMSDKRN.deleteAllMsgFromLocalAndSvr("opid")
      .then(() => {
        feedbackToast({ msg: "successfully" });
      })
      .catch((error) => feedbackToast({ error }));
  };

  return (
    <View style={styles.container}>
      <NavBar title="Setting" style={styles.border} />
      <View style={styles.list}>
        {Items.map((item) => (
          <RowListItem key={item.id} {...item} callback={() => toPage(item.id)} />
        ))}
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Clear Chat</Dialog.Title>
        <Dialog.Description>Are you sure to clear your chat history?</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
        <Dialog.Button label="Delete" onPress={tryClearChatLogs} />
      </Dialog.Container>
    </View>
  );
};

export default Setting;
