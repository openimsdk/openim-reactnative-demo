import { SessionType } from "@/constants";
import { useContactStore } from "@/store/contact";
import { useConversationStore } from "@/store/conversation";
import { useMessageStore } from "@/store/message";
import { ExMessageItem } from "@/store/type";
import { useUserStore } from "@/store/user";
import { ApplicationStackParamList } from "@/types/navigation";
import { feedbackToast } from "@/utils/common";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OpenIMEmitter } from "open-im-sdk-rn";
import {
  BlackUserItem,
  ConversationItem,
  FriendApplicationItem,
  FriendUserItem,
  GroupApplicationItem,
  GroupItem,
  GroupMemberItem,
  SelfUserInfo,
} from "open-im-sdk-rn/lib/typescript/types/entity";
import { useEffect } from "react";

export function useGlobalEvent() {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();
  const syncing = useUserStore.getState().syncing;

  // account
  const updateSelfInfo = useUserStore((state) => state.updateSelfInfo);
  const selfUpdateHandler = (data: SelfUserInfo) => {
    updateSelfInfo(data);
  };
  const connectingHandler = () => {
    console.log("connecting...");
  };
  const connectFailedHandler = (res: unknown) => {
    console.error("connect failed", res);
  };
  const connectSuccessHandler = () => {
    console.log("connect success");
  };
  const kickHandler = () => {
    feedbackToast({
      msg: "Your account has logged in on another device, please log in again!",
      error: "Your account has logged in on another device, please log in again!",
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  const expiredHandler = () => {
    feedbackToast({
      msg: "Current login has expired, please log in again!",
      error: "Current login has expired, please log in again!",
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  // sync
  const updateSyncState = useUserStore((state) => state.updateSyncState);
  const syncStartHandler = () => {
    updateSyncState(true);
    console.log("sync start");
  };
  const syncFinishHandler = () => {
    updateSyncState(false);
    console.log("sync finish");
  };
  const syncFailedHandler = () => {
    updateSyncState(false);
    console.log("sync failed");
  };

  // message
  const inCurrentConversation = (newServerMsg: ExMessageItem) => {
    switch (newServerMsg.sessionType) {
      case SessionType.Single:
        return (
          newServerMsg.sendID === useConversationStore.getState().currentConversation?.userID ||
          (newServerMsg.sendID === useUserStore.getState().selfInfo.userID &&
            newServerMsg.recvID === useConversationStore.getState().currentConversation?.userID)
        );
      case SessionType.Group:
      case SessionType.WorkingGroup:
        return newServerMsg.groupID === useConversationStore.getState().currentConversation?.groupID;
      case SessionType.Notification:
        return newServerMsg.sendID === useConversationStore.getState().currentConversation?.userID;
      default:
        return false;
    }
  };
  const pushNewMessage = useMessageStore((state) => state.pushNewMessage);
  const newMessageHandler = (data: ExMessageItem[]) => {
    if (syncing) {
      return;
    }
    data.map((message) => {
      if (!inCurrentConversation(message)) return;
      pushNewMessage(message);
      return null;
    });
  };

  // conversation
  const updateConversationList = useConversationStore((state) => state.updateConversationList);
  const updateUnReadCount = useConversationStore((state) => state.updateUnReadCount);
  const conversationChnageHandler = (data: ConversationItem[]) => {
    if (syncing) {
      return;
    }
    updateConversationList(data, "filter");
  };
  const newConversationHandler = (data: ConversationItem[]) => {
    updateConversationList(data, "push");
  };
  const totalUnreadChangeHandler = (data: number) => {
    updateUnReadCount(data);
  };

  // friend
  const updateFriend = useContactStore((state) => state.updateFriend);
  const pushNewFriend = useContactStore((state) => state.pushNewFriend);
  const friednInfoChangeHandler = (data: FriendUserItem) => {
    if (data.userID === useConversationStore.getState().currentConversation?.userID) {
      // updateMessageNicknameAndFaceUrl({
      //   sendID: data.userID,
      //   senderNickname: data.remark || data.nickname,
      //   senderFaceUrl: data.faceURL,
      // });
    }
    updateFriend(data);
  };
  const friednAddedHandler = (data: FriendUserItem) => {
    pushNewFriend(data);
  };
  const friednDeletedHandler = (data: FriendUserItem) => {
    updateFriend(data, true);
  };

  // blacklist
  const pushNewBlack = useContactStore((state) => state.pushNewBlack);
  const updateBlack = useContactStore((state) => state.updateBlack);
  const blackAddedHandler = (data: BlackUserItem) => {
    pushNewBlack(data);
  };
  const blackDeletedHandler = (data: BlackUserItem) => {
    updateBlack(data, true);
  };

  // group
  const updateCurrentGroupInfo = useConversationStore((state) => state.updateCurrentGroupInfo);
  const pushNewGroup = useContactStore((state) => state.pushNewGroup);
  const getCurrentGroupInfoByReq = useConversationStore((state) => state.getCurrentGroupInfoByReq);
  const getCurrentMemberInGroupByReq = useConversationStore((state) => state.getCurrentMemberInGroupByReq);
  const updateGroup = useContactStore((state) => state.updateGroup);
  const tryUpdateCurrentMemberInGroup = useConversationStore((state) => state.tryUpdateCurrentMemberInGroup);
  const joinedGroupAddedHandler = (data: GroupItem) => {
    if (data.groupID === useConversationStore.getState().currentConversation?.groupID) {
      updateCurrentGroupInfo(data);
    }
    pushNewGroup(data);
  };
  const joinedGroupDeletedHandler = (data: GroupItem) => {
    if (data.groupID === useConversationStore.getState().currentConversation?.groupID) {
      getCurrentGroupInfoByReq(data.groupID);
      getCurrentMemberInGroupByReq(data.groupID);
    }
    updateGroup(data, true);
  };
  const joinedGroupDismissHandler = (data: GroupItem) => {
    if (data.groupID === useConversationStore.getState().currentConversation?.groupID) {
      getCurrentMemberInGroupByReq(data.groupID);
    }
  };
  const groupInfoChangedHandler = (data: GroupItem) => {
    updateGroup(data);
    if (data.groupID === useConversationStore.getState().currentConversation?.groupID) {
      updateCurrentGroupInfo(data);
    }
  };
  const groupMemberAddedHandler = (data: GroupMemberItem) => {
    if (
      data.groupID === useConversationStore.getState().currentConversation?.groupID &&
      data.userID === useUserStore.getState().selfInfo.userID
    ) {
      getCurrentMemberInGroupByReq(data.groupID);
    }
  };
  const groupMemberDeletedHandler = (data: GroupMemberItem) => {
    if (
      data.groupID === useConversationStore.getState().currentConversation?.groupID &&
      data.userID === useUserStore.getState().selfInfo.userID
    ) {
      getCurrentMemberInGroupByReq(data.groupID);
    }
  };
  const groupMemberInfoChangedHandler = (data: GroupMemberItem) => {
    if (data.groupID === useConversationStore.getState().currentConversation?.groupID) {
      // updateMessageNicknameAndFaceUrl({
      //   sendID: data.userID,
      //   senderNickname: data.nickname,
      //   senderFaceUrl: data.faceURL,
      // });
      tryUpdateCurrentMemberInGroup(data);
    }
  };

  // application
  const updateRecvFriendApplication = useContactStore((state) => state.updateRecvFriendApplication);
  const updateSendFriendApplication = useContactStore((state) => state.updateSendFriendApplication);
  const updateRecvGroupApplication = useContactStore((state) => state.updateRecvGroupApplication);
  const updateSendGroupApplication = useContactStore((state) => state.updateSendGroupApplication);
  const friendApplicationProcessedHandler = (data: FriendApplicationItem) => {
    const isRecv = data.toUserID === useUserStore.getState().selfInfo.userID;
    if (isRecv) {
      updateRecvFriendApplication(data);
    } else {
      updateSendFriendApplication(data);
    }
  };
  const groupApplicationProcessedHandler = (data: GroupApplicationItem) => {
    const isRecv = data.userID !== useUserStore.getState().selfInfo.userID;
    if (isRecv) {
      updateRecvGroupApplication(data);
    } else {
      updateSendGroupApplication(data);
    }
  };

  const setIMListener = () => {
    // account
    OpenIMEmitter.addListener("onSelfInfoUpdated", selfUpdateHandler);
    OpenIMEmitter.addListener("onConnecting", connectingHandler);
    OpenIMEmitter.addListener("onConnectFailed", connectFailedHandler);
    OpenIMEmitter.addListener("onConnectSuccess", connectSuccessHandler);
    OpenIMEmitter.addListener("onKickedOffline", kickHandler);
    OpenIMEmitter.addListener("onUserTokenExpired", expiredHandler);

    // sync
    OpenIMEmitter.addListener("onSyncServerStart", syncStartHandler);
    OpenIMEmitter.addListener("onSyncServerFinish", syncFinishHandler);
    OpenIMEmitter.addListener("onSyncServerFailed", syncFailedHandler);

    // message
    OpenIMEmitter.addListener("onRecvNewMessages", newMessageHandler);

    // conversation
    OpenIMEmitter.addListener("onConversationChanged", conversationChnageHandler);
    OpenIMEmitter.addListener("onNewConversation", newConversationHandler);
    OpenIMEmitter.addListener("onTotalUnreadMessageCountChanged", totalUnreadChangeHandler);

    // friend
    OpenIMEmitter.addListener("onFriendInfoChanged", friednInfoChangeHandler);
    OpenIMEmitter.addListener("onFriendAdded", friednAddedHandler);
    OpenIMEmitter.addListener("onFriendDeleted", friednDeletedHandler);

    // blacklist
    OpenIMEmitter.addListener("onBlackAdded", blackAddedHandler);
    OpenIMEmitter.addListener("onBlackDeleted", blackDeletedHandler);

    // group
    OpenIMEmitter.addListener("onJoinedGroupAdded", joinedGroupAddedHandler);
    OpenIMEmitter.addListener("onJoinedGroupDeleted", joinedGroupDeletedHandler);
    OpenIMEmitter.addListener("onGroupDismissed", joinedGroupDismissHandler);
    OpenIMEmitter.addListener("onGroupInfoChanged", groupInfoChangedHandler);
    OpenIMEmitter.addListener("onGroupMemberAdded", groupMemberAddedHandler);
    OpenIMEmitter.addListener("onGroupMemberDeleted", groupMemberDeletedHandler);
    OpenIMEmitter.addListener("onGroupMemberInfoChanged", groupMemberInfoChangedHandler);

    // application
    OpenIMEmitter.addListener("onFriendApplicationAdded", friendApplicationProcessedHandler);
    OpenIMEmitter.addListener("onFriendApplicationAccepted", friendApplicationProcessedHandler);
    OpenIMEmitter.addListener("onFriendApplicationRejected", friendApplicationProcessedHandler);
    OpenIMEmitter.addListener("onGroupApplicationAdded", groupApplicationProcessedHandler);
    OpenIMEmitter.addListener("onGroupApplicationAccepted", groupApplicationProcessedHandler);
    OpenIMEmitter.addListener("onGroupApplicationRejected", groupApplicationProcessedHandler);
  };

  const disposeIMListener = () => {
    const eventNames = [
      "onSelfInfoUpdated",
      "onConnecting",
      "onConnectFailed",
      "onConnectSuccess",
      "onKickedOffline",
      "onUserTokenExpired",
      "onSyncServerStart",
      "onSyncServerFinish",
      "onSyncServerFailed",
      "onRecvNewMessage",
      "onRecvNewMessages",
      "onNewRecvMessageRevoked",
      "onConversationChanged",
      "onNewConversation",
      "onTotalUnreadMessageCountChanged",
      "onFriendInfoChanged",
      "onFriendAdded",
      "onFriendDeleted",
      "onBlackAdded",
      "onBlackDeleted",
      "onJoinedGroupAdded",
      "onJoinedGroupDeleted",
      "onGroupInfoChanged",
      "onGroupMemberAdded",
      "onGroupMemberDeleted",
      "onGroupMemberInfoChanged",
      "onFriendApplicationAdded",
      "onFriendApplicationAccepted",
      "onFriendApplicationRejected",
      "onGroupApplicationAdded",
      "onGroupApplicationAccepted",
      "onGroupApplicationRejected",
    ];
    eventNames.forEach((eventName) => {
      OpenIMEmitter.removeAllListeners(eventName);
    });
  };

  useEffect(() => {
    setIMListener();
    console.info("useGlobalEvent start");
    return () => {
      console.info("useGlobalEvent destroy");
      disposeIMListener();
    };
  }, []);
}
