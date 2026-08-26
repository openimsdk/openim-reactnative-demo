export const BASE_DOMAIN = process.env.EXPO_PUBLIC_BASE_DOMAIN ?? '127.0.0.1'
export const CHAT_URL = process.env.EXPO_PUBLIC_CHAT_URL ?? `http://${BASE_DOMAIN}:10008`
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? `http://${BASE_DOMAIN}:10002`
export const WS_URL = process.env.EXPO_PUBLIC_WS_URL ?? `ws://${BASE_DOMAIN}:10001`

export const LOG_LEVEL = 5
export const VERSION = 'OpenIM-RN-Demo'
