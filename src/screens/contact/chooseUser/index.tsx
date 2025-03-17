import InfoItem from "@/components/InfoItem";
import NavBar from "@/components/NavBar";
import { useContactStore } from "@/store/contact";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AlphabetList } from "react-native-section-alphabet-list";
import { PublicUserItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { useRoute } from "@react-navigation/native";
import CheckedFooter from "./CheckedFooter";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  search: {
    borderRadius: 10,
    backgroundColor: "#F4F5F7",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    backgroundColor: "#F4F5F7",
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
});

const ChooseUser = () => {
  const route = useRoute();
  const contactStore = useContactStore();
  const { prevCheckedUserList } = route.params as { prevCheckedUserList: PublicUserItem[] };

  const [userList, setUserList] = useState<PublicUserItem[]>([...prevCheckedUserList]);

  const friendList = contactStore.friendList.map((item) => {
    return {
      value: item.nickname,
      key: item.userID,
      ...item,
    };
  });

  const onChangeCheck = (item: PublicUserItem) => {
    if (userList.some((user) => user.userID === item.userID)) {
      setUserList(userList.filter((user) => user.userID !== item.userID));
      return;
    }
    setUserList((prevList) => [...prevList, item]);
  };

  return (
    <View style={styles.container}>
      <NavBar title="New Group" />
      {/* <Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} style={styles.search} /> */}
      <View style={{ marginBottom: 80 }}>
        <AlphabetList
          data={friendList}
          renderCustomItem={(item: any) => (
            <InfoItem
              faceURL={item.faceURL}
              name={item.nickname}
              showCheck
              checked={userList.some((user) => user.userID === item.userID)}
              callback={() => onChangeCheck(item as PublicUserItem)}
            />
          )}
          renderCustomSectionHeader={(section) => (
            <View style={styles.title}>
              <Text>{section.title}</Text>
            </View>
          )}
        />
      </View>
      <CheckedFooter userList={userList} />
    </View>
  );
};

export default ChooseUser;
