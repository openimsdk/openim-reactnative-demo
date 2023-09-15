import { ExMessageItem } from "./message";
import { ConversationItem, GroupItem, GroupMemberItem, MessageItem } from "./types/entity";

export declare type WSEvent<T = unknown> = {
    event: string;
    data: T;
    errCode: number;
    errMsg: string;
    operationID: string;
};
export declare type FriendUserItem = {

    addSource: number;
    attachedInfo: string;
    createTime: number;
    ex: string;
    faceURL: string;
    nickname: string;
    operatorUserID: string;
    ownerUserID: string;
    remark: string;
    userID: string;
};
export declare type FriendApplicationItem = {
    createTime: number;
    ex: string;
    fromFaceURL: string;
    fromGender: number;
    fromNickname: string;
    fromUserID: string;
    handleMsg: string;
    handleResult: ApplicationHandleResult;
    handleTime: number;
    handlerUserID: string;
    reqMsg: string;
    toFaceURL: string;
    toGender: number;
    toNickname: string;
    toUserID: string;
};

export declare enum ApplicationHandleResult {
    Unprocessed = 0,
    Agree = 1,
    Reject = -1
}
export type PreViewImg = {
    url: string;
    clientMsgID: string;
  };
export interface MessageStore {
    historyMessageList: ExMessageItem[];
    previewImgList: PreViewImg[];
    lastMinSeq: number;
    hasMore: boolean;
    isCheckMode: boolean;
    getHistoryMessageListByReq: (loadMore?: boolean) => Promise<unknown>;
    pushNewMessage: (message: ExMessageItem) => void;
    updateOneMessage: (message: ExMessageItem, fromSuccessCallBack?: boolean) => void;
    // deleteOneMessage: (clientMsgID: string) => void;
    // clearHistoryMessage: () => void;
    // updatePreviewImgList: (list: PreViewImg[]) => void;
    // updateCheckMode: (isCheckMode: boolean) => void;
    tryUpdatePreviewImg: (messageList: ExMessageItem[]) => void;
}

export interface ContactStore {


    friendList: FriendUserItem[];
    recvFriendApplicationList: FriendApplicationItem[];
    sendFriendApplicationList: FriendApplicationItem[];

    updateFriend: (friend: FriendUserItem, remove?: boolean) => void;
    getFriendListByReq: () => Promise<void>;
    pushNewFriend: (friend: FriendUserItem) => void;
    getRecvFriendApplicationListByReq: () => Promise<void>;
    getSendFriendApplicationListByReq: () => Promise<void>;
    updateRecvFriendApplication: (application: FriendApplicationItem) => void;
    updateSendFriendApplication: (application: FriendApplicationItem) => void;
    clearContactStore: () => void;
}
export interface UserStore {
    selfInfo: any;
    // selfInfo: BusinessUserInfo;
    appConfig: AppConfig;
    appSettings: AppSettings;
    // updateSelfInfo: (info: Partial<BusinessUserInfo>) => void;
    getSelfInfoByReq: () => Promise<void>;
    // getAppConfigByReq: () => Promise<void>;
    // updateAppSettings: (settings: Partial<AppSettings>) => void;
    userLogout: () => Promise<void>;
}
export interface AppSettings {
    locale: LocaleString;
    closeAction: "miniSize" | "quit";
}
export type LocaleString = "zh-CN" | "en";
export interface AppConfig {
    discoverPageURL: string;
    ordinaryUserAddFriend: number;
    allowSendMsgNotFriend: number;
    needInvitationCodeRegister: number;
}
export type ConversationListUpdateType = "push" | "filter";
export interface ConversationStore {
    conversationList: ConversationItem[];
    currentConversation?: ConversationItem;
    unReadCount: number;
    currentGroupInfo?: GroupItem;
    currentMemberInGroup?: GroupMemberItem;
    quoteMessage?: MessageItem;
    getConversationListByReq: (isOffset?: boolean) => Promise<boolean>;
    updateConversationList: (
        list: ConversationItem[],
        type: ConversationListUpdateType,
    ) => void;
    delConversationByCID: (conversationID: string) => void;
    // getCurrentConversationByReq: (conversationID?: string) => Promise<void>;
    updateCurrentConversation: (conversation?: ConversationItem) => void;
    getUnReadCountByReq: () => Promise<void>;
    updateUnReadCount: (count: number) => void;
    getCurrentGroupInfoByReq: (groupID: string) => Promise<void>;
    updateCurrentGroupInfo: (groupInfo: GroupItem) => void;
    getCurrentMemberInGroupByReq: (groupID: string) => Promise<void>;
    tryUpdateCurrentMemberInGroup: (member: GroupMemberItem) => void;
    updateQuoteMessage: (message?: MessageItem) => void;
    clearConversationStore: () => void;
}