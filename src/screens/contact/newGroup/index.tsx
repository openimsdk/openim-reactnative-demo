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

const NewGroup = () => {
  const contactStore = useContactStore();

  const recvGroupList = contactStore.recvGroupApplicationList.sort((a) => (a.handleResult === 0 ? -1 : 1));
  const sendGroupList = contactStore.sendGroupApplicationList.sort((a) => (a.handleResult === 0 ? -1 : 1));

  const list = [...recvGroupList, ...sendGroupList];
  return (
    <View style={styles.container}>
      <NavBar title="New Groups" style={styles.border} />
      <FlatList
        data={list}
        renderItem={({ item }) => {
          if (recvGroupList.includes(item)) {
            return <ApplicationItem source={item} type={ApplicationTypeEnum.RecivedGroupApplication} />;
          }
          return <ApplicationItem source={item} type={ApplicationTypeEnum.SentGroupApplication} />;
        }}
      />
    </View>
  );
};

export default NewGroup;
