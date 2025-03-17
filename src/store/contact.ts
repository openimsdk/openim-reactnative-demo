import { t } from "i18next";
import { create } from "zustand";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";

import {
  BlackUserItem,
  FriendApplicationItem,
  FriendUserItem,
  GroupApplicationItem,
  GroupItem,
} from "open-im-sdk-rn/lib/typescript/types/entity";
import { feedbackToast } from "@/utils/common";
import { ContactStore, UserCardData } from "./type";

export const useContactStore = create<ContactStore>()((set, get) => ({
  friendList: [],
  blackList: [],
  groupList: [],
  recvFriendApplicationList: [],
  sendFriendApplicationList: [],
  recvGroupApplicationList: [],
  sendGroupApplicationList: [],
  userCardData: {},
  getFriendListByReq: async () => {
    try {
      let offset = 0;
      let tmpList = [] as FriendUserItem[];
      let initialFetch = true;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const count = initialFetch ? 10000 : 1000;
        // eslint-disable-next-line no-await-in-loop
        const data = await OpenIMSDKRN.getFriendListPage({ offset, count }, uuidv4());
        tmpList = [...tmpList, ...data];
        offset += count;
        if (data.length < count) break;
        initialFetch = false;
      }
      set(() => ({
        friendList: tmpList,
      }));
    } catch (error) {
      feedbackToast({ error, msg: t("toast.getFriendListFailed") });
    }
  },
  setUserCardData(data: UserCardData) {
    set(() => ({
      userCardData: { ...data },
    }));
  },
  setFriendList: (list: FriendUserItem[]) => {
    set(() => ({ friendList: list }));
  },
  updateFriend: (friend: FriendUserItem, remove?: boolean) => {
    const tmpList = [...get().friendList];
    const idx = tmpList.findIndex((f) => f.userID === friend.userID);
    if (idx < 0) {
      return;
    }
    if (remove) {
      tmpList.splice(idx, 1);
    } else {
      tmpList[idx] = { ...friend };
    }
    set(() => ({ friendList: tmpList }));
  },
  pushNewFriend: (friend: FriendUserItem) => {
    set((state) => ({ friendList: [...state.friendList, friend] }));
  },
  getBlackListByReq: async () => {
    try {
      const data = await OpenIMSDKRN.getBlackList(uuidv4());
      set(() => ({ blackList: data }));
    } catch (error) {
      feedbackToast({ error, msg: t("toast.getBlackListFailed") });
    }
  },
  updateBlack: (black: BlackUserItem, remove?: boolean) => {
    const tmpList = [...get().blackList];
    const idx = tmpList.findIndex((b) => b.userID === black.userID);
    if (idx < 0) {
      return;
    }
    if (remove) {
      tmpList.splice(idx, 1);
    } else {
      tmpList[idx] = { ...black };
    }
    set(() => ({ blackList: tmpList }));
  },
  pushNewBlack: (black: BlackUserItem) => {
    set((state) => ({ blackList: [...state.blackList, black] }));
  },
  getGroupListByReq: async () => {
    try {
      let offset = 0;
      let tmpList = [] as GroupItem[];
      // eslint-disable-next-line no-constant-condition
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const data = await OpenIMSDKRN.getJoinedGroupListPage({ offset, count: 1000 }, uuidv4());
        tmpList = [...tmpList, ...data];
        offset += 1000;
        if (data.length < 1000) break;
      }
      set(() => ({ groupList: tmpList }));
    } catch (error) {
      feedbackToast({ error, msg: t("toast.getGroupListFailed") });
    }
  },
  setGroupList: (list: GroupItem[]) => {
    set(() => ({ groupList: list }));
  },
  updateGroup: (group: GroupItem, remove?: boolean) => {
    const tmpList = [...get().groupList];
    const idx = tmpList.findIndex((g) => g.groupID === group.groupID);
    if (idx < 0) {
      return;
    }
    if (remove) {
      tmpList.splice(idx, 1);
    } else {
      tmpList[idx] = { ...group };
    }
    set(() => ({ groupList: tmpList }));
  },
  pushNewGroup: (group: GroupItem) => {
    set((state) => ({ groupList: [...state.groupList, group] }));
  },
  getRecvFriendApplicationListByReq: async () => {
    try {
      const data = await OpenIMSDKRN.getFriendApplicationListAsRecipient(uuidv4());
      set(() => ({ recvFriendApplicationList: data }));
    } catch (error) {
      console.error(error);
    }
  },
  updateRecvFriendApplication: (application: FriendApplicationItem) => {
    let tmpList = [...get().recvFriendApplicationList];
    const idx = tmpList.findIndex((item) => application.fromUserID === item.fromUserID);
    if (idx < 0) {
      tmpList = [...tmpList, application];
    } else {
      tmpList[idx] = { ...application };
    }
    set(() => ({ recvFriendApplicationList: tmpList }));
  },
  getSendFriendApplicationListByReq: async () => {
    try {
      const data = await OpenIMSDKRN.getFriendApplicationListAsApplicant(uuidv4());
      set(() => ({ sendFriendApplicationList: data }));
    } catch (error) {
      console.error(error);
    }
  },
  updateSendFriendApplication: (application: FriendApplicationItem) => {
    let tmpList = [...get().sendFriendApplicationList];
    const idx = tmpList.findIndex((a) => a.toUserID === application.toUserID);
    if (idx < 0) {
      tmpList = [...tmpList, application];
    } else {
      tmpList[idx] = { ...application };
    }
    set(() => ({ sendFriendApplicationList: tmpList }));
  },
  getRecvGroupApplicationListByReq: async () => {
    try {
      const data = await OpenIMSDKRN.getGroupApplicationListAsRecipient(uuidv4());
      set(() => ({ recvGroupApplicationList: data }));
    } catch (error) {
      console.error(error);
    }
  },
  updateRecvGroupApplication: (application: GroupApplicationItem) => {
    let tmpList = [...get().recvGroupApplicationList];
    const idx = tmpList.findIndex((a) => a.userID === application.userID);
    if (idx < 0) {
      tmpList = [...tmpList, application];
    } else {
      tmpList[idx] = { ...application };
    }
    set(() => ({ recvGroupApplicationList: tmpList }));
  },
  getSendGroupApplicationListByReq: async () => {
    try {
      const data = await OpenIMSDKRN.getGroupApplicationListAsApplicant(uuidv4());
      set(() => ({ sendGroupApplicationList: data }));
    } catch (error) {
      console.error(error);
    }
  },
  updateSendGroupApplication: (application: GroupApplicationItem) => {
    let tmpList = [...get().sendGroupApplicationList];
    const idx = tmpList.findIndex((a) => a.groupID === application.groupID);
    if (idx < 0) {
      tmpList = [...tmpList, application];
    } else {
      tmpList[idx] = { ...application };
    }
    set(() => ({ sendGroupApplicationList: tmpList }));
  },
  clearContactStore: () => {
    set(() => ({
      friendList: [],
      blackList: [],
      groupList: [],
      recvFriendApplicationList: [],
      sendFriendApplicationList: [],
      recvGroupApplicationList: [],
      sendGroupApplicationList: [],
      unHandleFriendApplicationCount: 0,
      unHandleGroupApplicationCount: 0,
    }));
  },
}));
