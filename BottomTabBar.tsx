import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your tab screen components
import ContactListPage from './src/screens/contacts/contactListPage';
import ChatPage from './src/screens/chats/chatPage';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={ChatPage} options={{ headerShown: false }}/>
      <Tab.Screen name="Contact" component={ContactListPage} options={{ headerShown: false }}/>
      
      {/* <Tab.Screen name="Chat" component={ChatScreen} /> */}
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabBar;
