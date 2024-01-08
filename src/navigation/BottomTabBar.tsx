import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Import your tab screen components
import ContactListPage from '../screens/contacts/contactListPage';
import ChatPage from '../screens/chats/chatPage';
import SettingPage from '../screens/setting/settings';

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Main"
        component={ChatPage}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Contact"
        component={ContactListPage}
        options={{headerShown: false}}
      />

      {/* <Tab.Screen name="Work" component={WorkScreen}  options={{ headerShown: false }}/>  */}
      <Tab.Screen
        name="Settings"
        component={SettingPage}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
