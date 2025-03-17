export enum SessionType {
  Single = 1,
  Group = 3,
  WorkingGroup = 3,
  Notification = 4,
}

export enum MessageType {
  TextMessage = 101,
  PictureMessage = 102,
  VoiceMessage = 103,
  VideoMessage = 104,
  FileMessage = 105,
  AtTextMessage = 106,
  MergeMessage = 107,
  CardMessage = 108,
  LocationMessage = 109,
  CustomMessage = 110,
  TypingMessage = 113,
  QuoteMessage = 114,
  FaceMessage = 115,
  FriendAdded = 1201,
  OANotification = 1400,

  GroupCreated = 1501,
  GroupInfoUpdated = 1502,
  MemberQuit = 1504,
  GroupOwnerTransferred = 1507,
  MemberKicked = 1508,
  MemberInvited = 1509,
  MemberEnter = 1510,
  GroupDismissed = 1511,
  GroupMemberMuted = 1512,
  GroupMemberCancelMuted = 1513,
  GroupMuted = 1514,
  GroupCancelMuted = 1515,
  GroupAnnouncementUpdated = 1519,
  GroupNameUpdated = 1520,
  BurnMessageChange = 1701,

  // notification
  RevokeMessage = 2101,
}

export const GroupSessionTypes = [SessionType.Group, SessionType.WorkingGroup];

export const GroupSystemMessageTypes = [
  MessageType.GroupCreated,
  MessageType.MemberQuit,
  MessageType.GroupOwnerTransferred,
  MessageType.MemberKicked,
  MessageType.MemberInvited,
  MessageType.MemberEnter,
  MessageType.GroupDismissed,
  MessageType.GroupMemberMuted,
  MessageType.GroupMuted,
  MessageType.GroupCancelMuted,
  MessageType.GroupMemberCancelMuted,
  MessageType.GroupNameUpdated,
];

export const SystemMessageTypes = [
  MessageType.RevokeMessage,
  MessageType.FriendAdded,
  MessageType.BurnMessageChange,
  ...GroupSystemMessageTypes,
];

export enum MessageStatus {
  Sending = 1,
  Succeed = 2,
  Failed = 3,
}

export enum Platform {
  iOS = 1,
  Android = 2,
  Windows = 3,
  MacOSX = 4,
  Web = 5,
  Linux = 7,
  AndroidPad = 8,
  iPad = 9,
}

export enum GroupJoinSource {
  Invitation = 2,
  Search = 3,
  QrCode = 4,
}

export enum AllowType {
  Allowed = 0,
  NotAllowed = 1,
}

export enum GroupMemberRole {
  Nomal = 20,
  Admin = 60,
  Owner = 100,
}

export enum GroupStatus {
  Nomal = 0,
  Baned = 1,
  Dismissed = 2,
  Muted = 3,
}

export enum ViewType {
  History = 0,
  Search = 1,
}
