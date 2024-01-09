import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import Avatar from '../../components/avatar';
import {useUserStore} from '../../store/user';
import {getBusinessUserInfo} from '../../api/requests';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GetOneConversation} from '../../api/openimsdk';
import {ConversationItem} from '../../types/entity';

interface FriendSettingPageProps {
  route: {
    params: string;
  };
}
const FriendSettingPage = (route: FriendSettingPageProps) => {
  //TODO seperate views
  const [currentUserInfo, setCurrentUserInfo] = useState({
    nickname: '',
    faceURL: '',
    userID: '',
  });
  const [pinContact, setPinContact] = useState(false);
  const [muteContact, setMuteContact] = useState(false);

  getBusinessUserInfo([route.route.params])
    .then(response => {
      // Check if the response contains an error
      if ('error' in response) {
        console.error('Error fetching business user info:', response.error);
        // Handle the error case, like setting state or displaying a message
      } else if (response.users && response.users.length > 0) {
        // Ensure that users array is present and not empty
        setCurrentUserInfo(response.users[0]);
      } else {
        // Handle the case where users array is empty or not present
        console.error('No user data received');
        // Optionally, handle this case in your UI
      }
    })
    .catch(error => {
      console.error('Error in getBusinessUserInfo call:', error);
      // Handle errors that might have occurred during the request
    });

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleConversation = async () => {
    const item: ConversationItem = JSON.parse(
      await GetOneConversation(currentUserInfo.userID, 1),
    );
    navigation.navigate('ChatRoom', {item});
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          {/* Add your back button component here */}
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Contact Info</Text>
        <TouchableOpacity>
          {/* Add your edit button component here */}
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Avatar
          nickname={currentUserInfo.nickname}
          faceURL={currentUserInfo.faceURL}
        />
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
            <Text style={styles.settingText}>Pin this contact</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={pinContact ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={newValue => setPinContact(newValue)}
              value={pinContact}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Mute</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={muteContact ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={newValue => setMuteContact(newValue)}
              value={muteContact}
            />
          </View>
          <TouchableOpacity
            style={styles.settingItem}
            // onPress={() => navigateToSetting('destroyAfterReading')}
          >
            <Text style={styles.settingText}>Destroy after reading</Text>
            <Text style={styles.settingStatus}>Off</Text>
            {/* Replace this Text with an icon if needed */}
            <Text style={styles.settingArrow}>&gt;</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            // onPress={() => navigateToSetting('clearHistoryRegularly')}
          >
            <Text style={styles.settingText}>Clear history regularly</Text>
            <Text style={styles.settingStatus}>On</Text>
            {/* Replace this Text with an icon if needed */}
            <Text style={styles.settingArrow}>&gt;</Text>
          </TouchableOpacity>

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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#3498db',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff50',
  },
  backButton: {
    // Style for a text-based back button
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  editButton: {
    // Style for a text-based edit button
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
    color: '#888',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 24,
  },
  button: {
    // Style for buttons such as Message, Audio & Video, Search
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#e1e1e1', // A light grey background
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#3498db',
    fontWeight: '600',
  },
  settings: {
    width: '70%',
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  settingText: {
    fontSize: 18,
    fontWeight: '400',
  },
  clearChatButton: {
    // Style for the 'Clear chat' button
    marginTop: 24,
    backgroundColor: '#ff3b30',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '90%',
    alignSelf: 'center', // Center the button horizontally
  },
  clearChatButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  // Style for switches
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}], // Slightly smaller switches
  },
  // Style for setting options that navigate to another screen (indicated by an arrow or similar)
  settingOption: {
    fontSize: 16,
    color: 'black',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  settingOptionText: {
    // Text style for options
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  settingOptionIcon: {
    // Placeholder for the navigation icon in each setting option
    color: '#333',
    paddingRight: 10,
  },
});

export default FriendSettingPage;
