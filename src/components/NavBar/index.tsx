import { Image, StyleProp, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import back from "@/assets/back.png";
import { FC } from "react";
import { useNavigation } from "@react-navigation/native";

type NavBarProps = {
  title: string;
  showBack?: boolean;
  rigth?: React.ReactNode;
  style?: StyleProp<any>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  img: {
    width: 30,
    height: 30,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "black",
  },
  left: {
    width: 40,
  },
  right: {
    width: 40,
  },
});

const NavBar: FC<NavBarProps> = ({ title, showBack = true, rigth, style }) => {
  const navigation = useNavigation();

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={toBack}>
            <Image style={styles.img} source={back} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>{rigth}</View>
    </View>
  );
};

export default NavBar;
