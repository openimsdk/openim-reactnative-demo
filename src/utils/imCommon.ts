import OpenIMSDKRN from "open-im-sdk-rn";
import RNFS from "react-native-fs";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { v4 as uuidv4 } from "uuid";

import { getApiUrl, getWsUrl } from "@/config";
import { ConversationItem, MessageItem, PublicUserItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import { GroupSessionTypes, GroupSystemMessageTypes, MessageType, SessionType } from "@/constants";
import { useUserStore } from "@/store/user";
import { useContactStore } from "@/store/contact";
import { useConversationStore } from "@/store/conversation";
import i18n from "@/translations";

dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  calendar: {
    sameDay: "HH:mm",
    nextDay: "[tomorrow]",
    nextWeek: "dddd",
    lastDay: "[yesterday] HH:mm",
    lastWeek: "dddd HH:mm",
    sameElse: "YYYY/M/D HH:mm",
  },
});
dayjs.updateLocale("zh-cn", {
  calendar: {
    sameDay: "H:mm",
    nextDay: "[明天] H:mm",
    nextWeek: "dddd",
    lastDay: "[昨天] H:mm",
    lastWeek: "dddd HH:mm",
    sameElse: "YYYY年M月D日 HH:mm",
  },
});
dayjs.locale("en-US");

const { t } = i18n;

export const AddFriendQrCodePrefix = "io.openim.app/addFriend/";
export const AddGroupQrCodePrefix = "io.openim.app/joinGroup/";

