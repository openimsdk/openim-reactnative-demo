import request from '@/utils/request'

export const getRtcConnectData = (room: string, identity: string) =>
  request.post<{ serverUrl: string; token: string }>(
    '/user/rtc/get_token', 
    { room, identity },
  )
