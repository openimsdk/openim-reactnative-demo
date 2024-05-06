import { useConversationStore } from "@/store/conversation";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import search from "@/assets/images/conversation/search.png";
import useGroupMemberList from "@/hooks/useGroupMemberList";
import InfoItem from "@/components/InfoItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";
import { GroupMemberRole } from "@/constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  member: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: 16,
  },
  memberTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
});

const GroupMember = () => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const conversationStore = useConversationStore();
  const { fetchState } = useGroupMemberList({
    groupID: conversationStore.currentGroupInfo?.groupID,
  });

  const toMemberList = () => navigation.navigate("GroupMemberList");

  const Right = (role: GroupMemberRole) => {
    if (role === GroupMemberRole.Admin) return <Text>Admin</Text>;
    if (role === GroupMemberRole.Owner) return <Text>Owner</Text>;
    return null;
  };

  return (
    <TouchableOpacity onPress={toMemberList}>
      <View style={styles.container}>
        <View style={styles.member}>
          <Text style={styles.memberTitle}>{conversationStore.currentGroupInfo?.memberCount} Members</Text>
          <Image source={search} />
        </View>
        <FlatList
          style={{ flexGrow: 0, flexShrink: 1 }}
          data={fetchState.groupMemberList.slice(0, 3)}
          renderItem={({ item }) => <InfoItem faceURL={item.faceURL} name={item.nickname} right={Right(item.roleLevel)} />}
        />
      </View>
    </TouchableOpacity>
  );
};

export default GroupMember;
