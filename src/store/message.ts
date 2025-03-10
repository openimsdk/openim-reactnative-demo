import { create } from "zustand";

import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";
import { SessionType, ViewType } from "@/constants";

import { ExMessageItem, MessageStore, UpdateMessaggeBaseInfoParams } from "./type";
import { useConversationStore } from "./conversation";

const GET_HISTORY_MESSAGE_COUNT = 20;

export const useMessageStore = create<MessageStore>()((set, get) => ({
  historyMessageList: [],
  isCheckMode: false,
  jumpClientMsgID: undefined,
  hasMore: true,
  laterHasMore: false,
  enableReverseLoad: false,
  downloadMap: {},
  getHistoryMessageListByReq: async (loadMore = false) => {
    const conversationID = useConversationStore.getState().currentConversation?.conversationID;
    if (!conversationID) return;
    try {
      const prevList = [...get().historyMessageList];
      const data = await OpenIMSDKRN.getAdvancedHistoryMessageList(
        {
          count: GET_HISTORY_MESSAGE_COUNT,
          startClientMsgID: loadMore ? prevList[prevList.length - 1]?.clientMsgID : "",
          conversationID,
          viewType: ViewType.History,
        },
        uuidv4(),
      );

      if (conversationID !== useConversationStore.getState().currentConversation?.conversationID) return;

      (data.messageList as ExMessageItem[]).map((message, idx) => {
        if (!idx) {
          message.gapTime = true;
          return null;
        }
        const prevTime = data.messageList[idx - 1]?.sendTime;
        if (message.sessionType === SessionType.Notification) {
          (data.messageList[idx - 1] as ExMessageItem).gapTime = message.sendTime - prevTime > 300000;
        } else {
          message.gapTime = message.sendTime - prevTime > 300000;
        }
        return null;
      });
      const nextList = [...(loadMore ? prevList : []), ...data.messageList.reverse()];

      set(() => ({
        hasMore: data.messageList.length !== 0,
        historyMessageList: nextList,
      }));
    } catch (error) {
      // feedbackToast({ error, msg: t("toast.getHistoryMessageFailed") });
      set(() => ({
        hasMore: false,
        historyMessageList: [],
      }));
    }
  },
  pushNewMessage: (message: ExMessageItem) => {
    set((state) => ({
      historyMessageList: [message, ...state.historyMessageList],
    }));
  },
  updateOneMessage: (message: ExMessageItem) => {
    const tmpList = [...get().historyMessageList];
    const idx = tmpList.findIndex((msg) => msg.clientMsgID === message.clientMsgID);
    if (idx < 0) {
      return;
    }
    tmpList[idx] = { ...tmpList[idx], ...message };

    set(() => ({ historyMessageList: tmpList }));
  },
  deleteOneMessage: (clientMsgID: string) => {
    const tmpList = get().historyMessageList;
    const idx = tmpList.findIndex((msg) => msg.clientMsgID === clientMsgID);
    if (idx < 0) {
      return;
    }
    tmpList.splice(idx, 1);
    set(() => ({ historyMessageList: [...tmpList] }));
  },
  deleteAndPushOneMessage: (message: ExMessageItem) => {
    const tmpList = get().historyMessageList;
    const idx = tmpList.findIndex((msg) => msg.clientMsgID === message.clientMsgID);
    if (idx < 0) {
      return;
    }
    tmpList.splice(idx, 1);
    set(() => ({ historyMessageList: [message, ...tmpList] }));
  },
  updateMessageNicknameAndFaceUrl: ({ sendID, senderFaceUrl, senderNickname }: UpdateMessaggeBaseInfoParams) => {
    const tmpList = [...get().historyMessageList].map((message) => {
      if (message.sendID === sendID) {
        message.senderFaceUrl = senderFaceUrl;
        message.senderNickname = senderNickname;
      }
      return message;
    });
    set(() => ({ historyMessageList: tmpList }));
  },
  clearHistoryMessage: () => {
    set(() => ({ historyMessageList: [], hasMore: false }));
  },
  updateCheckMode: (isCheckMode: boolean) => {
    if (!isCheckMode) {
      const tmpList = [...get().historyMessageList].map((message) => {
        message.checked = false;
        return message;
      });
      set(() => ({ historyMessageList: tmpList }));
    }
    set(() => ({ isCheckMode }));
  },
  updateMessagePreview: (message: ExMessageItem) => {
    console.log(message);
  },
  updateJumpClientMsgID: (clientMsgID?: string) => {
    set(() => ({ jumpClientMsgID: clientMsgID }));
  },
  updateReverseLoad: (enable: boolean) => {
    set(() => ({ enableReverseLoad: enable }));
  },
  clearMessage: () => {
    set(() => ({ historyMessageList: [] }));
  },
}));
