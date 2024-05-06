import { useEffect, useRef } from "react";
import OpenIMSDKRN from "open-im-sdk-rn";
import { View, FlatList, StyleSheet, Keyboard } from "react-native";
import { ExMessageItem } from "@/store/type";
import { useLatest } from "ahooks";
import { useConversationStore } from "@/store/conversation";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatContent from "./components/ChatContent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    width: "100%",
  },
});

const App = () => {
  const flatListRef = useRef<FlatList<ExMessageItem>>(null);
  const currentConversation = useConversationStore((state) => state.currentConversation);
  const latestCurrentConversation = useLatest(currentConversation);

  const checkUnread = () => {
    if (!latestCurrentConversation.current) return;
    if (latestCurrentConversation.current.unreadCount > 0) {
      OpenIMSDKRN.markConversationMessageAsRead(latestCurrentConversation.current.conversationID, "opid");
    }
  };

  useEffect(() => {
    checkUnread();
    return () => checkUnread();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 50);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", scrollToBottom);
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ChatContent flatListRef={flatListRef} />
      <Footer scrollToBottom={scrollToBottom} />
    </View>
  );
};

export default App;
