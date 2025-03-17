import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { ExMessageItem } from "@/store/type";
import { useMessageStore } from "@/store/message";
import { useConversationStore } from "@/store/conversation";
import { MessageItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import OpenIMSDKRN from "open-im-sdk-rn";
import { MessageStatus } from "@/constants";

export declare type OfflinePush = {
  title: string;
  desc: string;
  ex: string;
  iOSPushSound: string;
  iOSBadgeCount: boolean;
};

export type SendMsgParams = {
  recvID: string;
  groupID: string;
  offlinePushInfo?: OfflinePush;
  message: MessageItem;
  isOnlineOnly?: boolean;
};

export type SendMessageParams = Partial<Omit<SendMsgParams, "message">> & {
  message: ExMessageItem;
  needPush?: boolean;
  isResend?: boolean;
};

export function useSendMessage() {
  const pushNewMessage = useMessageStore((state) => state.pushNewMessage);
  const updateOneMessage = useMessageStore((state) => state.updateOneMessage);
  const deleteAndPushOneMessage = useMessageStore((state) => state.deleteAndPushOneMessage);

  const sendMessage = useCallback(async ({ recvID, groupID, message, needPush, isResend }: SendMessageParams) => {
    const currentConversation = useConversationStore.getState().currentConversation;
    const sourceID = recvID || groupID;
    const inCurrentConversation =
      currentConversation?.userID === sourceID || currentConversation?.groupID === sourceID || !sourceID;
    needPush = needPush ?? inCurrentConversation;

    if (needPush) {
      pushNewMessage(message);
    }

    const options = {
      recvID: recvID ?? currentConversation?.userID ?? "",
      groupID: groupID ?? currentConversation?.groupID ?? "",
      message,
    };

    try {
      const successMessage = await OpenIMSDKRN.sendMessage(options, uuidv4());
      if (isResend) {
        deleteAndPushOneMessage(successMessage as ExMessageItem);
        return;
      }
      updateOneMessage(successMessage as ExMessageItem);
    } catch (error) {
      updateOneMessage({
        ...message,
        status: MessageStatus.Failed,
        errCode: 0,
      });
    }
  }, []);

  return {
    sendMessage,
    updateOneMessage,
  };
}
