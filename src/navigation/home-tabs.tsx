import ContactScreen from '@/screens/contact/index/index';
import ConversationScreen from '@/screens/conversation/index/index';
import WorkbenchScreen from '@/screens/workbench/index/index';
import ProfileScreen from '@/screens/profile/index/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabScreenName } from './screen-name';
import { Image } from 'react-native';
import { theme } from '@/styles/theme';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const TabBarIconMap = {
  [HomeTabScreenName.Contact]: {
    normal: require('@/assets/images/tabbar/contacts.png'),
    focused: require('@/assets/images/tabbar/contacts_active.png'),
  },
  [HomeTabScreenName.Conversation]: {
    normal: require('@/assets/images/tabbar/conversation.png'),
    focused: require('@/assets/images/tabbar/conversation_active.png'),
  },
  [HomeTabScreenName.Workbench]: {
    normal: require('@/assets/images/tabbar/workbench.png'),
    focused: require('@/assets/images/tabbar/workbench_active.png'),
  },
  [HomeTabScreenName.Profile]: {
    normal: require('@/assets/images/tabbar/profile.png'),
    focused: require('@/assets/images/tabbar/profile_active.png'),
  },
} as const;

type TabBarIconName = keyof typeof TabBarIconMap;

const TabBarIcon = ({ name, focused, size }: { name: TabBarIconName, focused: boolean, size: number }) => {
  return (
    <Image
      source={focused ? TabBarIconMap[name].focused : TabBarIconMap[name].normal} 
      style={{ width: size, height: size }} 
    />
  )
}

export default function HomeTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, size }) => {
        const name = route.name as TabBarIconName;
        return <TabBarIcon name={name} focused={focused} size={size} />
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.fontGray,
    })}>
      <Tab.Screen name={HomeTabScreenName.Conversation} component={ConversationScreen} options={{ tabBarLabel: t('tabs.labels.conversation') }} />
      <Tab.Screen name={HomeTabScreenName.Contact} component={ContactScreen} options={{ tabBarLabel: t('tabs.labels.contacts') }} />
      <Tab.Screen name={HomeTabScreenName.Workbench} component={WorkbenchScreen} options={{ tabBarLabel: t('tabs.labels.workbench') }} />
      <Tab.Screen name={HomeTabScreenName.Profile} component={ProfileScreen} options={{ tabBarLabel: t('tabs.labels.profile') }} />
    </Tab.Navigator>
  );
}
