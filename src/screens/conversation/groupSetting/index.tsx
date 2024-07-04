import NavBar from "@/components/NavBar";
import OIMAvatar from "@/components/OIMAvatar";
import { useConversationStore } from "@/store/conversation";
import { StyleSheet, Text, View } from "react-native";
import RowListItem from "@/components/RowListItem";
import Dialog from "react-native-dialog";
import { useState } from "react";
import { useCurrentMemberRole } from "@/hooks/useCurrentMemberRole";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";
import { feedbackToast } from "@/utils/common";
import { useMessageStore } from "@/store/message";

import GroupMember from "./GroupMember";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  qr: {
    marginTop: 160,
  },
  content: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    marginTop: 8,
    color: "black",
    fontSize: 20,
    fontWeight: "500",
  },
  id: {
    fontSize: 12,
    color: "#2D9DFE",
  },
  list: {
    marginTop: 16,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

const Items = [
  { id: 0, title: "Clear Chat History", danger: true, dialogDescription: "Are you sure to clear your chat history?" },
  {
    id: 1,
    title: "Exite Group",
    danger: true,
    dialogDescription: "After you exit, you will not be able to receive this group chat message.",
  },
  {
    id: 2,
    title: "Dismiss Group",
    danger: true,
    dialogDescription: "After disbanding, all group members will lose contact with the group members.",
  },
];

const GroupSetting = () => {
  const messageStore = useMessageStore();
  const conversationStore = useConversationStore();
  const { isOwner, isJoinGroup } = useCurrentMemberRole();

  const [visible, setVisible] = useState(false);
  const [itemID, setItemID] = useState(Items[0].id);
  const showItem = isOwner ? [Items[0], Items[2]] : Items.slice(0, 2);

  const clearLogs = () => {
    if (!conversationStore.currentConversation?.conversationID) return;
    OpenIMSDKRN.clearConversationAndDeleteAllMsg(conversationStore.currentConversation?.conversationID, uuidv4())
      .then(() => {
        messageStore.clearMessage();
        feedbackToast({ msg: "successfully" });
      })
      .catch((error: unknown) => feedbackToast({ error }));
  };

  const dismissOrQuit = () => {
    if (!conversationStore.currentConversation?.groupID) return;
    const funName = isOwner ? "dismissGroup" : "quitGroup";
    OpenIMSDKRN[funName](conversationStore.currentConversation?.groupID, uuidv4())
      .then(() => feedbackToast({ msg: "successfully" }))
      .catch((error: unknown) => feedbackToast({ error }));
  };

  const onConfirm = () => {
    setVisible(false);
    if (itemID === 0) {
      clearLogs();
      return;
    }
    dismissOrQuit();
  };

  const showDialog = (id: number) => {
    setVisible(true);
    setItemID(id);
  };

  return (
    <View style={styles.container}>
      <NavBar title="Group Setting" style={styles.border} />
      <View style={styles.content}>
        <OIMAvatar
          faceURL={conversationStore.currentGroupInfo?.faceURL}
          text={conversationStore.currentGroupInfo?.groupName}
          size={90}
          fontSize={32}
          isGroup
        />
        <Text style={styles.name}>{conversationStore.currentGroupInfo?.groupName}</Text>
        <Text style={styles.id}>{conversationStore.currentGroupInfo?.groupID}</Text>
      </View>
      {isJoinGroup && (
        <>
          <GroupMember />
          <View style={styles.list}>
            {showItem.map((item) => (
              <RowListItem key={item.id} {...item} callback={() => showDialog(item.id)} />
            ))}
          </View>
          <Dialog.Container visible={visible}>
            <Dialog.Title>{Items[itemID].title}</Dialog.Title>
            <Dialog.Description>{Items[itemID].dialogDescription}</Dialog.Description>
            <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
            <Dialog.Button label="Confirm" onPress={onConfirm} />
          </Dialog.Container>
        </>
      )}
    </View>
  );
};

export default GroupSetting;
