import { StyleSheet, Text, View } from "react-native";
import { AlphabetList } from "react-native-section-alphabet-list";

import NavBar from "@/components/NavBar";
import { useContactStore } from "@/store/contact";
import InfoItem from "@/components/InfoItem";
import { FriendUserItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";

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

const MyFriend = () => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const setUserCardData = useContactStore((status) => status.setUserCardData);
  const contactStore = useContactStore();

  const friendList = contactStore.friendList.map((item) => {
    return {
      value: item.nickname,
      key: item.userID,
      ...item,
    };
  });

  const toPage = (item: FriendUserItem) => {
    setUserCardData({ baseInfo: item });
    navigation.navigate("UserCard");
  };

  return (
    <View style={styles.container}>
      <NavBar title="Friend" />
      <AlphabetList
        data={friendList}
        renderCustomItem={(item: any) => (
          <InfoItem faceURL={item.faceURL} name={item.nickname} callback={() => toPage(item as FriendUserItem)} />
        )}
        renderCustomSectionHeader={(section) => (
          <View style={styles.title}>
            <Text>{section.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyFriend;
