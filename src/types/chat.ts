import { MessageReceiveOptType } from "@openim/rn-client-sdk/lib/typescript/types/enum";

export enum BusinessAllowType {
  Allow = 1,
  NotAllow = 2,
}

export interface BusinessUserInfo {
  userID: string;
  password: string;
  account: string;
  phoneNumber: string;
  areaCode: string;
  email: string;
  nickname: string;
  faceURL: string;
  gender: number;
  level: number;
  birth: number;
  allowAddFriend: BusinessAllowType;
  allowBeep: BusinessAllowType;
  allowVibration: BusinessAllowType;
  globalRecvMsgOpt: MessageReceiveOptType;
}
