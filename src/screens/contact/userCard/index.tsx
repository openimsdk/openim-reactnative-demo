import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import add from "@/assets/images/contact/add.png";
import more from "@/assets/images/chatHeader/more.png";
import NavBar from "@/components/NavBar";
import OIMAvatar from "@/components/OIMAvatar";
import { Button } from "react-native-paper";
import RowListItem from "@/components/RowListItem";
import { useUserStore } from "@/store/user";
import { useContactStore } from "@/store/contact";
import { useConversationStore } from "@/store/conversation";
import { AllowType, SessionType } from "@/constants";
import { useConversationToggle } from "@/hooks/useConversationToggle";
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
  btn: {
    width: 26,
    height: 26,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  content: {
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "500",
    color: "black",
  },
  addBtn: {
    marginLeft: "auto",
    borderRadius: 8,
  },
  list: {
    marginTop: 20,
  },
  btnBox: {
    marginTop: "auto",
    marginBottom: 100,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chat: {
    width: "90%",
    borderRadius: 8,
    paddingVertical: 2,
  },
});

const UserCard = () => {
  const userStore = useUserStore();
  const contactStore = useContactStore();
  const conversationStore = useConversationStore();
  const { toSpecifiedConversation } = useConversationToggle();
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();

  const isSelf = contactStore.userCardData?.baseInfo?.userID === userStore.selfInfo.userID;
  const friendInfo = contactStore.friendList.find((friend) => friend.userID === contactStore.userCardData.baseInfo?.userID);

  const canAddFriend = () => {
    if (friendInfo) {
      return false;
    }
    if (contactStore.userCardData.groupMemberInfo) {
      return conversationStore.currentGroupInfo?.applyMemberFriend === AllowType.Allowed;
    }

    return true;
  };

  const toConversation = () => {
    toSpecifiedConversation({
      sourceID: contactStore.userCardData.baseInfo?.userID as string,
      sessionType: SessionType.Single,
    });
  };

  const toAddFriend = () =>
    navigation.navigate("SendApplication", {
      isGroup: false,
      sourceID: contactStore.userCardData.baseInfo?.userID as string,
      isScan: false,
    });
  const toDetails = () => navigation.navigate("UserCardDetails");
  const toSetting = () => navigation.navigate("UserCardSetting");

  const Items = [{ id: 0, title: "Profile" }];

  const Rigth = (
    <TouchableOpacity onPress={toSetting}>
      <Image source={more} style={styles.btn} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NavBar title="" style={styles.border} rigth={isSelf ? null : Rigth} />
      <View style={styles.header}>
        <OIMAvatar
          faceURL={contactStore.userCardData.baseInfo?.faceURL}
          text={contactStore.userCardData.baseInfo?.nickname}
          size={60}
          fontSize={26}
        />
        <View style={styles.content}>
          <Text style={styles.name}>{contactStore.userCardData.baseInfo?.nickname}</Text>
          <Text>{contactStore.userCardData.baseInfo?.userID}</Text>
        </View>
        {canAddFriend() && (
          <Button
            mode="contained"
            style={styles.addBtn}
            onPress={toAddFriend}
            icon={({ color }) => (
              <TouchableOpacity>
                <Image source={add} style={{ width: 24, height: 24, tintColor: color, marginRight: -8 }} />
              </TouchableOpacity>
            )}
          >
            Add
          </Button>
        )}
      </View>
      <View style={styles.list}>
        {Items.map((item) => (
          <RowListItem key={item.id} {...item} callback={toDetails} />
        ))}
      </View>
      <View style={styles.btnBox}>
        {!isSelf && (
          <Button mode="contained" style={styles.chat} onPress={toConversation}>
            Chat
          </Button>
        )}
      </View>
    </View>
  );
};

export default UserCard;
