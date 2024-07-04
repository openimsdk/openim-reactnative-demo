import InfoItem from "@/components/InfoItem";
import NavBar from "@/components/NavBar";
import { useContactStore } from "@/store/contact";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import search_empty from "@/assets/images/search_empty.png";
import { BlackUserItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { feedbackToast } from "@/utils/common";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  list: {
    marginTop: 6,
  },
  remove: {
    color: "#2D9DFE",
  },
  empty: {
    alignItems: "center",
    marginTop: 120,
  },
  emptyImg: {
    width: 147,
    height: 91,
  },
  emptyTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
  },
});

const Empty = () => {
  return (
    <View style={styles.empty}>
      <Image style={styles.emptyImg} source={search_empty} />
      <Text style={styles.emptyTitle}>No results found</Text>
    </View>
  );
};

const BlackList = () => {
  const contactStore = useContactStore();

  const blackRemove = ({ userID }: BlackUserItem) => {
    OpenIMSDKRN.removeBlack(userID, uuidv4()).catch((error) => feedbackToast({ error }));
  };

  return (
    <View style={styles.container}>
      <NavBar title="Block Contacts" style={styles.border} />
      {contactStore.blackList.length === 0 && <Empty />}
      <View style={styles.list}>
        <FlatList
          data={contactStore.blackList}
          renderItem={({ item }) => (
            <InfoItem
              faceURL={item.faceURL}
              name={item.nickname}
              right={
                <TouchableOpacity onPress={() => blackRemove(item)}>
                  <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default BlackList;
