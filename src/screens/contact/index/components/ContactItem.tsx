import { StyleSheet, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import new_friends from "@/assets/images/contact/new_friends.png";
import new_groups from "@/assets/images/contact/new_groups.png";
import my_friends from "@/assets/images/contact/my_friends.png";
import my_groups from "@/assets/images/contact/my_groups.png";
import RowListItem from "@/components/RowListItem";
import { ApplicationStackParamList } from "@/types/navigation";

const styles = StyleSheet.create({
  btn: {
    width: 30,
    height: 30,
  },
  gap: {
    height: 8,
    backgroundColor: "#F8F9FA",
  },
});

const Items = [
  { id: 0, title: "New Friends", img: new_friends },
  { id: 1, title: "New Groups", img: new_groups },
  { id: 2, title: "Friends", img: my_friends },
  { id: 3, title: "Groups", img: my_groups },
];

const ContactItem = () => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const toPage = (id: number) => {
    if (id === 0) navigation.navigate("NewFriend");
    if (id === 1) navigation.navigate("NewGroup");
    if (id === 2) navigation.navigate("MyFriend");
    if (id === 3) navigation.navigate("MyGroup");
  };

  return (
    <View>
      {Items.slice(0, 2).map((item, i) => (
        <RowListItem key={item.id} {...item} showLine={i === 0} callback={toPage} />
      ))}
      <View style={styles.gap} />
      {Items.slice(2, 4).map((item, i) => (
        <RowListItem key={item.id} {...item} showLine={i === 0} callback={toPage} />
      ))}
    </View>
  );
};

export default ContactItem;
