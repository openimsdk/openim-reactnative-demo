import OIMAvatar from "@/components/OIMAvatar";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";
import { ConversationItem, MessageItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { FC } from "react";
import { formatConversionTime, getConversationContent, isGroupSession } from "@/utils/imCommon";
import { useConversationStore } from "@/store/conversation";

type ConversationItemProps = {
  conversation: ConversationItem;
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    backgroundColor: "white",
  },
  content: {
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    color: "black",
    marginBottom: 4,
  },
  right: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  time: {
    marginBottom: 4,
  },
  unread: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#2D9DFE",
  },
  count: {
    color: "white",
    fontSize: 12,
  },
});

const ConversationListItem: FC<ConversationItemProps> = ({ conversation }) => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const updateCurrentConversation = useConversationStore((state) => state.updateCurrentConversation);

  const toChat = () => {
    updateCurrentConversation({ ...conversation });
    navigation.navigate("Chat");
  };

  const formattedMessage = () => {
    let parsedMessage: MessageItem | undefined;
    try {
      parsedMessage = JSON.parse(conversation.latestMsg);
    } catch (e) {
      console.log("parsedMessage error");
    }
    if (!parsedMessage) return "";
    return getConversationContent(parsedMessage);
  };

  const isGroup = isGroupSession(conversation.conversationType);

  return (
    <TouchableHighlight onPress={toChat}>
      <View style={styles.container}>
        <OIMAvatar faceURL={conversation.faceURL} text={conversation.showName} size={47} fontSize={20} isGroup={isGroup} />
        <View style={styles.content}>
          <Text style={styles.name}>{conversation.showName}</Text>
          <Text>{formattedMessage()}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.time}>{formatConversionTime(conversation.latestMsgSendTime)}</Text>
          {conversation.unreadCount > 0 && (
            <View style={styles.unread}>
              <Text style={styles.count}>{conversation.unreadCount || ""}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ConversationListItem;
