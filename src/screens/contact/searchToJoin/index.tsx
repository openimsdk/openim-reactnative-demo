import NavBar from "@/components/NavBar";
import InfoItem from "@/components/InfoItem";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { useState } from "react";
import { useContactStore } from "@/store/contact";
import OpenIMSDKRN from "open-im-sdk-rn";
import { searchBusinessUserInfo } from "@/api/chat";
import { BusinessUserInfo } from "@/types/chat";
import { GroupItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { useUserStore } from "@/store/user";
import { ApplicationStackParamList } from "@/types/navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    marginTop: 8,
    marginHorizontal: 16,
  },
  search: {
    borderRadius: 10,
    backgroundColor: "#F4F5F7",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  list: {
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  empty: {
    alignItems: "center",
    marginTop: 120,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptyText: {
    marginTop: 16,
    textAlign: "center",
    maxWidth: 220,
    fontSize: 16,
  },
});

const Empty = () => {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>No results found</Text>
      <Text style={styles.emptyText}>Please try again with other search terms</Text>
    </View>
  );
};

const SearchToJoin = () => {
  const userStore = useUserStore();
  const contactStore = useContactStore();
  const setUserCardData = useContactStore((status) => status.setUserCardData);

  const route = useRoute();
  const { isGroup } = route.params as { isGroup: boolean };
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();

  const [empty, setEmpty] = useState(false);
  const [keyword, setKeyword] = useState("");

  const [userList, setUserList] = useState<BusinessUserInfo[]>();
  const [group, setGroup] = useState<GroupItem | null>();

  const title = isGroup ? "Add Group" : "Add Friend";
  const placeholder = isGroup ? "Search group’s ID number" : "Search name, email, or phone";

  const searchGroups = async () => {
    try {
      let info = contactStore.groupList.find((item) => item.groupID === keyword);
      if (!info) {
        const data = await OpenIMSDKRN.getSpecifiedGroupsInfo([keyword], "opid");
        info = data[0];
      }
      if (info) {
        setGroup(info);
        setEmpty(false);
      } else {
        setGroup(null);
        setEmpty(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchUsers = async () => {
    try {
      const {
        data: { users, total },
      } = await searchBusinessUserInfo(keyword);
      if (total > 0) {
        setUserList(users.filter((user) => user.userID !== userStore.selfInfo.userID));
        setEmpty(false);
      } else {
        setUserList([]);
        setEmpty(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = async () => {
    if (!keyword) return;
    if (isGroup) {
      await searchGroups();
    } else {
      await searchUsers();
    }
  };

  const toPage = (item: BusinessUserInfo) => {
    setUserCardData({ baseInfo: item });
    navigation.navigate("UserCard");
  };

  return (
    <View style={styles.container}>
      <NavBar title={title} />
      <Searchbar
        placeholder={placeholder}
        onChangeText={setKeyword}
        value={keyword}
        style={styles.search}
        onSubmitEditing={onSearch}
      />
      <View style={styles.list}>
        {!isGroup && (
          <FlatList
            data={userList}
            renderItem={({ item }) => <InfoItem faceURL={item.faceURL} name={item.nickname} callback={() => toPage(item)} />}
          />
        )}
        {isGroup && group && <InfoItem faceURL={group?.faceURL} name={group?.groupName} isGroup />}
        {empty && <Empty />}
      </View>
    </View>
  );
};

export default SearchToJoin;
