import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Avatar from "../../../components/avatar";
import { useUserStore } from "../../../../store/user";
import { ExMessageItem } from "../../../../store/message";

const TextChatCard = memo(({ message }: { message: ExMessageItem }) => {
  const isSelf = useUserStore(state => state.selfInfo.userID === message.sendID);
  if (message.contentType !== 101) return null;

  return isSelf ? <SelfTextMessage message={message} /> : <OtherTextMessage message={message} />;
});

const SelfTextMessage = ({ message }: { message: ExMessageItem }) => (
  <View style={styles.chatContainerSelf}>
    <View style={styles.selfMessageContainer}>
      <Text style={styles.messageText}>{message.senderNickname}</Text>
      <Text style={styles.messageText}>{message.textElem.content}</Text>
    </View>
    <View style={styles.avatarContainer}>
      <Avatar nickname={message.senderNickname} faceURL={message.senderFaceUrl ?? ''} />
    </View>
  </View>
);

const OtherTextMessage = ({ message }: { message: ExMessageItem }) => (
  <View style={styles.chatContainerOther}>
    <View style={styles.avatarContainer}>
      <Avatar nickname={message.senderNickname} faceURL={message.senderFaceUrl ?? ''} />
    </View>
    <View style={styles.otherMessageContainer}>
      <Text style={styles.messageText}>{message.senderNickname}</Text>
      <Text style={styles.messageText}>{message.textElem.content}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  chatContainerSelf: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 5,
  },
  chatContainerOther: {
    flexDirection: "row",
    marginVertical: 5,
  },
  avatarContainer: {
    marginHorizontal: 10,
  },
  selfMessageContainer: {
    alignItems: 'flex-end',
    maxWidth: "80%",
  },
  otherMessageContainer: {
    
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
});

export default TextChatCard;
