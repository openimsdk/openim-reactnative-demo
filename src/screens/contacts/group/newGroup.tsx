import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Avatar from '../../../components/avatar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const NewGroup = () => {
    const navigator = useNavigation<NativeStackNavigationProp<any>>();
    const handleFindGroup = () => {
        navigator.navigate("FindGroup")
    }
    const handleCreateGroup = () => {
        navigator.navigate("CreateGroup")
    }
  return (
    <View>
      <TouchableOpacity style={styles.contactItem} onPress={handleFindGroup}>
        <Avatar nickname={'Find Group'} faceURL={''} />
        <Text>{'Find Group'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactItem}  onPress={handleCreateGroup}>
        <Avatar nickname={'Create Group'} faceURL={''}/>
        <Text>{'Create Group'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 0
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default NewGroup;
