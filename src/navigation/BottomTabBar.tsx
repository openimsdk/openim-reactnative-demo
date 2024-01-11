import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your tab screen components
import ContactListPage from '../screens/contacts/contactListPage';
import ChatPage from '../screens/chats/chatPage';
import SettingPage from '../screens/setting/settings';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = ''; // Default icon name
          if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          // Ensure the icon name is a non-empty string
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0089FF', // Moved here from tabBarOptions
        tabBarInactiveTintColor: 'gray', // Moved here from tabBarOptions
      })}>
      <Tab.Screen
        name="Chat"
        component={ChatPage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Contact"
        component={ContactListPage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingPage}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
