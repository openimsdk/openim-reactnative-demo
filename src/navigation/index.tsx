import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackScreenName } from "./screen-name";
import { RootStackParamList } from "./types";

import LoginScreen from "@/screens/login/index/index";
import RegisterScreen from "@/screens/login/register";
import SelfInfoSettingScreen from "@/screens/login/self-info-setting";
import VerifyCodeScreen from "@/screens/login/verification-code";
import ForgetPasswordScreen from "@/screens/login/forget-password";
import ResetPasswordScreen from "@/screens/login/reset-password";

import HomeTabs from "./home-tabs";
import AboutScreen from "@/screens/profile/about";
import AccountSettingsScreen from "@/screens/profile/account-settings";
import SelfInfoScreen from "@/screens/profile/self-info";
import LanguageSettingsScreen from "@/screens/profile/language-settings";
import ChangeNicknameScreen from "@/screens/profile/change-nickname";
import BlackListScreen from "@/screens/profile/black-list";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Stacks() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RootStackScreenName.Login} component={LoginScreen} />
        <Stack.Screen name={RootStackScreenName.Register} component={RegisterScreen} />
        <Stack.Screen name={RootStackScreenName.VerifyCode} component={VerifyCodeScreen} />
        <Stack.Screen name={RootStackScreenName.SelfInfoSetting} component={SelfInfoSettingScreen} />
        <Stack.Screen name={RootStackScreenName.ForgetPassword} component={ForgetPasswordScreen} />
        <Stack.Screen name={RootStackScreenName.ResetPassword} component={ResetPasswordScreen} />
      </Stack.Group>

      <Stack.Screen options={{ headerShown: false }} name={RootStackScreenName.HomeTabs} component={HomeTabs} />

      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RootStackScreenName.About} component={AboutScreen}/>
        <Stack.Screen name={RootStackScreenName.AccountSettings} component={AccountSettingsScreen} />
        <Stack.Screen name={RootStackScreenName.BlackList} component={BlackListScreen} />
        <Stack.Screen name={RootStackScreenName.ChangeNickname} component={ChangeNicknameScreen} />
        <Stack.Screen name={RootStackScreenName.LanguageSettings} component={LanguageSettingsScreen} />
        <Stack.Screen name={RootStackScreenName.SelfInfo} component={SelfInfoScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stacks />
    </NavigationContainer>
  );
}
