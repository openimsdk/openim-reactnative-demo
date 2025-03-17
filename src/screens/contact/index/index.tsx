import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import add from "@/assets/images/contact/add.png";
import NavBar from "@/components/NavBar";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";
import ContactItem from "./components/ContactItem";

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 20,
  },
  btn: {
    width: 30,
    height: 30,
  },
});

const Contact = () => {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();

  const toContactAdd = () => navigation.navigate("ContactAdd");

  const Rigth = (
    <TouchableOpacity onPress={toContactAdd}>
      <Image source={add} style={styles.btn} />
    </TouchableOpacity>
  );

  return (
    <View>
      <NavBar title="Contact" showBack={false} style={styles.border} rigth={Rigth} />
      <ContactItem />
    </View>
  );
};

export default Contact;
