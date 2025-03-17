import NavBar from "@/components/NavBar";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

const ChangeName = () => {
  return (
    <View style={styles.container}>
      <NavBar title="ChangeName" style={styles.border} />
    </View>
  );
};

export default ChangeName;
