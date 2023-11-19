import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../../components/avatar";
import { useState, useEffect, useMemo } from "react";
import { API } from "../api/typings";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ChatRoom from "./chatRoom";
import { GetAdvancedHistoryMessageListReverse, MarkConversationMessageAsRead } from "../api/openimsdk";
import { ConversationItem, MessageItem } from "../../../store/types/entity";
import { useConversationStore } from "../../../store/conversation";
import { formatMessageByType } from "../../components/formatMsg";
const formatDate = (timestamp: number) => {
  // Your date formatting logic here
  // Consider using a library like date-fns for simplicity
  const date = new Date(timestamp);
  const currentTime = new Date()
  // Use various methods to get the components of the date and time
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const currentYear = currentTime.getFullYear();
  const currentMonth = currentTime.getMonth() + 1; // Months are zero-based, so add 1
  const currentDay = currentTime.getDate();
  const currentHours = currentTime.getHours();
  const currrentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  const formattedHours = String(hours).padStart(2, "0")
  const formattedMinutes = String(minutes).padStart(2, "0")
  // Format the date and time as a string
  let formattedDate = "";
  if (currentYear == year && currentMonth == month && currentDay == day)
    formattedDate = `${formattedHours}:${formattedMinutes}`
  else if (currentYear == year && currentMonth == month && currentDay == day + 1)
    formattedDate = `Yesterday`
  else
    formattedDate = `${year}-${month}-${day}`;
  return formattedDate
};
const ConversationCard = ({ item }: { item: ConversationItem }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const updateCurrentConversation = useConversationStore(state => state.updateCurrentConversation);

  const handleConversation = async () => {
    MarkConversationMessageAsRead(item.conversationID);
    navigation.navigate('ChatRoom', { item });
  };
  const getLatestMessageContent = () => {
    if (item.latestMsg) {
      return formatMessageByType(JSON.parse(item.latestMsg) as MessageItem);
    }
    return "";
  };
  const showMsgTime = useMemo(() => formatDate(item.latestMsgSendTime), [item.latestMsgSendTime]);
  const latestMessageContent = useMemo(() => getLatestMessageContent(), [item]);

  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.contactItem} onPress={handleConversation}>
      <Avatar nickname={item.showName} faceURL={item.faceURL} />
      <View style={styles.messageContainer}>
        <View style={styles.row}>
          <Text>{item.showName}</Text>
          <Text>{showMsgTime}</Text>
        </View>
        <View style={styles.messageRow}>
          <Text>{latestMessageContent}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    flexDirection: "row",
    backgroundColor: "white",
  },
  messageContainer: { flex: 1 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  unreadBadge: {
    backgroundColor: "red",
    borderRadius: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  unreadText: {
    color: "white"
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default ConversationCard;
