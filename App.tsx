import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create a stack navigator
const Stack = createStackNavigator();

// Define your screens
import LoginPage from './src/screens/login/loginPage';
import LoginWithVerificationPage from './src/screens/login/loginWithVerificationPage';
import ForgetPasswordPage from './src/screens/login/forgetPasswordPage';
import SetPasswordPage from './src/screens/login/setPasswordPage';
import SetVerificationPage from './src/screens/login/setVerificationPage';
import SignUpPage from './src/screens/login/signUpPage';
import OpenIMSDKRN, { OpenIMEmitter } from 'open-im-sdk-rn';
import RNFS from 'react-native-fs';
import { useState, useEffect } from 'react';
import BottomTabBar from './BottomTabBar';
import { GetLoginStatus, LoginIM } from './src/screens/api/openimsdk';
import { LoginClient } from './src/screens/api/requests';
import FriendRequestPage from './src/screens/contacts/friendRequestPage';
import FriendRequestVerifyPage from './src/screens/contacts/friendRequestVerifyPage';
import ChatRoom from './src/screens/chats/chatRoom';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { initStore, useGlobalEvent } from './store/useGlobalEvent';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useGlobalEvent()

  useEffect(() => {
    let platform = 1;
    if (Platform.OS === 'android') {
      platform = 2; // Android
    } else if (Platform.OS === 'ios') {
      platform = 1;
    }
    const Init = async () => {
      await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/tmp');
      const config = {
        platformID: platform,
        apiAddr: 'https://web.rentsoft.cn/api',
        wsAddr: 'wss://web.rentsoft.cn/msg_gateway',
        dataDir: RNFS.DocumentDirectoryPath + '/tmp',
        logLevel: 6,
        isLogStandardOutput: true,
      };
      try {
        const opid = "123456";
        const result = await OpenIMSDKRN.initSDK(config, opid);

      } catch (error) {
        console.error('Error initializing SDK:', error); // Log the error
      }
    };
    const checkLogin = async () => {
      const status = (await GetLoginStatus()).status;
      if (status == 3){
        setIsLoggedIn(true)
        initStore()
      }
        
    }
    // Call the Init function when the component mounts
    Init();
    
    checkLogin();

  }, []); // The empty dependency array ensures that this effect runs once on mount

  const handleLogin = (loggedIn: boolean | ((prevState: boolean) => boolean)) => {
    setIsLoggedIn(loggedIn);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ animationEnabled: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="LoginPage"
              component={() => <LoginPage onLogin={handleLogin} />}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginWithVerificationPage"
              component={() => <LoginWithVerificationPage onLogin={handleLogin} />}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgetPasswordPage"
              component={ForgetPasswordPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SetPasswordPage"
              options={{ headerShown: false }}
            >
              {props => <SetPasswordPage {...props} onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen
              name="SetVerificationPage"
              component={SetVerificationPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpPage"
              component={SignUpPage}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={BottomTabBar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Friends"
              component={FriendRequestPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FriendRequests"
              component={FriendRequestVerifyPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatRoom"
              component={ChatRoom}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>

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
