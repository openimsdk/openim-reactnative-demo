import NavBar from "@/components/NavBar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import to_group from "@/assets/images/conversation/to_group.png";
import { useConversationStore } from "@/store/conversation";
import OIMAvatar from "@/components/OIMAvatar";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  qr: {
    marginTop: 160,
  },
  content: {
    marginTop: 20,
    flexDirection: "row",
  },
  user: {
    width: 60,
    marginHorizontal: 30,
  },
  icon: {
    width: 60,
    height: 60,
  },
});

const SingleSetting = () => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const conversationStore = useConversationStore();

  const toCreateGroup = () => {
    if (!conversationStore.currentConversation) return;
    navigation.navigate("ChooseUser", {
      prevCheckedUserList: [
        {
          nickname: conversationStore.currentConversation?.showName,
          userID: conversationStore.currentConversation?.userID,
          faceURL: conversationStore.currentConversation?.faceURL,
          ex: "",
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <NavBar title="" style={styles.border} />
      <View style={styles.content}>
        <View style={styles.user}>
          <OIMAvatar
            faceURL={conversationStore.currentConversation?.faceURL}
            text={conversationStore.currentConversation?.showName}
            size={60}
            fontSize={28}
          />
          <Text numberOfLines={1} ellipsizeMode="tail">
            {conversationStore.currentConversation?.showName}
          </Text>
        </View>
        <TouchableOpacity onPress={toCreateGroup}>
          <Image style={styles.icon} source={to_group} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleSetting;
