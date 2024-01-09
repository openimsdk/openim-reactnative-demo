import {Image, StyleSheet, Text, View} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Avatar from '../../components/avatar';
import {ConversationItem} from '../../types/entity';
import {GetOneConversation} from '../../api/openimsdk';

const MyGroupCard = ({
  nickname,
  faceURL,
  groupID,
}: {
  nickname: string;
  faceURL: string;
  groupID: string;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleConversation = async () => {
    const item: ConversationItem = JSON.parse(
      await GetOneConversation(groupID, 3),
    );
    navigation.navigate('ChatRoom', {item});
  };
  return (
    <TouchableOpacity style={styles.contactItem} onPress={handleConversation}>
      <Avatar nickname={nickname} faceURL={faceURL} />
      <Text>{nickname}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default MyGroupCard;
