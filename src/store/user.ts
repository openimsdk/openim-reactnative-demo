import { t } from "i18next";
import { create } from "zustand";
import OpenIMSDKRN from "open-im-sdk-rn";
import { v4 as uuidv4 } from "uuid";

import { clearIMProfile } from "@/utils/storage";
import { BusinessAllowType, BusinessUserInfo } from "@/types/chat";
import { feedbackToast } from "@/utils/common";
import { getAppConfig } from "@/api/login";
import { getBusinessUserInfo } from "@/api/chat";
import { AppConfig, UserStore } from "./type";
import { useContactStore } from "./contact";
import { useConversationStore } from "./conversation";

export const useUserStore = create<UserStore>()((set, get) => ({
  syncing: false,
  selfInfo: {} as BusinessUserInfo,
  appConfig: {} as AppConfig,
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
  getAppConfigByReq: async () => {
    let config = {} as AppConfig;
    try {
      const { data } = await getAppConfig();
      config = data.config ?? {};
      if (!config.allowSendMsgNotFriend) {
        config.allowSendMsgNotFriend = BusinessAllowType.Allow;
      }
      if (!config.needInvitationCodeRegister) {
        config.needInvitationCodeRegister = BusinessAllowType.Allow;
      }
    } catch (error) {
      console.error("get app config err");
    }
    console.log(config);
    set((state) => ({ appConfig: { ...state.appConfig, ...config } }));
  },
  userLogout: () => {
    OpenIMSDKRN.logout(uuidv4());
    set({ selfInfo: {} as BusinessUserInfo });
    clearIMProfile();
    useContactStore.getState().clearContactStore();
    useConversationStore.getState().clearConversationStore();
  },
}));
