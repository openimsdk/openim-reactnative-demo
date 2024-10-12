import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";

import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { ConversationItem } from "open-im-sdk-rn/lib/typescript/types/entity";

import delete_img from "@/assets/images/conversation/delete.png";
import mark_read from "@/assets/images/conversation/mark_read.png";
import pin from "@/assets/images/conversation/pin.png";
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

  const updatePin = (conversationID: string, isPinned: boolean, rowMap: RowMap<ConversationItem>) => {
    OpenIMSDKRN.pinConversation(
      {
        conversationID,
        isPinned: !isPinned,
      },
      uuidv4(),
    );
    if (rowMap[conversationID]) {
      rowMap[conversationID].closeRow();
    }
  };

  const markHasRead = (conversationID: string, rowMap: RowMap<ConversationItem>) => {
    OpenIMSDKRN.markConversationMessageAsRead(conversationID, uuidv4());
    if (rowMap[conversationID]) {
      rowMap[conversationID].closeRow();
    }
  };

  const removeConversation = (conversationID: string, rowMap: RowMap<ConversationItem>) => {
    OpenIMSDKRN.deleteConversationAndDeleteAllMsg(conversationID, uuidv4());
    if (rowMap[conversationID]) {
      rowMap[conversationID].closeRow();
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.border}>
        <SwipeListView
          data={conversationList}
          renderItem={(data) => <ConversationListItem conversation={data.item} />}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.backLeftBtn]}
                onPress={() => updatePin(data.item.conversationID, data.item.isPinned, rowMap)}
              >
                <Image source={pin} />
              </TouchableOpacity>
              {data.item.unreadCount > 0 && (
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}
                  onPress={() => markHasRead(data.item.conversationID, rowMap)}
                >
                  <Image source={mark_read} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => removeConversation(data.item.conversationID, rowMap)}
              >
                <Image source={delete_img} />
              </TouchableOpacity>
            </View>
          )}
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
