import InfoItem from "@/components/InfoItem";
import NavBar from "@/components/NavBar";
import { GroupMemberRole } from "@/constants";
import useGroupMemberList from "@/hooks/useGroupMemberList";
import { useConversationStore } from "@/store/conversation";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

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
});

const GroupMemberList = () => {
  // const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  // const getUserCardData = useContactStore((status) => status.getUserCardData);
  const conversationStore = useConversationStore();
  const { fetchState, getMemberData, searchMember } = useGroupMemberList({
    groupID: conversationStore.currentGroupInfo?.groupID,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const Right = (role: GroupMemberRole) => {
    if (role === GroupMemberRole.Admin) return <Text>Admin</Text>;
    if (role === GroupMemberRole.Owner) return <Text>Owner</Text>;
    return null;
  };

  const renderData = () => {
    if (searchQuery) {
      return fetchState.searchMemberList;
    }
    return fetchState.groupMemberList;
  };

  const onSearch = (str: string) => {
    setSearchQuery(str);
    fetchState.searchOffset = 0;
    fetchState.searchMemberList = [];
    searchMember(str);
  };

  // const toPage = (item: GroupMemberItem) => {
  //   getUserCardData({ baseInfo: item });
  //   navigation.navigate("UserCard");
  // };

  return (
    <View style={styles.container}>
      <NavBar title="Group Member" />
      <Searchbar placeholder="Search" onChangeText={(str) => onSearch(str)} value={searchQuery} style={styles.search} />
      <FlatList
        data={renderData()}
        onEndReached={() => getMemberData()}
        renderItem={({ item }) => <InfoItem faceURL={item.faceURL} name={item.nickname} right={Right(item.roleLevel)} />}
      />
    </View>
  );
};

export default GroupMemberList;
