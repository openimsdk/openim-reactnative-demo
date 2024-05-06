// WS 10001 API 10002 CHAT 10008 CONFIG 10009

// export const WS_URL = 'wss://web.rentsoft.cn/msg_gateway_enterprise';
// export const API_URL = 'https://web.rentsoft.cn/api_enterprise';
// export const CHAT_URL = 'https://web.rentsoft.cn/chat_enterprise';

export const WS_URL = "ws://192.168.2.11:10001";
export const API_URL = "http://192.168.2.11:10002";
export const CHAT_URL = "http://192.168.2.11:10008";

export const getWsUrl = () => WS_URL;
export const getApiUrl = () => API_URL;
export const getChatUrl = () => CHAT_URL;
