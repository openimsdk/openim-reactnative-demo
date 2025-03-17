import { FlatList, StyleSheet, View } from "react-native";

import NavBar from "@/components/NavBar";
import ApplicationItem, { ApplicationTypeEnum } from "@/components/ApplicationItem";
import { useContactStore } from "@/store/contact";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

const NewFriend = () => {
  const contactStore = useContactStore();

  const recvFriendList = contactStore.recvFriendApplicationList.sort((a) => (a.handleResult === 0 ? -1 : 1));
  const sendFriendList = contactStore.sendFriendApplicationList.sort((a) => (a.handleResult === 0 ? -1 : 1));

  const list = [...recvFriendList, ...sendFriendList];
  return (
    <View style={styles.container}>
      <NavBar title="New Friends" style={styles.border} />
      <FlatList
        data={list}
        renderItem={({ item }) => {
          if (recvFriendList.includes(item)) {
            return <ApplicationItem source={item} type={ApplicationTypeEnum.RecivedFriendApplication} />;
          }
          return <ApplicationItem source={item} type={ApplicationTypeEnum.SentFriendApplication} />;
        }}
      />
    </View>
  );
};

export default NewFriend;
