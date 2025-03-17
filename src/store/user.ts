import { t } from "i18next";
import { create } from "zustand";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";

import { clearIMProfile } from "@/utils/storage";
import { BusinessUserInfo } from "@/types/chat";
import { feedbackToast } from "@/utils/common";
import { getBusinessUserInfo } from "@/api/chat";
import { UserStore } from "./type";
import { useContactStore } from "./contact";
import { useConversationStore } from "./conversation";

export const useUserStore = create<UserStore>()((set, get) => ({
  syncing: false,
  selfInfo: {} as BusinessUserInfo,
  updateSyncState: (syncing: boolean) => {
    set({ syncing });
  },
  getSelfInfoByReq: async () => {
    try {
      const data = await OpenIMSDKRN.getSelfUserInfo(uuidv4());
      getBusinessUserInfo([data.userID]).then(({ data: { users } }) =>
        set((state) => ({ selfInfo: { ...state.selfInfo, ...users[0] } })),
      );
    } catch (error) {
      feedbackToast({ error, msg: t("toast.getSelfInfoFailed") });
      get().userLogout();
    }
  },
  updateSelfInfo: (info: Partial<BusinessUserInfo>) => {
    set((state) => ({ selfInfo: { ...state.selfInfo, ...info } }));
  },
  userLogout: () => {
    OpenIMSDKRN.logout(uuidv4());
    set({ selfInfo: {} as BusinessUserInfo });
    clearIMProfile();
    useContactStore.getState().clearContactStore();
    useConversationStore.getState().clearConversationStore();
  },
}));
