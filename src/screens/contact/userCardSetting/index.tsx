import NavBar from "@/components/NavBar";
import RowListItem from "@/components/RowListItem";
import { useContactStore } from "@/store/contact";
import { feedbackToast } from "@/utils/common";
import { useNavigation } from "@react-navigation/native";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import Dialog from "react-native-dialog";

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
    paddingHorizontal: 4,
  },
});

const UserCardSetting = () => {
  const [visible, setVisible] = useState(false);
  const contactStore = useContactStore();
  const navigation = useNavigation();
  const isBlack = contactStore.blackList.findIndex((user) => user.userID === contactStore.userCardData.baseInfo?.userID) > -1;

  const toggleBlack = (newValue: boolean) => {
    if (newValue) {
      OpenIMSDKRN.addBlack(
        {
          toUserID: contactStore.userCardData.baseInfo?.userID as string,
          ex: "",
        },
        uuidv4(),
      ).catch((error) => feedbackToast({ error }));
      return;
    }
    OpenIMSDKRN.removeBlack(contactStore.userCardData.baseInfo?.userID as string, uuidv4()).catch((error) =>
      feedbackToast({ error }),
    );
  };

  const tryRemoveFriend = () => {
    setVisible(false);
    OpenIMSDKRN.deleteFriend(contactStore.userCardData.baseInfo?.userID as string, uuidv4())
      .then(() => navigation.goBack())
      .catch((error) => feedbackToast({ error }));
  };

  const Items = [
    { id: 0, title: "Remark" },
    {
      id: 1,
      title: "Add to block-list",
      showArrows: false,
      rigthNode: <Switch value={isBlack} onValueChange={toggleBlack} />,
    },
    { id: 2, title: "Delete Contact", showArrows: false, danger: true },
  ];
  return (
    <View style={styles.container}>
      <NavBar title="Setting" style={styles.border} />
      <View style={styles.list}>
        {Items.map((item) => (
          <RowListItem key={item.id} {...item} callback={() => setVisible(true)} />
        ))}
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Delete Friend</Dialog.Title>
        <Dialog.Description>Are you sure you would like to delete name from your contact?</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
        <Dialog.Button label="Delete" onPress={tryRemoveFriend} />
      </Dialog.Container>
    </View>
  );
};

export default UserCardSetting;
