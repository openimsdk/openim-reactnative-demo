import { getChatUrl } from "@/config";
import { AppConfig } from "@/types/chat";
import { platformID } from "@/utils/imCommon";
import createAxiosInstance from "@/utils/request";

const request = createAxiosInstance(getChatUrl(), false);

export const login = (params: API.Login.LoginParams) => {
  return request.post<API.Login.LoginResult>("/account/login", {
    ...params,
    deviceID: "",
    platform: platformID,
    account: "",
  });
};

export const sendSms = (params: API.Login.SendSmsParams) => {
  return request.post("/account/code/send", {
    ...params,
  });
};

export const verifyCode = (params: API.Login.VerifyCodeParams) => {
  return request.post("/account/code/verify", {
    ...params,
  });
};

export const register = (params: API.Login.DemoRegisterType) => {
  return request.post<{ chatToken: string; imToken: string; userID: string }>("/account/register", {
    ...params,
    user: {
      ...params.user,
    },
    platform: platformID,
  });
};

export const getAppConfig = () => request.post<{ config: AppConfig }>("/client_config/get", {});
