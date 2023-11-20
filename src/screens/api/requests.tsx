import { Platform } from "react-native";
import { USER_URL } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { criticallyDampedSpringCalculations } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";
import { BusinessUserInfo } from "../../../store/user";
import axios from 'axios';
const getPlatform = () => {
  return Platform.OS === 'android' ? 2 : 1;
};

const performRequest = async (url, params, headers = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'operationID': '123',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { ...defaultHeaders, ...headers },
    body: JSON.stringify({ ...params, platform: getPlatform(), areaCode: "+86" }),
  });

  if (!response.ok) throw new Error("Request failed");

  const data = await response.json();
  if (data.errCode !== 0) throw new Error(data.errDlt);

  return data;
};


export const LoginClient = async (params: { password: string; phoneNumber: any; verifyCode: string; areaCode: string; }) => {
  const url = USER_URL + "/account/login";
  const data = await performRequest(url, params);
  
  // Set key-value pairs
  const { chatToken, imToken, userID } = data.data;
  await AsyncStorage.setItem('chatToken', chatToken);
  await AsyncStorage.setItem('imToken', imToken);
  await AsyncStorage.setItem('userID', userID);
};


export const SignUpClient = async (params: { nickname?: string; phoneNumber: any; password: any; verifyCode?: any; autoLogin?: boolean; areaCode:string}) => {
  const url = USER_URL + "/account/register";
  const data = await performRequest(url, {
    ...params,
    user: {
      "nickname": params.nickname,
      "faceURL": "",
      "birth": 0,
      "gender": 1,
      "email": "",
      "account": "",
      "phoneNumber": params.phoneNumber,
      "password": params.password,
      "areaCode":params.areaCode,
    },
    platform:getPlatform(),
    areaCode:params.areaCode,
  });

  // Set key-value pairs
  const { chatToken, imToken, userID } = data.data;
  await AsyncStorage.setItem('chatToken', chatToken);
  await AsyncStorage.setItem('imToken', imToken);
  await AsyncStorage.setItem('userID', userID);
}
export const SendVerifyClient = async (params: { usedFor: number; phoneNumber: any; }) => {
  const url = USER_URL + "/account/code/send";
  await performRequest(url, params);
}
export const CheckVerifyClient = async (params: { phoneNumber: any; verifyCode: string; }) => {
  const url = USER_URL + "/account/code/verify";
  await performRequest(url, params);
}
export const ResetPasswordClient = async (params: { phoneNumber: any; password: string; verifyCode: any; }) => {
  const url = USER_URL + "/account/password/reset";
  await performRequest(url, params);
}

export const getBusinessUserInfo = async (userIDs: string[], isSelfInfo = false) => {
  try {
    const token = await AsyncStorage.getItem('chatToken');

    return await axios.post<{ users: BusinessUserInfo[] }>(
      `${USER_URL}/user/find/full`,
      { userIDs },
      { headers: { operationID: '923821', token } }
    );
  } catch (error) {
    console.error('Error in getBusinessUserInfo:', error);
  }
};

export const searchBusinessUserInfo = async (keyword: string) => {
  try {
    const token = await AsyncStorage.getItem('chatToken');

    return await axios.post<{ total: number; users: BusinessUserInfo[] }>(
      `${USER_URL}/user/search/full`,
      {
        keyword,
        pagination: { pageNumber: 1, showNumber: 10 },
      },
      { headers: { operationID: '9347234', token } }
    );
  } catch (error) {
    console.error('Error in searchBusinessUserInfo:', error);
  }
};