import { t } from "i18next";
import { create } from "zustand";
import { ConversationItem, GroupItem, GroupMemberItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";
import { feedbackToast } from "@/utils/common";
import { conversationSort, isGroupSession } from "@/utils/imCommon";

import { useMessageStore } from "./message";
import { useUserStore } from "./user";
import { ConversationListUpdateType, ConversationStore } from "./type";

const CONVERSATION_SPLIT_COUNT = 500;

export const useConversationStore = create<ConversationStore>()((set, get) => ({
  conversationIniting: true,
  conversationList: [],
  currentConversation: undefined,
  unReadCount: 0,
  currentGroupInfo: undefined,
  currentMemberInGroup: undefined,
  getConversationListByReq: async (isOffset?: boolean) => {
    if (!isOffset) set(() => ({ conversationIniting: true }));

    let tmpConversationList = [] as ConversationItem[];
    try {
      const data = await OpenIMSDKRN.getConversationListSplit(
        {
          offset: isOffset ? get().conversationList.length : 0,
          count: CONVERSATION_SPLIT_COUNT,
        },
        uuidv4(),
      );
      tmpConversationList = data;
    } catch (error) {
      feedbackToast({ error, msg: t("toast.getConversationFailed") });
      if (!isOffset) set(() => ({ conversationIniting: false }));
      return true;
    }
    set((state) => ({
      conversationList: [...(isOffset ? state.conversationList : []), ...tmpConversationList],
    }));
    if (!isOffset) set(() => ({ conversationIniting: false }));
    return tmpConversationList.length === CONVERSATION_SPLIT_COUNT;
  },
  updateConversationList: (list: ConversationItem[], type: ConversationListUpdateType) => {
    const idx = list.findIndex((c) => c.conversationID === get().currentConversation?.conversationID);
    if (idx > -1) get().updateCurrentConversation(list[idx]);

    if (type === "filter") {
      set((state) => ({
        conversationList: conversationSort([...list, ...state.conversationList]),
      }));
      return;
    }
    let filterArr: ConversationItem[] = [];
    const chids = list.map((ch) => ch.conversationID);
    filterArr = get().conversationList.filter((tc) => !chids.includes(tc.conversationID));

    set(() => ({ conversationList: conversationSort([...list, ...filterArr]) }));
  },
  delConversationByCID: (conversationID: string) => {
    const tmpConversationList = get().conversationList;
    const idx = tmpConversationList.findIndex((cve) => cve.conversationID === conversationID);
    if (idx < 0) {
      return;
    }
    tmpConversationList.splice(idx, 1);
    set(() => ({ conversationList: [...tmpConversationList] }));
  },
  updateCurrentConversation: (conversation?: ConversationItem, isJump?: boolean) => {
    if (!conversation) {
      set(() => ({
        currentConversation: undefined,
        quoteMessage: undefined,
        currentGroupInfo: undefined,
        currentMemberInGroup: undefined,
      }));
      return;
    }
    const prevConversation = get().currentConversation;

    const toggleNewConversation = conversation.conversationID !== prevConversation?.conversationID;
    if (toggleNewConversation && isGroupSession(conversation.conversationType)) {
      get().getCurrentGroupInfoByReq(conversation.groupID);
      get().getCurrentMemberInGroupByReq(conversation.groupID);
      useMessageStore.getState().updateReverseLoad(false);
    }
    if (toggleNewConversation && !isJump) {
      useMessageStore.getState().updateJumpClientMsgID();
    }
    set(() => ({ currentConversation: { ...conversation } }));
  },
  updateCurrentConversationFields: (fields: Partial<ConversationItem>) => {
    set((state) => ({
      currentConversation: {
        ...state.currentConversation!,
        ...fields,
      },
    }));
  },
  getUnReadCountByReq: async () => {
    try {
      const data = await OpenIMSDKRN.getTotalUnreadMsgCount(uuidv4());
      set(() => ({ unReadCount: data }));
      return data;
    } catch (error) {
      console.error(error);
      return 0;
    }
  },
  updateUnReadCount: (count: number) => {
    set(() => ({ unReadCount: count }));
  },
  decreaseUnReadCount: (count: number) => {
    set((state) => ({
      unReadCount: state.unReadCount >= count ? state.unReadCount - count : 0,
    }));
  },
  getCurrentGroupInfoByReq: async (groupID: string) => {
    let groupInfo: GroupItem;
    try {
      const data = await OpenIMSDKRN.getSpecifiedGroupsInfo([groupID], uuidv4());
      [groupInfo] = data;
    } catch (error) {
      feedbackToast({ error, msg: t("toast.getGroupInfoFailed") });
      return;
    }
    set(() => ({ currentGroupInfo: { ...groupInfo } }));
  },
  updateCurrentGroupInfo: (groupInfo: GroupItem) => {
    set(() => ({ currentGroupInfo: { ...groupInfo } }));
  },
  getCurrentMemberInGroupByReq: async (groupID: string) => {
    let memberInfo: GroupMemberItem;
    const selfID = useUserStore.getState().selfInfo.userID;
    try {
      const data = await OpenIMSDKRN.getSpecifiedGroupMembersInfo(
        {
          groupID,
          userIDList: [selfID],
        },
        uuidv4(),
      );
      [memberInfo] = data;
    } catch (error) {
      feedbackToast({ error, msg: t("toast.getGroupMemberFailed") });
      return;
    }
    set(() => ({ currentMemberInGroup: { ...memberInfo } }));
  },
  tryUpdateCurrentMemberInGroup: (member: GroupMemberItem) => {
    const { currentMemberInGroup } = get();
    if (member.groupID === currentMemberInGroup?.groupID && member.userID === currentMemberInGroup?.userID) {
      set(() => ({ currentMemberInGroup: { ...member } }));
    }
  },
  clearConversationStore: () => {
    set(() => ({
      conversationList: [],
      currentConversation: undefined,
      unReadCount: 0,
      currentGroupInfo: undefined,
      currentMemberInGroup: undefined,
      quoteMessage: undefined,
    }));
  },
}));
