import request from '@/utils/request'
import { BusinessUserInfo } from './data'

export const getBusinessInfo = (userID: string) =>
  request.post<{ users: BusinessUserInfo[] }>('/user/find/full', { userIDs: [userID] })

export const searchUserInfoByBusiness = (content: string) =>
  request.post<{ users: BusinessUserInfo[]; total: number }>('/user/search/full', {
    keyword: content,
    pagination: { pageNumber: 1, showNumber: 20 },
  })
