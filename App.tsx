import {Platform, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Create a stack navigator
const Stack = createStackNavigator();

// Define your screens
import LoginPage from './src/screens/login/loginPage';
import LoginWithVerificationPage from './src/screens/login/loginWithVerificationPage';
import ForgetPasswordPage from './src/screens/login/forgetPasswordPage';
import SetPasswordPage from './src/screens/login/setPasswordPage';
import SetVerificationPage from './src/screens/login/setVerificationPage';
import SignUpPage from './src/screens/login/signUpPage';
import OpenIMSDKRN, {OpenIMEmitter} from 'open-im-sdk-rn';

import {useState, useEffect, lazy, Suspense} from 'react';
import BottomTabBar from './src/navigation/BottomTabBar';
import {GetLoginStatus, Init, LoginIM, LogoutIM} from './src/api/openimsdk';
import {LoginClient} from './src/api/requests';
import FriendRequestPage from './src/screens/contacts/friendRequestPage';
import FriendRequestVerifyPage from './src/screens/contacts/friendRequestVerifyPage';
import ChatRoom from './src/screens/chats/chatRoom';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {initStore, useGlobalEvent} from './src/store/useGlobalEvent';

import AddFriendScreen from './src/screens/friend/addFriend';
import NewGroup from './src/screens/group/newGroup';
import FindGroupPage from './src/screens/group/findGroup';
import CreateGroupPage from './src/screens/group/createGroup';
import FriendSettingPage from './src/screens/contacts/friendSetting';
import MyGroupPage from './src/screens/group/myGroup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {adaptViewConfig} from 'react-native-reanimated/lib/typescript/ConfigHelper';
import {AuthContext} from './src/components/AuthContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  Init();
  useGlobalEvent();
  useEffect(() => {
    const initialize = async () => {
      const storedLoginState = await GetLoginStatus();
      if (storedLoginState === 3) {
        initStore();
        setIsLoggedIn(true);
      }
    };

    initialize();
  }, []);

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{isLoggedIn, setLoginState: setIsLoggedIn}}>
        <Stack.Navigator screenOptions={{animationEnabled: false}}>
          {!isLoggedIn ? (
            <>
              <Stack.Screen
                name="LoginPage"
                component={LoginPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LoginWithVerificationPage"
                component={LoginWithVerificationPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ForgetPasswordPage"
                component={ForgetPasswordPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SetPasswordPage"
                options={{headerShown: false}}>
                {props => <SetPasswordPage {...props} />}
              </Stack.Screen>
              <Stack.Screen
                name="SetVerificationPage"
                component={SetVerificationPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUpPage"
                component={SignUpPage}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={BottomTabBar}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Friends"
                component={FriendRequestPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FriendRequests"
                component={FriendRequestVerifyPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChatRoom"
                component={ChatRoom}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="AddFriend"
                component={AddFriendScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="NewGroup"
                component={NewGroup}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="FindGroup"
                component={FindGroupPage}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="CreateGroup"
                component={CreateGroupPage}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="FriendSettingPage"
                component={FriendSettingPage}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="MyGroup"
                component={MyGroupPage}
                options={{headerShown: true}}
              />
            </>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
