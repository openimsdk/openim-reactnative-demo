import ContactScreen from '@/screens/contact/index/index';
import ConversationScreen from '@/screens/conversation/index/index';
import WorkbenchScreen from '@/screens/workbench/index/index';
import ProfileScreen from '@/screens/profile/index/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabScreenName } from './screen-name';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={HomeTabScreenName.Contact} component={ContactScreen} />
      <Tab.Screen name={HomeTabScreenName.Conversation} component={ConversationScreen} />
      <Tab.Screen name={HomeTabScreenName.Workbench} component={WorkbenchScreen} />
      <Tab.Screen name={HomeTabScreenName.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
