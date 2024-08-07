import { BusinessUserInfo } from "@/types/chat";
import {
  BlackUserItem,
  ConversationItem,
  FriendApplicationItem,
  FriendUserItem,
  GroupApplicationItem,
  GroupItem,
  GroupMemberItem,
  MessageItem,
} from "open-im-sdk-rn/lib/typescript/types/entity";

export interface ExType {
  checked?: boolean;
  isAppend?: boolean;
  gapTime?: boolean;
  jump?: boolean;
  errCode?: number;
}

export type ExMessageItem = MessageItem & ExType;

export interface UserStore {
  syncing: boolean;
  selfInfo: BusinessUserInfo;
  updateSyncState: (syncing: boolean) => void;
  updateSelfInfo: (info: Partial<BusinessUserInfo>) => void;
  getSelfInfoByReq: () => Promise<void>;
  userLogout: () => void;
}

export type ConversationListUpdateType = "push" | "filter";

export interface ConversationStore {
  conversationIniting: boolean;
  conversationList: ConversationItem[];
  currentConversation?: ConversationItem;
  unReadCount: number;
  currentGroupInfo?: GroupItem;
  currentMemberInGroup?: GroupMemberItem;
  getConversationListByReq: (isOffset?: boolean) => Promise<boolean>;
  updateConversationList: (list: ConversationItem[], type: ConversationListUpdateType) => void;
  delConversationByCID: (conversationID: string) => void;
  // getCurrentConversationByReq: (conversationID?: string) => Promise<void>;
  updateCurrentConversation: (conversation?: ConversationItem, isJump?: boolean) => void;
  updateCurrentConversationFields: (fields: Partial<ConversationItem>) => void;
  getUnReadCountByReq: () => Promise<number>;
  updateUnReadCount: (count: number) => void;
  decreaseUnReadCount: (count: number) => void;
  getCurrentGroupInfoByReq: (groupID: string) => Promise<void>;
  updateCurrentGroupInfo: (groupInfo: GroupItem) => void;
  getCurrentMemberInGroupByReq: (groupID: string) => Promise<void>;
  tryUpdateCurrentMemberInGroup: (member: GroupMemberItem) => void;
  clearConversationStore: () => void;
}

export interface GetMessageReverseParams {
  message: ExMessageItem;
  conversationID: string;
}

export interface UpdateMessaggeBaseInfoParams {
  sendID: string;
  senderNickname: string;
  senderFaceUrl: string;
}

export interface MessageStore {
  historyMessageList: ExMessageItem[];
  previewImgList: string[];
  lastMinSeq: number;
  hasMore: boolean;
  laterHasMore: boolean;
  jumpClientMsgID?: string;
  isCheckMode: boolean;
  enableReverseLoad: boolean;
  pushNewMessage: (message: ExMessageItem) => void;
  updateOneMessage: (message: ExMessageItem, fromImageDownload?: boolean) => void;
  updateMessageNicknameAndFaceUrl: (params: UpdateMessaggeBaseInfoParams) => void;
  deleteAndPushOneMessage: (message: ExMessageItem) => void;
  deleteOneMessage: (clientMsgID: string) => void;
  getHistoryMessageListByReq: (loadMore?: boolean) => Promise<unknown>;
  updateMessagePreview: (message: ExMessageItem) => void;
  clearPreviewList: () => void;
  updateCheckMode: (isCheckMode: boolean) => void;
  updateJumpClientMsgID: (clientMsgID?: string) => void;
  updateReverseLoad: (enable: boolean) => void;
  getConversationPreviewImgList: () => Promise<void>;
  clearMessage: () => void;
}

export interface UserCardData {
  baseInfo?: Partial<FriendUserItem & BusinessUserInfo>;
  groupMemberInfo?: GroupMemberItem;
}
export interface ContactStore {
  friendList: FriendUserItem[];
  blackList: BlackUserItem[];
  groupList: GroupItem[];
  recvFriendApplicationList: FriendApplicationItem[];
  sendFriendApplicationList: FriendApplicationItem[];
  recvGroupApplicationList: GroupApplicationItem[];
  sendGroupApplicationList: GroupApplicationItem[];
  userCardData: UserCardData;
  setUserCardData: (data: UserCardData) => void;
  getFriendListByReq: () => Promise<void>;
  setFriendList: (list: FriendUserItem[]) => void;
  updateFriend: (friend: FriendUserItem, remove?: boolean) => void;
  pushNewFriend: (friend: FriendUserItem) => void;
  getBlackListByReq: () => Promise<void>;
  updateBlack: (black: BlackUserItem, remove?: boolean) => void;
  pushNewBlack: (black: BlackUserItem) => void;
  getGroupListByReq: () => Promise<void>;
  setGroupList: (list: GroupItem[]) => void;
  updateGroup: (group: GroupItem, remove?: boolean) => void;
  pushNewGroup: (group: GroupItem) => void;
  getRecvFriendApplicationListByReq: () => Promise<void>;
  updateRecvFriendApplication: (application: FriendApplicationItem) => void;
  getSendFriendApplicationListByReq: () => Promise<void>;
  updateSendFriendApplication: (application: FriendApplicationItem) => void;
  getRecvGroupApplicationListByReq: () => Promise<void>;
  updateRecvGroupApplication: (application: GroupApplicationItem) => void;
  getSendGroupApplicationListByReq: () => Promise<void>;
  updateSendGroupApplication: (application: GroupApplicationItem) => void;
  clearContactStore: () => void;
}
