import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import add from "@/assets/images/conversation/add.png";
import loading from "@/assets/images/conversation/loading.png";
import OIMAvatar from "@/components/OIMAvatar";
import { useState } from "react";
import { Menu } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";
import { useUserStore } from "@/store/user";

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginBottom: 4,
  },
  status: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 4,
  },
  blue: {
    color: "#2D9DFE",
  },
  add: {
    width: 28,
    height: 28,
    marginLeft: "auto",
  },
});

const Header = () => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const selfInfo = useUserStore((state) => state.selfInfo);
  const syncing = useUserStore((state) => state.syncing);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const goSearchToJoin = (isGroup: boolean) => {
    navigation.navigate("SearchToJoin", { isGroup });
    closeMenu();
  };

  const toCreateGroup = () => {
    navigation.navigate("ChooseUser", { prevCheckedUserList: [] });
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <OIMAvatar faceURL={selfInfo.faceURL} text={selfInfo.nickname} size={70} fontSize={32} />
        <View style={styles.content}>
          <Text style={styles.name}>{selfInfo.nickname}</Text>
          {syncing && (
            <View style={styles.status}>
              <Image source={loading} />
              <Text style={[styles.statusText, styles.blue]}>Synchronize</Text>
            </View>
          )}
        </View>
      </View>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchorPosition="bottom"
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Image style={styles.add} source={add} />
          </TouchableOpacity>
        }
      >
        <Menu.Item leadingIcon="account-plus-outline" onPress={() => goSearchToJoin(false)} title="Add Friend" />
        <Menu.Item leadingIcon="account-multiple-plus-outline" onPress={() => goSearchToJoin(true)} title="Add Group" />
        <Menu.Item leadingIcon="comment-plus-outline" onPress={toCreateGroup} title="Create Group" />
      </Menu>
    </View>
  );
};

export default Header;
