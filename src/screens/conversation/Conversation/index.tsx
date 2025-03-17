import { StyleSheet, View } from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";

import { useGlobalEvent } from "@/hooks/useGlobalEvents";
import { useConversationStore } from "@/store/conversation";

import Header from "./components/Header";
import ConversationListItem from "./components/ConversationListItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 8,
    marginBottom: 110,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 65,
    backgroundColor: "#4285F4",
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 65,
  },
  backRightBtnLeft: {
    backgroundColor: "#9E9E9E",
    right: 65,
  },
  backRightBtnRight: {
    backgroundColor: "#EA4335",
    right: 0,
  },
});

const Conversation = () => {
  const conversationList = useConversationStore((state) => state.conversationList);

  useGlobalEvent();

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.border}>
        <SwipeListView
          data={conversationList}
          renderItem={(data) => <ConversationListItem conversation={data.item} />}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey="0"
          keyExtractor={(item) => item.conversationID}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
    </View>
  );
};

export default Conversation;
