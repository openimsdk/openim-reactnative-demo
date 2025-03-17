import OIMAvatar from "@/components/OIMAvatar";
import { StyleProp, StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";

import { ExMessageItem } from "@/store/type";

import { FC } from "react";
import { useUserStore } from "@/store/user";
import { MessageType } from "@/constants";
import TextMessageRender from "./TextMessageRender";
import MediaMessageRender from "./MediaMessageRender";
import CatchMessageRender from "./CatchMessageRender";

type MessageItemProps = {
  message: ExMessageItem;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  containerSelf: {
    flexDirection: "row-reverse",
  },
  content: {
    marginHorizontal: 8,
  },
  bg: {
    backgroundColor: "#EEEEEE",
    color: "black",
  },
  self: {
    backgroundColor: "#0089FF",
    color: "white",
  },
  msgContent: {
    maxWidth: 260,
    padding: 8,
    borderRadius: 8,
  },
  time: {
    color: "#8896A3",
    fontSize: 12,
  },
});

export interface IMessageItemProps {
  message: ExMessageItem;
  isSender: boolean;
  disabled?: boolean;
  conversationID?: string;
  messageUpdateFlag?: string;
  style: StyleProp<any>;
}

const components: Record<number, FC<IMessageItemProps>> = {
  [MessageType.TextMessage]: TextMessageRender,
  [MessageType.PictureMessage]: MediaMessageRender,
  [MessageType.VideoMessage]: MediaMessageRender,
};

const MessageItem: FC<MessageItemProps> = ({ message }) => {
  const selfUserID = useUserStore((state) => state.selfInfo.userID);
  const isSender = selfUserID === message.sendID;

  const containerStyle = isSender ? [styles.container, styles.containerSelf] : [styles.container];
  const contentStyle = isSender ? [styles.msgContent, styles.self] : [styles.msgContent, styles.bg];

  const MessageRenderComponent = components[message.contentType] || CatchMessageRender;
  return (
    <View style={containerStyle}>
      {!isSender && <OIMAvatar faceURL={message.senderFaceUrl} text={message.senderNickname} size={40} fontSize={18} />}
      <View style={styles.content}>
        <MessageRenderComponent style={contentStyle} message={message} isSender={isSender} />
      </View>
      <Text style={styles.time}>{dayjs(message.sendTime).format("h:mmA")}</Text>
    </View>
  );
};

export default MessageItem;
