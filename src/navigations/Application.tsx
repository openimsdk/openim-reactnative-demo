import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import type { ApplicationStackParamList } from "@/types/navigation";
import Login from "@/screens/login/Login";
import GetCode from "@/screens/login/GetCode";
import VerifyCode from "@/screens/login/VerifyCode";
import SetBaseInfo from "@/screens/login/SetBaseInfo";

import MainContentLayout from "@/screens/layout/MainContentLayout";
import Chat from "@/screens/conversation/Chat";
import GroupSetting from "@/screens/conversation/groupSetting";
import SingleSetting from "@/screens/conversation/singleSetting";

import SearchToJoin from "@/screens/contact/searchToJoin";
import ContactAdd from "@/screens/contact/contactAdd";
import ChooseUser from "@/screens/contact/chooseUser";
import MyFriend from "@/screens/contact/myFriend";
import MyGroup from "@/screens/contact/myGroup";
import NewFriend from "@/screens/contact/newFriend";
import NewGroup from "@/screens/contact/newGroup";
import ApplicationDetails from "@/screens/contact/applicationDetails";
import GroupCard from "@/screens/contact/groupCard";
import GroupMemberList from "@/screens/contact/groupMemberList";
import SearchFriendOrGroup from "@/screens/contact/searchFriendOrGroup";
import SendApplication from "@/screens/contact/sendApplication";
import UserCard from "@/screens/contact/userCard";
import UserCardDetails from "@/screens/contact/userCardDetails";
import UserCardSetting from "@/screens/contact/userCardSetting";
import QrCode from "@/screens/contact/qrCode";

import SelfInfo from "@/screens/profile/selfInfo";
import About from "@/screens/profile/about";
import Setting from "@/screens/profile/setting";
import BlackList from "@/screens/profile/blackList";
import ChangeName from "@/screens/profile/changeName";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* login */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="GetCode" component={GetCode} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
        <Stack.Screen name="SetBaseInfo" component={SetBaseInfo} />

        {/* conversation */}
        <Stack.Screen name="MainContentLayout" component={MainContentLayout} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="GroupSetting" component={GroupSetting} />
        <Stack.Screen name="SingleSetting" component={SingleSetting} />

        {/* contact */}
        <Stack.Screen name="ContactAdd" component={ContactAdd} />
        <Stack.Screen name="ChooseUser" component={ChooseUser} />
        <Stack.Screen name="SearchToJoin" component={SearchToJoin} />
        <Stack.Screen name="MyFriend" component={MyFriend} />
        <Stack.Screen name="MyGroup" component={MyGroup} />
        <Stack.Screen name="NewFriend" component={NewFriend} />
        <Stack.Screen name="NewGroup" component={NewGroup} />
        <Stack.Screen name="ApplicationDetails" component={ApplicationDetails} />
        <Stack.Screen name="GroupCard" component={GroupCard} />
        <Stack.Screen name="GroupMemberList" component={GroupMemberList} />
        <Stack.Screen name="SearchFriendOrGroup" component={SearchFriendOrGroup} />
        <Stack.Screen name="SendApplication" component={SendApplication} />
        <Stack.Screen name="UserCard" component={UserCard} />
        <Stack.Screen name="UserCardDetails" component={UserCardDetails} />
        <Stack.Screen name="UserCardSetting" component={UserCardSetting} />
        <Stack.Screen name="QrCode" component={QrCode} />

        {/* profile */}
        <Stack.Screen name="SelfInfo" component={SelfInfo} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="BlackList" component={BlackList} />
        <Stack.Screen name="ChangeName" component={ChangeName} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
