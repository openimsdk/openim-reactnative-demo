import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import back from "@/assets/images/chatHeader/back.png";
import more from "@/assets/images/chatHeader/more.png";
import OIMAvatar from "@/components/OIMAvatar";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";
import { useConversationStore } from "@/store/conversation";
import { SessionType } from "@/constants";
import OnlineStatus from "./OnlineStatus";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  content: {
    marginLeft: 16,
    flexDirection: "row",
  },
  contentText: {
    justifyContent: "center",
    marginLeft: 8,
  },
  name: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
  },
  back: {
    width: 28,
    height: 28,
  },
  moreBox: {
    marginLeft: "auto",
  },
  more: {
    width: 20,
    height: 20,
  },
});

const Header = () => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const currentConversation = useConversationStore((state) => state.currentConversation);

  const isSingle = currentConversation?.conversationType === SessionType.Single;

  const toConversation = () => navigation.goBack();
  const toSetting = () => (isSingle ? navigation.navigate("SingleSetting") : navigation.navigate("GroupSetting"));

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toConversation}>
        <Image style={styles.back} source={back} />
      </TouchableOpacity>
      <View style={styles.content}>
        <OIMAvatar
          faceURL={currentConversation?.faceURL}
          text={currentConversation?.showName}
          isGroup={Boolean(currentConversation?.groupID)}
          size={47}
          fontSize={20}
        />
        <View style={styles.contentText}>
          <Text style={styles.name}>{currentConversation?.showName}</Text>
          {isSingle && <OnlineStatus />}
        </View>
      </View>
      <View style={styles.moreBox}>
        <TouchableOpacity onPress={toSetting}>
          <Image style={styles.more} source={more} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
