import {Image, StyleSheet, Text, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Avatar from '../../components/avatar';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ContactCard = ({
  nickname,
  faceURL,
  userID,
}: {
  nickname: string;
  faceURL: string;
  userID: string;
}) => {
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

  return (
    <TouchableOpacity style={styles.contactItem} onPress={handlePress}>
      <Avatar nickname={nickname} faceURL={faceURL} />
      <View style={styles.textContainer}>
        <Text style={styles.nickname}>{nickname}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nickname: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  status: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
});

export default ContactCard;
