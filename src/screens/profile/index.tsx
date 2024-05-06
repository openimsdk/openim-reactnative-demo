import OIMAvatar from "@/components/OIMAvatar";
import { useUserStore } from "@/store/user";
import { ApplicationStackParamList } from "@/types/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

import back from "@/assets/images/profile/back.png";
import qr_code from "@/assets/images/profile/qr_code.png";
import copy from "@/assets/images/profile/copy.png";
import info from "@/assets/images/profile/info.png";
import settings from "@/assets/images/profile/settings.png";
import about from "@/assets/images/profile/about.png";
import logout from "@/assets/images/profile/logout.png";
import RowListItem from "@/components/RowListItem";
import { useState } from "react";
import { copyToClipboard } from "@/utils/common";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBlockColor: "#ccc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "500",
    color: "black",
    marginBottom: 2,
  },
  status: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 4,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  back: {
    marginLeft: 2,
    width: 30,
    height: 30,
  },
  list: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
});

const Index = () => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const userStore = useUserStore();
  const [visible, setVisible] = useState(false);

  const Items = [
    { id: 0, title: "Profile", img: info },
    { id: 1, title: "Setting", img: settings },
    { id: 2, title: "About Us", img: about },
    { id: 3, title: "Sign Out", img: logout },
  ];

  const toPage = (id: number) => {
    if (id === 0) return navigation.navigate("SelfInfo");
    if (id === 1) return navigation.navigate("Setting");
    if (id === 2) return navigation.navigate("About");
    return setVisible(true);
  };

  const toQrCode = () => navigation.navigate("QrCode", { isGroup: false });

  const tryLogout = () => {
    setVisible(false);
    userStore.userLogout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const tryCopy = () => copyToClipboard(userStore.selfInfo.userID);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <OIMAvatar faceURL={userStore.selfInfo.faceURL} text={userStore.selfInfo.nickname} size={70} fontSize={32} />
          <View style={styles.content}>
            <Text style={styles.name}>{userStore.selfInfo.nickname}</Text>
            <TouchableOpacity onPress={tryCopy}>
              <View style={styles.status}>
                <Text style={styles.statusText}>{userStore.selfInfo.userID}</Text>
                <Image source={copy} style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={toQrCode}>
          <View style={styles.right}>
            <Image source={qr_code} style={styles.icon} />
            <Image source={back} style={styles.back} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        {Items.map((item) => (
          <RowListItem key={item.id} {...item} callback={toPage} />
        ))}
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Sign out</Dialog.Title>
        <Dialog.Description>Are you sure you would like to sign out your account?</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setVisible(false)} />
        <Dialog.Button label="Confirm" onPress={tryLogout} />
      </Dialog.Container>
    </View>
  );
};

export default Index;
