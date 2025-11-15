export const RootStackScreenName = {
  // login
  Login: 'Login',
  Register: 'Register',
  VerifyCode: 'VerifyCode',
  SelfInfoSetting: 'SelfInfoSetting',
  ForgetPassword: 'ForgetPassword',
  ResetPassword: 'ResetPassword',

  // home tabs
  HomeTabs: 'HomeTabs',

  // profile
  About: 'About',
  AccountSettings: 'AccountSettings',
  BlackList: 'BlackList',
  ChangeNickname: 'ChangeNickname',
  LanguageSettings: 'LanguageSettings',
  SelfInfo: 'SelfInfo',
} as const;

export const HomeTabScreenName = {
  Conversation: 'Conversation',
  Contact: 'Contact',
  Workbench: 'Workbench',
  Profile: 'Profile',
} as const;
