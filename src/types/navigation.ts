import { ApplicationItemSource, ApplicationTypeEnum } from "@/components/ApplicationItem";
import type { StackScreenProps } from "@react-navigation/stack";
import { PublicUserItem } from "open-im-sdk-rn/lib/typescript/types/entity";

export type ApplicationStackParamList = {
  MainContentLayout: undefined;
  // login
  Login: undefined;
  GetCode: undefined;
  VerifyCode: {
    areaCode: string;
    phone: number;
  };
  SetBaseInfo: {
    verifyCode: string;
    areaCode: string;
    phone: number;
  };

  // conversation
  Chat: undefined;
  GroupSetting: undefined;
  SingleSetting: undefined;

  // contact
  ContactAdd: undefined;
  ChooseUser: {
    prevCheckedUserList: PublicUserItem[];
  };
  SearchToJoin: {
    isGroup: boolean;
  };
  MyFriend: undefined;
  MyGroup: undefined;
  NewFriend: undefined;
  NewGroup: undefined;
  ApplicationDetails: {
    type: ApplicationTypeEnum;
    application: Partial<ApplicationItemSource>;
  };
  GroupCard: {
    userList: PublicUserItem[];
  };
  GroupMemberList: undefined;
  SearchFriendOrGroup: undefined;
  SendApplication: {
    isGroup: boolean;
    sourceID: string;
    isScan: boolean;
  };
  UserCard: undefined;
  UserCardDetails: undefined;
  UserCardSetting: undefined;
  QrCode: {
    isGroup: boolean;
  };

  // profile
  SelfInfo: undefined;
  About: undefined;
  Setting: undefined;
  BlackList: undefined;
  ChangeName: undefined;
};

export type ApplicationScreenProps = StackScreenProps<ApplicationStackParamList>;
