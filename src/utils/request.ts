import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { getChatToken, getIMToken } from "./storage";
import { feedbackToast } from "./common";

type ErrorData = {
  errCode: number;
  errMsg?: string;
};

const ErrCodeMap: Record<number, string> = {
  20001: "passwordError",
  20002: "accountNotExist",
  20003: "phoneNumberRegistered",
  20004: "accountRegistered",
  20005: "operationTooFrequent",
  20006: "verificationCodeError",
  20007: "verificationCodeExpired",
  20008: "verificationCodeErrorLimitExceed",
  20009: "verificationCodeUsed",
  20010: "invitationCodeUsed",
  20011: "invitationCodeNotExist",
  20012: "operationRestriction",
  20014: "accountRegistered",
};

const createAxiosInstance = (baseURL: string, imToken = true) => {
  const serves = axios.create({
    baseURL,
    timeout: 25000,
  });

  serves.interceptors.request.use(
    async (config) => {
      const newConfig = config;
      const token = imToken ? await getIMToken() : await getChatToken();
      newConfig.headers.token = token;
      newConfig.headers.operationID = uuidv4();
      return newConfig;
    },
    (err) => Promise.reject(err),
  );

  serves.interceptors.response.use(
    (res) => {
      if (res.data.errCode !== 0) {
        const errData = res.data as ErrorData;
        if (errData.errMsg) {
          feedbackToast({
            msg: ErrCodeMap[errData.errCode],
            error: errData.errMsg,
          });
        }
        return Promise.reject(res.data);
      }
      return Promise.resolve(res.data);
    },
    (err) => {
      if (err.message.includes("timeout")) {
        console.error("error", err);
      }
      if (err.message.includes("Network Error")) {
        console.error("error", err);
      }
      return Promise.reject(err);
    },
  );

  return serves;
};

export default createAxiosInstance;
