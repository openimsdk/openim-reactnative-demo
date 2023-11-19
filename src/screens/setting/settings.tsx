import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from '../../components/avatar';
import { useUserStore } from '../../../store/user';
import { getBusinessUserInfo } from '../api/requests';
import { useAuth } from '../../../AuthContext';


const SettingPage = () => {
  const { handleLogout } = useAuth();
  let curretnUserInfo = useUserStore((state) => state.selfInfo)

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
