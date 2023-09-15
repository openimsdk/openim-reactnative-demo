import { useEffect, useState } from "react";
import { OpenIMEmitter } from 'open-im-sdk-rn';
import { useContactStore } from "./contact";
import { FriendUserItem, WSEvent } from "./type.d";
import { useConversationStore } from "./conversation";
import { ExMessageItem, useMessageStore } from "./message";
import { MessageType } from "./types/enum";
import { FriendApplicationItem, RevokedInfo } from "./types/entity";
import { useUserStore } from "./user";
export const initStore = () => {
    const { getSelfInfoByReq } = useUserStore.getState();
    const {
        getFriendListByReq,
        //   getBlackListByReq,
        //   getGroupListByReq,
        getRecvFriendApplicationListByReq,
        //   getRecvGroupApplicationListByReq,
        getSendFriendApplicationListByReq,
        //   getSendGroupApplicationListByReq,
    } = useContactStore.getState();
    const { getConversationListByReq, getUnReadCountByReq } =
        useConversationStore.getState();

    getConversationListByReq();
    getUnReadCountByReq();
    getSelfInfoByReq();
    getFriendListByReq();
    // getBlackListByReq();
    // getGroupListByReq();
    getRecvFriendApplicationListByReq();
    // getRecvGroupApplicationListByReq();
    getSendFriendApplicationListByReq();
    // getSendGroupApplicationListByReq();
};
export function useGlobalEvent() {
    useEffect(() => {
        
        setIMListener();
        // initStore();
        return () => {
            disposeIMListener();
        };
    }, []);

    const eventNames = ['onSelfInfoUpdated', 'onConnecting', 'onConnectFailed', 'onConnectSuccess', 'onKickedOffline', 'onUserTokenExpired', 'onSyncServerStart', 'onSyncServerFinish', 'onSyncServerFailed', 'onRecvNewMessage', 'onRecvNewMessages', 'onNewRecvMessageRevoked', 'onConversationChanged', 'onNewConversation', 'onTotalUnreadMessageCountChanged', 'onFriendInfoChanged', 'onFriendAdded', 'onFriendDeleted', 'onBlackAdded', 'onBlackDeleted', 'onJoinedGroupAdded', 'onJoinedGroupDeleted', 'onGroupInfoChanged', 'onGroupMemberAdded', 'onGroupMemberDeleted', 'onGroupMemberInfoChanged', 'onFriendApplicationAdded', 'onFriendApplicationAccepted', 'onFriendApplicationRejected', 'onGroupApplicationAdded', 'onGroupApplicationAccepted', 'onGroupApplicationRejected'];
    const [connectState, setConnectState] = useState({
        isSyncing: false,
        isLogining: false,
        isConnecting: false,
      });
    // const updateSelfInfo = useUserStore((state) => state.updateSelfInfo);
    // const userLogout = useUserStore((state) => state.userLogout);
    // const updateConversationList = useConversationStore((state) => state.updateConversationList);
    // const updateUnReadCount = useConversationStore((state) => state.updateUnReadCount);
    // const updateCurrentGroupInfo = useConversationStore((state) => state.updateCurrentGroupInfo);
    // const getCurrentGroupInfoByReq = useConversationStore((state) => state.getCurrentGroupInfoByReq);
    // const getCurrentMemberInGroupByReq = useConversationStore((state) => state.getCurrentMemberInGroupByReq);
    // const tryUpdateCurrentMemberInGroup = useConversationStore((state) => state.tryUpdateCurrentMemberInGroup);
    const pushNewMessage = useMessageStore((state) => state.pushNewMessage);
    const updateOneMessage = useMessageStore((state) => state.updateOneMessage);
    const updateFriend = useContactStore((state) => state.updateFriend);
    const pushNewFriend = useContactStore((state) => state.pushNewFriend);
    // const updateBlack = useContactStore((state) => state.updateBlack);
    // const pushNewBlack = useContactStore((state) => state.pushNewBlack);
    // const updateGroup = useContactStore((state) => state.updateGroup);
    // const pushNewGroup = useContactStore((state) => state.pushNewGroup);
    const updateRecvFriendApplication = useContactStore((state) => state.updateRecvFriendApplication);
    const updateSendFriendApplication = useContactStore((state) => state.updateSendFriendApplication);
    // const updateRecvGroupApplication = useContactStore((state) => state.updateRecvGroupApplication);
    // const updateSendGroupApplication = useContactStore((state) => state.updateSendGroupApplication);


    // const selfUpdateHandler = ({ data }: WSEvent<SelfUserInfo>) => updateSelfInfo(data);
    const connectingHandler = () => console.log("connecting...");
    const connectFailedHandler = ({ errCode, errMsg }: WSEvent) => console.log(errCode, errMsg);
    const connectSuccessHandler = () => console.log("connect success...");
    // const kickHandler = () => tryOut("您的账号已在其他设备登录,请重新登录");
    // const expiredHandler = () => tryOut("当前登录已过期,请重新登录");

    // const tryOut = (msg: string) => feedbackToast({
    //     msg,
    //     error: msg,
    //     onClose: () => userLogout(),
    // });
    const syncStartHandler = () => setConnectState((state) => ({ ...state, isSyncing: true }));
    const syncFinishHandler = () => setConnectState((state) => ({ ...state, isSyncing: false }));
    const syncFailedHandler = () => {
        // feedbackToast({ msg: "同步失败！", error: "同步失败！" });
        setConnectState((state) => ({ ...state, isSyncing: false }));
    };

    const newMessageHandler = ({ data }: WSEvent<ExMessageItem | ExMessageItem[]>) => {
        if (connectState.isSyncing) return;
        if (Array.isArray(data)) data.forEach(handleNewMessage);
        else handleNewMessage(data);
    };

    const revokedMessageHandler = ({ data }: WSEvent<RevokedInfo>) => updateOneMessage({
        clientMsgID: data.clientMsgID,
        contentType: MessageType.RevokeMessage,
        notificationElem: {
            detail: JSON.stringify(data),
        },
    } as ExMessageItem);

    const notPushType = [MessageType.TypingMessage, MessageType.RevokeMessage];

    const handleNewMessage = (newServerMsg: ExMessageItem) => {
        if (!notPushType.includes(newServerMsg.contentType)) {
            pushNewMessage(newServerMsg);
            // emitter.emit("CHAT_LIST_SCROLL_TO_BOTTOM", true);
        }
    };

    // const conversationChnageHandler = ({ data }: WSEvent<ConversationItem[]>) => updateConversationList(data, "filter");
    // const newConversationHandler = ({ data }: WSEvent<ConversationItem[]>) => updateConversationList(data, "push");
    // const totalUnreadChangeHandler = ({ data }: WSEvent<number>) => updateUnReadCount(data);

    const friendInfoChangeHandler = ({ data }: WSEvent<FriendUserItem>) => updateFriend(data);
    const friendAddedHandler = ({ data }: WSEvent<FriendUserItem>) => pushNewFriend(data);
    const friendDeletedHandler = ({ data }: WSEvent<FriendUserItem>) => updateFriend(data, true);

    // const blackAddedHandler = ({ data }: WSEvent<BlackUserItem>) => pushNewBlack(data);
    // const blackDeletedHandler = ({ data }: WSEvent<BlackUserItem>) => updateBlack(data, true);

    // const joinedGroupAddedHandler = ({ data }: WSEvent<GroupItem>) => {
    //     if (data.groupID === useConversationStore.getState().currentConversation?.groupID) updateCurrentGroupInfo(data);
    //     pushNewGroup(data);
    // };

    // const joinedGroupDeletedHandler = ({ data }: WSEvent<GroupItem>) => {
    //     if (data.groupID === useConversationStore.getState().currentConversation?.groupID) {
    //         getCurrentGroupInfoByReq(data.groupID);
    //         getCurrentMemberInGroupByReq(data.groupID);
    //     }
    //     updateGroup(data, true);
    // };

    // const groupInfoChangedHandler = ({ data }: WSEvent<GroupItem>) => {
    //     updateGroup(data);
    //     if (data.groupID === useConversationStore.getState().currentConversation?.groupID) updateCurrentGroupInfo(data);
    // };

    // const groupMemberAddedHandler = ({ data }: WSEvent<GroupMemberItem>) => {
    //     if (data.groupID === useConversationStore.getState().currentConversation?.groupID &&
    //         data.userID === useUserStore.getState().selfInfo.userID) getCurrentMemberInGroupByReq(data.groupID);
    //     console.log("groupMemberAddedHandler");
    // };

    // const groupMemberDeletedHandler = () => console.log("groupMemberDeletedHandler");

    // const groupMemberInfoChangedHandler = ({ data }: WSEvent<GroupMemberItem>) => tryUpdateCurrentMemberInGroup(data);

    const friendApplicationProcessedHandler = ({ data }: WSEvent<FriendApplicationItem>) => {
        const isRecv = data.toUserID === useUserStore.getState().selfInfo.userID;
        isRecv ? updateRecvFriendApplication(data) : updateSendFriendApplication(data);
    };

    // const groupApplicationProcessedHandler = ({ data }: WSEvent<GroupApplicationItem>) => {
    //     const isRecv = data.userID !== useUserStore.getState().selfInfo.userID;
    //     isRecv ? updateRecvGroupApplication(data) : updateSendGroupApplication(data);
    // };


    const setIMListener = () => {
        
        // account
        // OpenIMEmitter.addListener('onSelfInfoUpdated', (v) => { selfUpdateHandler });
        OpenIMEmitter.addListener('onConnecting', connectingHandler);
        OpenIMEmitter.addListener('onConnectFailed', connectFailedHandler);
        OpenIMEmitter.addListener('onConnectSuccess', connectSuccessHandler);
        // OpenIMEmitter.addListener('onKickedOffline', (v) => { kickHandler });
        // OpenIMEmitter.addListener('onUserTokenExpired', (v) => { expiredHandler });
        // sync
        OpenIMEmitter.addListener('onSyncServerStart', syncStartHandler );
        OpenIMEmitter.addListener('onSyncServerFinish', syncFinishHandler );
        OpenIMEmitter.addListener('onSyncServerFailed',  syncFailedHandler );
        // message
        OpenIMEmitter.addListener('onRecvNewMessage',  newMessageHandler );
        OpenIMEmitter.addListener('onRecvNewMessages',  newMessageHandler );
        OpenIMEmitter.addListener('onNewRecvMessageRevoked',revokedMessageHandler );
        // // conversation
        // OpenIMEmitter.addListener('onConversationChanged', (v) => { conversationChnageHandler });
        // OpenIMEmitter.addListener('onNewConversation', (v) => { newConversationHandler });
        // OpenIMEmitter.addListener('onTotalUnreadMessageCountChanged', (v) => { totalUnreadChangeHandler });
        // // friend
        OpenIMEmitter.addListener('onFriendInfoChanged',  friendInfoChangeHandler );
        OpenIMEmitter.addListener('onFriendAdded', friendAddedHandler );
        // OpenIMEmitter.addListener('onFriendDeleted', (v) => { friendDeletedHandler });
        // // blacklist
        // OpenIMEmitter.addListener('onBlackAdded', (v) => { blackAddedHandler });
        // OpenIMEmitter.addListener('onBlackDeleted', (v) => { blackDeletedHandler });
        // // group
        // OpenIMEmitter.addListener('onJoinedGroupAdded', (v) => { joinedGroupAddedHandler });
        // OpenIMEmitter.addListener('onJoinedGroupDeleted', (v) => { joinedGroupDeletedHandler });
        // OpenIMEmitter.addListener('onGroupInfoChanged', (v) => { groupInfoChangedHandler });
        // OpenIMEmitter.addListener('onGroupMemberAdded', (v) => { groupMemberAddedHandler });
        // OpenIMEmitter.addListener('onGroupMemberDeleted', (v) => { groupMemberDeletedHandler });
        // OpenIMEmitter.addListener('onGroupMemberInfoChanged', (v) => { groupMemberInfoChangedHandler });
        // // application
        OpenIMEmitter.addListener('onFriendApplicationAdded',  friendApplicationProcessedHandler );
        OpenIMEmitter.addListener('onFriendApplicationAccepted',  friendApplicationProcessedHandler );
        OpenIMEmitter.addListener('onFriendApplicationRejected', friendApplicationProcessedHandler );
        // OpenIMEmitter.addListener('onGroupApplicationAdded', (v) => { groupApplicationProcessedHandler });
        // OpenIMEmitter.addListener('onGroupApplicationAccepted', (v) => { groupApplicationProcessedHandler });
        // OpenIMEmitter.addListener('onGroupApplicationRejected', (v) => { groupApplicationProcessedHandler });
    };

    const disposeIMListener = () => {
        eventNames.forEach((eventName) => {
            OpenIMEmitter.removeAllListeners(eventName);
        });
    };
}