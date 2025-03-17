import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import add from "@/assets/images/chatFooter/add.png";
import { TextInput } from "react-native-paper";
import { FC, useState } from "react";
import { useSendMessage } from "@/hooks/useSendMessage";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";
import { useCurrentMemberRole } from "@/hooks/useCurrentMemberRole";
import { useConversationStore } from "@/store/conversation";
import { useContactStore } from "@/store/contact";
import { GroupStatus } from "@/constants";
import image from "@/assets/images/chatFooter/image.png";
import keyboard from "@/assets/images/chatFooter/keyboard.png";

type FooterProps = {
  scrollToBottom: () => void;
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 16,
  },
  add: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  content: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderColor: "gray",
  },
  black: {
    width: "100%",
    backgroundColor: "#F0F2F6",
    alignItems: "center",
    paddingVertical: 28,
    borderRadius: 16,
  },
  actions: {
    backgroundColor: "#F0F2F6",
  },
});

const Footer: FC<FooterProps> = ({ scrollToBottom }) => {
  const [text, setText] = useState("");
  const [showActions, setShowActions] = useState(false);
  const { sendMessage } = useSendMessage();
  const { isJoinGroup, currentIsMuted } = useCurrentMemberRole();
  const conversationStore = useConversationStore();

  const onSubmitEditing = async () => {
    const message = await OpenIMSDKRN.createTextMessage(text, uuidv4());
    sendMessage({ message });
    setText("");
    scrollToBottom();
  };

  const isBlackUser = useContactStore(
    (state) => state.blackList.findIndex((user) => user.userID === conversationStore.currentConversation?.userID) !== -1,
  );
  const isMutedGroup = useConversationStore((state) => state.currentGroupInfo?.status === GroupStatus.Muted);

  const getIsCanSendMessage = () => {
    if (conversationStore.currentConversation?.userID) {
      return !isBlackUser;
    }

    if (!isJoinGroup) {
      return false;
    }

    return !currentIsMuted;
  };

  if (!getIsCanSendMessage()) {
    let tip = "Cannot send messages in a group chat that you have quit!";
    if (isMutedGroup) tip = "The administrator or group owner has muted everyone!";
    if (currentIsMuted) tip = "You have been muted by the administrator or group owner!";
    if (isBlackUser) tip = "This user has been added to the blacklist!";

    return (
      <View style={styles.black}>
        <Text>{tip}</Text>
      </View>
    );
  }

  const selectImage = async () => {
    const response = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
    });
    if (response.didCancel || response.errorCode) return;
    if (response.assets && response.assets.length > 0) {
      let { uri } = response.assets[0];
      if (uri) {
        if (uri.startsWith("file://")) {
          uri = uri.substring(7);
        }
        const message = await OpenIMSDKRN.createImageMessageFromFullPath(uri, uuidv4());
        sendMessage({ message });
      }
    }
  };

  return (
    <View>
      <View style={[styles.footer, showActions ? styles.actions : null]}>
        <TouchableOpacity onPress={() => setShowActions((b) => !b)}>
          <Image style={styles.add} source={showActions ? keyboard : add} />
        </TouchableOpacity>
        <View style={styles.content}>
          <TextInput
            mode="outlined"
            dense
            outlineStyle={styles.input}
            value={text}
            onChangeText={(str) => setText(str)}
            onFocus={scrollToBottom}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
      </View>
      {showActions && (
        <View style={{ backgroundColor: "#F0F2F6", paddingHorizontal: 16, paddingBottom: 16, flexDirection: "row" }}>
          <TouchableOpacity onPress={selectImage}>
            <View style={{ alignItems: "center", padding: 12 }}>
              <Image source={image} />
              <Text>Photos</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Footer;
