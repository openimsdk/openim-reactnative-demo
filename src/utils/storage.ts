import AsyncStorage from "@react-native-async-storage/async-storage";

const IM_TOKEN = "IM_TOKEN";
const CHAT_TOKEN = "CHAT_TOKEN";
const USER_ID = "USER_ID";

export const getIMToken = async () => AsyncStorage.getItem(IM_TOKEN);
export const getChatToken = async () => AsyncStorage.getItem(CHAT_TOKEN);
export const getIMUserID = async () => AsyncStorage.getItem(USER_ID);

export const setIMToken = async (token: string) => AsyncStorage.setItem(IM_TOKEN, token);
export const setChatToken = async (token: string) => AsyncStorage.setItem(CHAT_TOKEN, token);
export const setIMUserID = async (userID: string) => AsyncStorage.setItem(USER_ID, userID);

export const setIMProfile = async ({ chatToken, imToken, userID }: { chatToken: string; imToken: string; userID: string }) => {
  await setIMToken(imToken);
  await setIMUserID(userID);
  await setChatToken(chatToken);
};

export const clearIMProfile = () => {
  AsyncStorage.removeItem(IM_TOKEN);
  AsyncStorage.removeItem(CHAT_TOKEN);
  AsyncStorage.removeItem(USER_ID);
};
