
import { create } from "zustand";
import { ConversationItem, GroupItem, GroupMemberItem, MessageItem } from "./types/entity";
import { ConversationListUpdateType, ConversationStore } from "./type.d";
import OpenIMSDKRN from "open-im-sdk-rn";
import { useUserStore } from "./user";
import { SessionType } from "./types/enum";
export const conversationSort = (conversationList: ConversationItem[]) => {
    const arr: string[] = [];
    const filterArr = conversationList.filter(
        (c) => !arr.includes(c.conversationID) && arr.push(c.conversationID),
    );
    filterArr.sort((a, b) => {
        if (a.isPinned === b.isPinned) {
            const aCompare =
                a.draftTextTime > a.latestMsgSendTime ? a.draftTextTime : a.latestMsgSendTime;
            const bCompare =
                b.draftTextTime > b.latestMsgSendTime ? b.draftTextTime : b.latestMsgSendTime;
            if (aCompare > bCompare) {
                return -1;
            } else if (aCompare < bCompare) {
                return 1;
            } else {
                return 0;
            }
        } else if (a.isPinned && !b.isPinned) {
            return -1;
        } else {
            return 1;
        }
    });
    
    return filterArr;
};
export const isGroupSession = (sessionType?: SessionType) =>
  sessionType === SessionType.WorkingGroup;

export const useConversationStore = create<ConversationStore>()((set, get) => ({
    conversationList: [],
    currentConversation: undefined,
    unReadCount: 0,
    currentGroupInfo: undefined,
    currentMemberInGroup: undefined,
    quoteMessage: undefined,
    getConversationListByReq: async (isOffset?: boolean) => {
        
        let tmpConversationList = [] as ConversationItem[];
        try {
            const  data  = await OpenIMSDKRN.getConversationListSplit({
                offset: isOffset ? get().conversationList.length : 0,
                count: 20
            },"127368");
            tmpConversationList = JSON.parse(data);
            
        } catch (error) {
            //   feedbackToast({ error, msg: t("toast.getConversationFailed") });
            return true;
        }
        set((state) => ({
            conversationList: [
                ...(isOffset ? state.conversationList : []),
                ...tmpConversationList,
            ],
        }));
        return tmpConversationList.length === 20;
    },
    updateConversationList: (
        list: ConversationItem[],
        type: ConversationListUpdateType,
    ) => {
        const idx = list.findIndex(
            (c) => c.conversationID === get().currentConversation?.conversationID,
        );
        if (idx > -1) get().updateCurrentConversation(list[idx]);

        if (type === "filter") {
            set((state) => ({
                conversationList: conversationSort([...list, ...state.conversationList]),
            }));
            return;
        }
        let filterArr: ConversationItem[] = [];
        const chids = list.map((ch) => ch.conversationID);
        filterArr = get().conversationList.filter(
            (tc) => !chids.includes(tc.conversationID),
        );

        set(() => ({ conversationList: conversationSort([...list, ...filterArr]) }));
    },
    delConversationByCID: (conversationID: string) => {
        const tmpConversationList = get().conversationList;
        const idx = tmpConversationList.findIndex(
            (cve) => cve.conversationID === conversationID,
        );
        if (idx < 0) {
            return;
        }
        tmpConversationList.splice(idx, 1);
        set(() => ({ conversationList: [...tmpConversationList] }));
    },
    updateCurrentConversation: (conversation?: ConversationItem) => {
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

        console.log("prevConversation:::");
        console.log(prevConversation);

        const toggleNewConversation =
            conversation.conversationID !== prevConversation?.conversationID;
        if (toggleNewConversation && isGroupSession(conversation.conversationType)) {
            get().getCurrentGroupInfoByReq(conversation.groupID);
            get().getCurrentMemberInGroupByReq(conversation.groupID);
        }
        set(() => ({ currentConversation: { ...conversation } }));
    },
    getUnReadCountByReq: async () => {
        try {
            const { data } = await OpenIMSDKRN.getTotalUnreadMsgCount("89342378");
            set(() => ({ unReadCount: data }));
        } catch (error) {
            console.error(error);
        }
    },
    updateUnReadCount: (count: number) => {
        set(() => ({ unReadCount: count }));
    },
    getCurrentGroupInfoByReq: async (groupID: string) => {
        let groupInfo: GroupItem;
        try {
            const { data } = await OpenIMSDKRN.getSpecifiedGroupsInfo([groupID],"91239");
            groupInfo = data[0];
            console.info(`getCurrentGroupInfoByReq: ${groupInfo.groupID}`);
        } catch (error) {
            // feedbackToast({ error, msg: t("toast.getGroupInfoFailed") });
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
            const { data } = await OpenIMSDKRN.getSpecifiedGroupMembersInfo({
                groupID,
                userIDList: [selfID],
            },"98273198");
            memberInfo = data[0];
            console.info(`getCurrentMemberInGroupByReq: ${memberInfo?.groupID}`);
        } catch (error) {
            // feedbackToast({ error, msg: t("toast.getGroupMemberFailed") });
            return;
        }
        set(() => ({ currentMemberInGroup: { ...memberInfo } }));
    },
    tryUpdateCurrentMemberInGroup: (member: GroupMemberItem) => {
        const currentMemberInGroup = get().currentMemberInGroup;
        if (
            member.groupID === currentMemberInGroup?.groupID &&
            member.userID === currentMemberInGroup?.userID
        ) {
            set(() => ({ currentMemberInGroup: { ...member } }));
        }
    },
    updateQuoteMessage: (message?: MessageItem) => {
        set(() => ({ quoteMessage: message }));
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
