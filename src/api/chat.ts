import { getChatUrl } from "@/config";
import { useUserStore } from "@/store/user";
import { AppConfig, BusinessUserInfo } from "@/types/chat";
import createAxiosInstance from "@/utils/request";

const request = createAxiosInstance(getChatUrl(), false);

export const getAppConfig = () => request.post<{ config: AppConfig }>("/client_config/get", {});

export const getBusinessUserInfo = (userIDs: string[]) => {
  return request.post<{ users: BusinessUserInfo[] }>("/user/find/full", {
    userIDs,
  });
};

export const searchBusinessUserInfo = (keyword: string) => {
  return request.post<{ total: number; users: BusinessUserInfo[] }>("/user/search/full", {
    keyword,
    pagination: {
      pageNumber: 1,
      showNumber: 100,
    },
  });
};

type UpdateBusinessUserInfoParams = {
  email: string;
  nickname: string;
  faceURL: string;
  gender: number;
  birth: number;
  allowAddFriend: number;
  allowBeep: number;
  allowVibration: number;
  globalRecvMsgOpt: number;
};

export const updateBusinessUserInfo = (params: Partial<UpdateBusinessUserInfoParams>) => {
  return request.post("/user/update", {
    ...params,
    userID: useUserStore.getState().selfInfo?.userID,
  });
};
