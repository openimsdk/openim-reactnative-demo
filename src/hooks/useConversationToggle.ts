import { useCallback } from "react";
import { ConversationItem } from "open-im-sdk-rn/lib/typescript/types/entity";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ApplicationStackParamList } from "@/types/navigation";
import { useConversationStore } from "@/store/conversation";
import { SessionType } from "@/constants";
import { feedbackToast } from "@/utils/common";

export function useConversationToggle() {
  const navigation = useNavigation<NavigationProp<ApplicationStackParamList>>();

  const updateCurrentConversation = useConversationStore((state) => state.updateCurrentConversation);

  const getConversation = async ({
    sourceID,
    sessionType,
  }: {
    sourceID: string;
    sessionType: SessionType;
  }): Promise<ConversationItem | undefined> => {
    let conversation = useConversationStore
      .getState()
      .conversationList.find((item) => item.userID === sourceID || item.groupID === sourceID);
    if (!conversation) {
      try {
        conversation = await OpenIMSDKRN.getOneConversation(
          {
            sourceID,
            sessionType,
          },
          uuidv4(),
        );
      } catch (error) {
        feedbackToast({ error });
      }
    }
    return conversation;
  };

  const toSpecifiedConversation = useCallback(
    async (
      data: {
        sourceID: string;
        sessionType: SessionType;
      },
      isJump?: boolean,
    ) => {
      const conversation = await getConversation(data);
      if (!conversation || useConversationStore.getState().currentConversation?.conversationID === conversation.conversationID)
        return;
      updateCurrentConversation({ ...conversation }, isJump);
      navigation.navigate("Chat");
    },
    [],
  );

  return {
    toSpecifiedConversation,
  };
}
