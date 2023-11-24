import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Avatar from '../../components/avatar';
import { useUserStore } from '../../../store/user';
import { getBusinessUserInfo } from '../api/requests';
import { useAuth } from '../../../AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LogoutIM } from '../api/openimsdk';


const SettingPage = () => {
  const { setLoginState } = useAuth();;
  let curretnUserInfo = useUserStore((state) => state.selfInfo)
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  const handleLogout = async () => {
    try {
      await LogoutIM();
      setLoginState(false); // Update the login state after successful logout
      navigation.navigate('LoginPage'); // Navigate to the login page
    } catch (error) {
      const err = error as {message: string};
      console.error(err)
    }
  };
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
        <Avatar nickname={curretnUserInfo.nickname} faceURL={curretnUserInfo.faceURL} />
        <Text style={styles.name}>{curretnUserInfo.nickname}</Text>
        <Text style={styles.email}>{curretnUserInfo.userID}</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          {/* Search button with icon */}
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 50 : 0
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

export default SettingPage;
