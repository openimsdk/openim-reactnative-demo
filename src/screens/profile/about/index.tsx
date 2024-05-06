import { Image, StyleSheet, Text, View } from "react-native";

import about_logo from "@/assets/images/profile/about_logo.png";
import NavBar from "@/components/NavBar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  content: {
    marginTop: 30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  version: {
    marginTop: 16,
    fontSize: 16,
  },
});

const About = () => {
  return (
    <View style={styles.container}>
      <NavBar title="About OpenIM" style={styles.border} />
      <View style={styles.content}>
        <Image source={about_logo} />
        <Text style={styles.version}>IM-RCER 3.5.1+1 SDK 3.5.1</Text>
      </View>
    </View>
  );
};

export default About;