export const initSDK = () => {
  RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/tmp`);
  OpenIMSDKRN.initSDK(
    {
      apiAddr: getApiUrl(),
      wsAddr: getWsUrl(),
      dataDir: `${RNFS.DocumentDirectoryPath}/tmp`,
      logLevel: 5,
      isLogStandardOutput: true,
    },
    uuidv4(),
  )
    .then(() => {
      console.log(`initSDK success`);
    })
    .catch((error) => {
      console.log("initSDK error", error);
    });
};

export const initStore = () => {
  const { getSelfInfoByReq } = useUserStore.getState();
  const {
    getBlackListByReq,
    getRecvFriendApplicationListByReq,
    getRecvGroupApplicationListByReq,
    getSendFriendApplicationListByReq,
    getSendGroupApplicationListByReq,
  } = useContactStore.getState();
  const { getConversationListByReq } = useConversationStore.getState();

  getConversationListByReq();
  getSelfInfoByReq();
  getBlackListByReq();
  getRecvFriendApplicationListByReq();
  getRecvGroupApplicationListByReq();
  getSendFriendApplicationListByReq();
  getSendGroupApplicationListByReq();
};

export const formatConversionTime = (timestemp: number): string => {
  if (!timestemp) return "";

  const fromNowStr = dayjs(timestemp).fromNow();

  if (fromNowStr.includes("seconds")) {
    return "Just now";
  }

  if (!fromNowStr.includes("seconds") && !fromNowStr.includes("minutes")) {
    return dayjs(timestemp).calendar();
  }

  return fromNowStr;
};

export const conversationSort = (conversationList: ConversationItem[]) => {
  const arr: string[] = [];
  const filterArr = conversationList.filter((c) => !arr.includes(c.conversationID) && arr.push(c.conversationID));
  filterArr.sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      const aCompare = a.draftTextTime > a.latestMsgSendTime ? a.draftTextTime : a.latestMsgSendTime;
      const bCompare = b.draftTextTime > b.latestMsgSendTime ? b.draftTextTime : b.latestMsgSendTime;
      if (aCompare > bCompare) {
        return -1;
      }
      if (aCompare < bCompare) {
        return 1;
      }
      return 0;
    }
    if (a.isPinned && !b.isPinned) {
      return -1;
    }
    return 1;
  });
  return filterArr;
};

export const isGroupSession = (sessionType?: SessionType) => (sessionType ? GroupSessionTypes.includes(sessionType) : false);

const linkWrap = ({ name }: { userID: string; groupID: string; name: string; fromAt?: boolean }) => {
  return `${name}`;
};

export const notificationMessageFormat = (msg: MessageItem) => {
  const selfID = useUserStore.getState().selfInfo.userID;
  const getName = (user: PublicUserItem) => (user.userID === selfID ? "You" : user.nickname);
  try {
    switch (msg.contentType) {
      case MessageType.FriendAdded:
        return t("message:alreadyFriendMessage");
      case MessageType.GroupCreated:
        const groupCreatedDetail = JSON.parse(msg.notificationElem.detail);
        const groupCreatedUser = groupCreatedDetail.opUser;
        return t("message:createGroupMessage", {
          creator: linkWrap({
            userID: groupCreatedUser.userID,
            groupID: msg.groupID,
            name: getName(groupCreatedUser as PublicUserItem),
          }),
        });
      case MessageType.MemberQuit:
        const quitDetails = JSON.parse(msg.notificationElem.detail);
        const quitUser = quitDetails.quitUser;
        return t("message:quitGroupMessage", {
          name: linkWrap({
            userID: quitUser.userID,
            groupID: msg.groupID,
            name: getName(quitUser as PublicUserItem),
          }),
        });
      case MessageType.MemberInvited:
        const inviteDetails = JSON.parse(msg.notificationElem.detail);
        const inviteOpUser = inviteDetails.opUser;
        const invitedUserList = inviteDetails.invitedUserList ?? [];
        let inviteStr = "";
        invitedUserList.slice(0, 3).map((user: PublicUserItem) => {
          inviteStr += `${linkWrap({
            userID: user.userID,
            groupID: msg.groupID,
            name: getName(user),
          })}、`;
          return null;
        });
        inviteStr = inviteStr.slice(0, -1);
        return t("message:invitedToGroupMessage", {
          operator: linkWrap({
            userID: inviteOpUser.userID,
            groupID: msg.groupID,
            name: getName(inviteOpUser as PublicUserItem),
          }),
          invitedUser: `${inviteStr}${invitedUserList.length > 3 ? "..." : ""}`,
        });
      case MessageType.MemberKicked:
        const kickDetails = JSON.parse(msg.notificationElem.detail);
        const kickOpUser = kickDetails.opUser;
        const kickdUserList = kickDetails.kickedUserList ?? [];
        let kickStr = "";
        kickdUserList.slice(0, 3).map((user: PublicUserItem) => {
          kickStr += `${linkWrap({
            userID: user.userID,
            groupID: msg.groupID,
            name: getName(user),
          })}、`;
          return null;
        });
        kickStr = kickStr.slice(0, -1);
        return t("message:kickInGroupMessage", {
          operator: linkWrap({
            userID: kickOpUser.userID,
            groupID: msg.groupID,
            name: getName(kickOpUser as PublicUserItem),
          }),
          kickedUser: `${kickStr}${kickdUserList.length > 3 ? "..." : ""}`,
        });
      case MessageType.MemberEnter:
        const enterDetails = JSON.parse(msg.notificationElem.detail);
        const enterUser = enterDetails.entrantUser;
        return t("message:joinGroupMessage", {
          name: linkWrap({
            userID: enterUser.userID,
            groupID: msg.groupID,
            name: getName(enterUser as PublicUserItem),
          }),
        });
      case MessageType.GroupDismissed:
        const dismissDetails = JSON.parse(msg.notificationElem.detail);
        const dismissUser = dismissDetails.opUser;
        return t("message:disbanedGroupMessage", {
          operator: linkWrap({
            userID: dismissUser.userID,
            groupID: msg.groupID,
            name: getName(dismissUser as PublicUserItem),
          }),
        });
      case MessageType.GroupNameUpdated:
        const groupNameDetails = JSON.parse(msg.notificationElem.detail);
        return t("message:updateGroupNameMessage", {
          operator: linkWrap({
            userID: groupNameDetails.opUser.userID,
            groupID: msg.groupID,
            name: getName(groupNameDetails.opUser as PublicUserItem),
          }),
          name: groupNameDetails.group.groupName,
        });
      default:
        return "";
    }
  } catch (error) {
    return "";
  }
};

export const formatMessageByType = (message: MessageItem): string => {
  const selfUserID = useUserStore.getState().selfInfo.userID;
  const getName = (user: PublicUserItem) => {
    return user.userID === selfUserID ? "You" : user.nickname;
  };
  switch (message.contentType) {
    case MessageType.TextMessage:
      return message.textElem?.content;
    case MessageType.PictureMessage:
      return t("message:imageMessage");
    case MessageType.VideoMessage:
      return t("message:videoMessage");
    case MessageType.FriendAdded:
      return t("message:alreadyFriendMessage");
    case MessageType.MemberEnter:
      const enterDetails = JSON.parse(message.notificationElem.detail);
      const enterUser = enterDetails.entrantUser;
      return t("message:joinGroupMessage", {
        name: getName(enterUser as PublicUserItem),
      });
    case MessageType.GroupCreated:
      const groupCreatedDetail = JSON.parse(message.notificationElem.detail);
      const groupCreatedUser = groupCreatedDetail.opUser;
      return t("message:createGroupMessage", {
        creator: getName(groupCreatedUser as PublicUserItem),
      });
    case MessageType.MemberInvited:
      const inviteDetails = JSON.parse(message.notificationElem.detail);
      const inviteOpUser = inviteDetails.opUser;
      const invitedUserList = inviteDetails.invitedUserList ?? [];
      let inviteStr = "";
      invitedUserList.slice(0, 3).map((user: PublicUserItem) => {
        inviteStr += `${getName(user)}、`;
        return null;
      });
      inviteStr = inviteStr.slice(0, -1);
      return t("message:invitedToGroupMessage", {
        operator: getName(inviteOpUser as PublicUserItem),
        invitedUser: `${inviteStr}${invitedUserList.length > 3 ? "..." : ""}`,
      });
    case MessageType.MemberKicked:
      const kickDetails = JSON.parse(message.notificationElem.detail);
      const kickOpUser = kickDetails.opUser;
      const kickdUserList = kickDetails.kickedUserList ?? [];
      let kickStr = "";
      kickdUserList.slice(0, 3).map((user: PublicUserItem) => {
        kickStr += `${getName(user)}、`;
        return null;
      });
      kickStr = kickStr.slice(0, -1);
      return t("message:kickInGroupMessage", {
        operator: getName(kickOpUser as PublicUserItem),
        kickedUser: `${kickStr}${kickdUserList.length > 3 ? "..." : ""}`,
      });
    case MessageType.MemberQuit:
      const quitDetails = JSON.parse(message.notificationElem.detail);
      const quitUser = quitDetails.quitUser;
      return t("message:quitGroupMessage", {
        name: getName(quitUser as PublicUserItem),
      });
    case MessageType.GroupDismissed:
      const dismissDetails = JSON.parse(message.notificationElem.detail);
      const dismissUser = dismissDetails.opUser;
      return t("message:disbanedGroupMessage", {
        operator: getName(dismissUser as PublicUserItem),
      });
    case MessageType.GroupNameUpdated:
      const groupNameDetails = JSON.parse(message.notificationElem.detail);
      return t("message:updateGroupNameMessage", {
        operator: getName(groupNameDetails.opUser as PublicUserItem),
        name: groupNameDetails.group.groupName,
      });
    default:
      return "";
  }
};

export const getConversationContent = (message: MessageItem) => {
  const selfInfo = useUserStore.getState().selfInfo;
  if (
    !message.groupID ||
    GroupSystemMessageTypes.includes(message.contentType) ||
    message.sendID === selfInfo.userID ||
    message.contentType === MessageType.GroupAnnouncementUpdated
  ) {
    return formatMessageByType(message);
  }
  return `${message.senderNickname}：${formatMessageByType(message)}`;
};
