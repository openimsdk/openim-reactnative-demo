import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Avatar from '../../components/avatar';
import {useUserStore} from '../../store/user';
import {useAuth} from '../../components/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LogoutIM} from '../../api/openimsdk';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Assuming you have this package installed

const SettingPage = () => {
  const {setLoginState} = useAuth();
  const currentUserInfo = useUserStore(state => state.selfInfo);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleLogout = async () => {
    try {
      await LogoutIM();
      setLoginState(false); // Update the login state after successful logout
      navigation.navigate('LoginPage'); // Navigate to the login page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Contact Info</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Avatar
          style={styles.avatarStyle} // pass your custom style here
          nickname={currentUserInfo.nickname}
          faceURL={currentUserInfo.faceURL}
        />
        <Text style={styles.name}>{currentUserInfo.nickname}</Text>
        <Text style={styles.email}>{currentUserInfo.userID}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
    justifyContent: 'center', // center content vertically
  },
  avatarStyle: {
    // If you have a custom Avatar component, you might pass styles directly
    // If not, adjust your Avatar component to accept a style prop
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: 8,
  },
  email: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
    width: '80%', // Set width according to your UI design
  },
  buttonText: {
    color: 'white',
    textAlign: 'center', // Center the text inside the button
    fontWeight: '600',
  },
});

export default SettingPage;
