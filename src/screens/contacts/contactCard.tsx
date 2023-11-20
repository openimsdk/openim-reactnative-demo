import { Image, StyleSheet, Text, View } from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../components/avatar";
const ContactCard = ({ nickname,faceURL,userID}:{nickname:string,faceURL:string,userID:string}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // Single function to handle various navigation paths
  const handlePress = () => {
    switch (userID) {
      case 'newFriend':
        navigation.navigate('Friends');
        break;
      case 'newGroup':
        navigation.navigate('NewGroup');
        break;
      case 'myGroup':
        navigation.navigate('MyGroup');
        break;
      default:
        navigation.navigate('FriendSettingPage', userID);
        break;
    }
  };

  // If no nickname is provided, return null
  if (!nickname) return null;

  // Repeated JSX structure
  return (
    <TouchableOpacity style={styles.contactItem} onPress={handlePress}>
      <Avatar nickname={nickname} faceURL={faceURL} />
      <Text>{nickname}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    backgroundColor: "white",
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default ContactCard;
