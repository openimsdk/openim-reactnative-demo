import { useEffect, useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import OpenIMSDKRN from "open-im-sdk-rn";

import conversation from "@/assets/images/tabbar/conversation.png";
import conversation_active from "@/assets/images/tabbar/conversation_active.png";
import contacts from "@/assets/images/tabbar/contacts.png";
import contacts_active from "@/assets/images/tabbar/contacts_active.png";
import profile from "@/assets/images/tabbar/profile.png";
import profile_active from "@/assets/images/tabbar/profile_active.png";

import ConversationPage from "@/screens/conversation/Conversation";
import Contant from "@/screens/contact/index/index";
import Profile from "@/screens/profile";
import { getIMToken, getIMUserID } from "@/utils/storage";
import { initStore } from "@/utils/imCommon";
import { ApplicationScreenProps } from "@/types/navigation";
import { useConversationStore } from "@/store/conversation";
import { useContactStore } from "@/store/contact";

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
  label: {
    textAlign: "center",
    fontSize: 12,
  },
  barStyle: {
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    backgroundColor: "white",
  },
  activeIndicatorStyle: {
    backgroundColor: "white",
  },
});

const MyComponent = ({ navigation }: ApplicationScreenProps) => {
  const [index, setIndex] = useState(0);
  const contactStore = useContactStore();
  const unReadCount = useConversationStore((state) => state.unReadCount);
  const unHandleApplicationCount = () => {
    const recvFriendNum = contactStore.recvFriendApplicationList.filter((item) => item.handleResult === 0).length;
    const recvGroupNum = contactStore.recvGroupApplicationList.filter((item) => item.handleResult === 0).length;
    return recvFriendNum + recvGroupNum;
  };

  const loginCheck = async () => {
    try {
      const IMToken = await getIMToken();
      const IMUserID = await getIMUserID();
      console.log(IMToken, IMUserID);
      if (!IMToken && !IMUserID) {
        navigation.replace("Login");
      }
      await OpenIMSDKRN.login(
        {
          userID: IMUserID as string,
          token: IMToken as string,
        },
        "hrtyy45t",
      );
    } catch (err) {
      console.log(err);
      // navigation.replace("Login");
    }
    initStore();
  };

  useEffect(() => {
    loginCheck();
  }, []);

  const routes = [
    unReadCount > 0 ? { key: "conversation", title: "OpenIM", badge: unReadCount } : { key: "conversation", title: "OpenIM" },
    unHandleApplicationCount() > 0
      ? { key: "contant", title: "Contant", badge: unHandleApplicationCount() }
      : { key: "contant", title: "Contant" },
    { key: "you", title: "You" },
  ];

  const renderScene = BottomNavigation.SceneMap({
    conversation: ConversationPage,
    contant: Contant,
    you: Profile,
  });

  const renderIcon = ({ route, focused }: { route: BaseRoute; focused: boolean }) => {
    const images: { [key: string]: string } = {
      conversation: focused ? conversation_active : conversation,
      contant: focused ? contacts_active : contacts,
      you: focused ? profile_active : profile,
    };
    const key = route.key as keyof typeof images;

    return <Image source={images[key] as ImageSourcePropType} style={styles.icon} />;
  };

  const renderLabel = ({ route, focused }: { route: BaseRoute; focused: boolean }) => {
    const labelStyle = {
      color: focused ? "#2D9DFE" : "#8E9AB0",
      ...styles.label,
    };

    return <Text style={labelStyle}>{route.title}</Text>;
  };

  return (
    <BottomNavigation
      renderIcon={renderIcon}
      renderLabel={renderLabel}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={styles.barStyle}
      activeIndicatorStyle={styles.activeIndicatorStyle}
    />
  );
};

export default MyComponent;
