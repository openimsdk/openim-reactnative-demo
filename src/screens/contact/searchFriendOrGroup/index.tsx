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

const SearchFriendOrGroup = () => {
  return (
    <View style={styles.container}>
      <NavBar title="SearchFriendOrGroup" style={styles.border} />
    </View>
  );
};

export default SearchFriendOrGroup;
