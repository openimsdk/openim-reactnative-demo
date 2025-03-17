import { StyleSheet, View } from "react-native";

import add_create_group from "@/assets/images/contact/add_create_group.png";
import add_join_group from "@/assets/images/contact/add_join_group.png";
import add_search_user from "@/assets/images/contact/add_search_user.png";
import NavBar from "@/components/NavBar";
import RowListItem from "@/components/RowListItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  btn: {
    width: 30,
    height: 30,
  },
});

const Items = [
  { id: 1, title: "New Contact", subTitle: "Find by phone number/ID number", img: add_search_user },
  { id: 2, title: "New Group", subTitle: "Create a new group chat", img: add_create_group },
  { id: 3, title: "Join Group", subTitle: "Ask admin for group chat ID number", img: add_join_group },
];

const ContactAdd = () => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();

  const toPage = (id: number) => {
    if (id === 1) return navigation.navigate("SearchToJoin", { isGroup: false });
    if (id === 3) return navigation.navigate("SearchToJoin", { isGroup: true });
    return navigation.navigate("ChooseUser", { prevCheckedUserList: [] });
  };

  return (
    <View>
      <NavBar title="Add" style={styles.border} />
      {Items.map((item) => (
        <RowListItem key={item.id} {...item} callback={() => toPage(item.id)} />
      ))}
    </View>
  );
};

export default ContactAdd;
