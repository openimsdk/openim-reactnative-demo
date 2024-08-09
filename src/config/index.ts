// WS 10001 API 10002 CHAT 10008 CONFIG 10009

// export const WS_URL = 'wss://xxx.com/msg_gateway';
// export const API_URL = 'https://xxx.com/api';
// export const CHAT_URL = 'https://xxx.com/chat';

export const WS_URL = "ws://your-server-ip:10001";
export const API_URL = "http://your-server-ip:10002";
export const CHAT_URL = "http://your-server-ip:10008";

export const getWsUrl = () => WS_URL;
export const getApiUrl = () => API_URL;
export const getChatUrl = () => CHAT_URL;
