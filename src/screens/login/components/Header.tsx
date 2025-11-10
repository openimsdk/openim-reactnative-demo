import { RootStackNavigationProp } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Header() {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBakButton}>
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
  navBakButton: {
    width: 24,
    height: 24,
  },
  navBackIcon: {
    width: '100%',
    height: '100%',
  },
});
