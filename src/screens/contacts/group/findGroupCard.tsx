import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import Avatar from '../../../components/avatar';
import { JoinGroup } from '../../api/openimsdk';
interface GroupCardInput{
  groupID:string, 
  nickname:string, 
  faceURL:string,
}
const GroupCard = ({groupID, nickname, faceURL}:GroupCardInput) => {
  const handleAddGroup = () => {
    JoinGroup(groupID,3)
  };
  return (
    <View style={styles.contactItem}>
      <Avatar nickname={nickname} faceURL={faceURL} />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{nickname}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Button title="Add Group" onPress={handleAddGroup} />
        </View>
      </View>
    </View>
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
export default GroupCard;
