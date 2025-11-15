import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeTabScreenName, RootStackScreenName } from './screen-name';

export type RootStackParamList = {
  [RootStackScreenName.Login]: undefined;
  [RootStackScreenName.Register]: { registerMode: 'phone' | 'email' };
  [RootStackScreenName.VerifyCode]: {
    registerMode: 'phone' | 'email',
    areaCode?: string,
    phone?: string,
    email?: string,
  };
  [RootStackScreenName.SelfInfoSetting]: {
    verifyCode: string,
    areaCode?: string,
    phone?: string,
    email?: string,
  };
  [RootStackScreenName.ForgetPassword]: { mode: 'phone' | 'email' };
  [RootStackScreenName.ResetPassword]: {
    mode: 'phone' | 'email',
    phoneNumber?: string,
    areaCode?: string,
    email?: string
    verifyCode: string
  };

  [RootStackScreenName.HomeTabs]: undefined;

  [RootStackScreenName.About]: undefined;
  [RootStackScreenName.AccountSettings]: undefined;
  [RootStackScreenName.BlackList]: undefined;
  [RootStackScreenName.ChangeNickname]: undefined;
  [RootStackScreenName.LanguageSettings]: undefined;
  [RootStackScreenName.SelfInfo]: undefined;
};

export type HomeTabParamList = {
  [HomeTabScreenName.Contact]: undefined;
  [HomeTabScreenName.Conversation]: undefined;
  [HomeTabScreenName.Workbench]: undefined;
  [HomeTabScreenName.Profile]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = BottomTabScreenProps<HomeTabParamList, T>;
export type HomeTabNavigationProp = BottomTabNavigationProp<HomeTabParamList>;
