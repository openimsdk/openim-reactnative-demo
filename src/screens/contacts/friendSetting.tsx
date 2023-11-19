import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from '../../components/avatar';
import { useUserStore } from '../../../store/user';
import { getBusinessUserInfo } from '../api/requests';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GetOneConversation } from '../api/openimsdk';
import { ConversationItem } from '../../../store/types/entity';

interface SetVerificationPageProps {
  route: {
      params: string;
  };
}
const FriendSettingPage = (route:SetVerificationPageProps) => { //TODO seperate views
  const [currentUserInfo,setCurrentUserInfo] = useState({nickname:'',faceURL:'',userID:''})
  getBusinessUserInfo([route.route.params]).then((response) => {
    // Handle the response here  
    setCurrentUserInfo(response.data.data.users[0])
  })
  .catch((error) => {
    // Handle errors here
    console.error('Error:', error);
  });
  
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleConversation = async () =>  {
    const item:ConversationItem = JSON.parse(await GetOneConversation(currentUserInfo.userID,1))
      navigation.navigate('ChatRoom',{item})
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* Add your back button component here */}
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Contact Info</Text>
        <TouchableOpacity style={styles.editButton}>
          {/* Add your edit button component here */}
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Avatar nickname={currentUserInfo.nickname} faceURL={currentUserInfo.faceURL} />
        <Text style={styles.name}>{currentUserInfo.nickname}</Text>
        <Text style={styles.email}>{currentUserInfo.userID}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleConversation}>
            {/* Message button with icon */}
            <Text>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            {/* Audio & Video button with icon */}
            <Text>Audio & Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            {/* Search button with icon */}
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settings}>
          <View style={styles.settingItem}>
            <Text>Pin this contact</Text>
            {/* On/Off switch for pinning */}
          </View>
          <View style={styles.settingItem}>
            <Text>Mute</Text>
            {/* On/Off switch for muting */}
          </View>
          <View style={styles.settingItem}>
            <Text>Destroy after reading</Text>
            {/* On/Off switch for destroying after reading */}
          </View>
          <View style={styles.settingItem}>
            <Text>Clear history regularly</Text>
            {/* On/Off switch for clearing history regularly */}
          </View>
          <View style={styles.settingItem}>
            <Text>Wallpaper</Text>
            {/* On/Off switch for changing wallpaper */}
          </View>
          <View style={styles.settingItem}>
            <Text>Friend settings</Text>
            {/* On/Off switch for friend settings */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3498db',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  editButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  settings: {
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default FriendSettingPage;
