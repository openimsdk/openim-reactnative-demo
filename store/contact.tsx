import { create } from "zustand";
import { ContactStore, FriendApplicationItem, FriendUserItem } from "./type.d";
import { GetFriendList } from "../src/screens/api/openimsdk";
import OpenIMSDKRN from "open-im-sdk-rn";

export const useContactStore = create<ContactStore>()((set, get) => ({
    friendList: [],
    blackList: [],
    groupList: [],
    recvFriendApplicationList: [],
    sendFriendApplicationList: [],
    recvGroupApplicationList: [],
    sendGroupApplicationList: [],
    unHandleFriendApplicationCount: 0,
    unHandleGroupApplicationCount: 0,
    getFriendListByReq: async () => {
        try {
            const stringData = await OpenIMSDKRN.getFriendList("61387298");
            const data = JSON.parse(stringData)
            set(() => ({ friendList: data.map((item) => item.friendInfo!) }));
        } catch (error) {
            console.error("getFriendListByReq ", error)
        }
    },
    setFriendList: (list: FriendUserItem[]) => {
        set(() => ({ friendList: list }));
    },
    
    pushNewFriend: (friend: FriendUserItem) => {
      
        set((state) => ({ friendList: [...state.friendList, friend] }));
      },
    updateFriend: (friend: FriendUserItem, remove?: boolean) => {
        const tmpList = [...get().friendList];
        const idx = tmpList.findIndex((f) => f.userID === friend.userID);

        if (idx < 0) {
            return;
        }
        if (remove) {
            tmpList.splice(idx);
        } else {
            tmpList[idx] = { ...friend };
        }
        set(() => ({ friendList: tmpList }));
    },
    getRecvFriendApplicationListByReq: async () => {

        try {
            const data = await OpenIMSDKRN.getFriendApplicationListAsRecipient("123");
            set(() => ({ recvFriendApplicationList: JSON.parse(data) }));
        } catch (error) {
            console.error('getRecvFriendApplicationListByReq ', error);
        }
    },
    updateRecvFriendApplication: (application: FriendApplicationItem) => {
        let tmpList = [...get().recvFriendApplicationList];
        let isHandleResultUpdate = false;
        const idx = tmpList.findIndex((a) => a.fromUserID === application.fromUserID);
        if (idx < 0) {
          tmpList = [...tmpList, application];
        } else {
          isHandleResultUpdate = tmpList[idx].handleResult !== application.handleResult;
          tmpList[idx] = { ...application };
        }
        if (idx < 0 || isHandleResultUpdate) {
          const unHandleFriendApplicationCount = tmpList.filter(
            (application) => application.handleResult === 0,
          ).length;
    
          set(() => ({
            recvFriendApplicationList: tmpList,
            unHandleFriendApplicationCount,
          }));
          return;
        }
        set(() => ({ recvFriendApplicationList: tmpList }));
      },
    getSendFriendApplicationListByReq: async () => {
        try {
            const data = await OpenIMSDKRN.getFriendApplicationListAsApplicant("192");
            set(() => ({ sendFriendApplicationList: JSON.parse(data) }));
        } catch (error) {
            console.error('getSendFriendApplicationListByReq ', error);
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
    clearContactStore: () => {
        set(() => ({
            friendList: [],
            recvFriendApplicationList: [],
            sendFriendApplicationList: [],
        }));
    },

}));