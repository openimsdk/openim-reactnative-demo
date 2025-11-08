import LoginScreen from "@/screens/login/index/index";
import RegisterScreen from "@/screens/login/register";
import SelfInfoSettingScreen from "@/screens/login/self-info-setting";
import VerifyCodeScreen from "@/screens/login/verification-code";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./home-tabs";
import { RootStackScreenName } from "./screen-name";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Stacks() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RootStackScreenName.Login} component={LoginScreen} />
        <Stack.Screen name={RootStackScreenName.Register} component={RegisterScreen} />
        <Stack.Screen name={RootStackScreenName.VerifyCode} component={VerifyCodeScreen} />
        <Stack.Screen name={RootStackScreenName.SelfInfoSetting} component={SelfInfoSettingScreen} />
      </Stack.Group>

      <Stack.Screen options={{ headerShown: false }} name={RootStackScreenName.HomeTabs} component={HomeTabs} />
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
