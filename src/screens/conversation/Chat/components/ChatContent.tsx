import { SystemMessageTypes } from "@/constants";
import { useMessageStore } from "@/store/message";
import { ExMessageItem } from "@/store/type";
import { useRequest } from "ahooks";
import { FC, RefObject, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NotificationMessage from "./NotificationMessage";
import MessageItem from "./MessageItem";

type ChatContentProps = {
  flatListRef: RefObject<FlatList<ExMessageItem>>;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

const ChatContent: FC<ChatContentProps> = ({ flatListRef }) => {
  const messageStore = useMessageStore();
  const getHistoryMessageList = useMessageStore((state) => state.getHistoryMessageListByReq);

  const { runAsync: initMessages, cancel } = useRequest(getHistoryMessageList, {
    manual: true,
  });

  useEffect(() => {
    initMessages();
    return () => {
      cancel();
    };
  }, []);

  return (
    <View style={styles.content}>
      <FlatList
        ref={flatListRef}
        inverted
        data={messageStore.historyMessageList}
        onEndReached={() => initMessages(true)}
        renderItem={(item) => {
          if (SystemMessageTypes.includes(item.item.contentType)) {
            return <NotificationMessage message={item.item} />;
          }
          return <MessageItem message={item.item} />;
        }}
        keyExtractor={(item) => item.clientMsgID}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ChatContent;
