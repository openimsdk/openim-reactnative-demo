import { RootStackNavigationProp } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Header() {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('@/assets/images/icons/nav_back.png')} style={styles.navBackIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingVertical: 15,
  },
  navBackIcon: {
    width: 24,
    height: 24,
  },
});
