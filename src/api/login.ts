import request from '@/utils/request'
import {
  ChangPasswordParams,
  DemoLoginParams,
  DemoLoginResponse,
  DemoRegisterParams,
  ModifyPasswordParams,
  SendSmsParams,
  VerifyCodeParams,
} from './data'
import { Platform } from 'react-native'

let platform = Platform.OS === 'ios' ? 1 : 2;

export const sendSms = (params: SendSmsParams) =>
  request.post<undefined>('/account/code/send', { ...params })

export const verifyCode = (params: VerifyCodeParams) =>
  request.post('/account/code/verify', { ...params })

export const register = (params: DemoRegisterParams) =>
  request.post('/account/register', { ...params, platform })

export const modify = (params: ModifyPasswordParams) =>
  request.post('/account/password/reset', { ...params, platform })

export const login = (params: DemoLoginParams) =>
  request.post<DemoLoginResponse>('/account/login', { ...params, deviceID: '', platform, account: '' })

export const businessModify = (params: ChangPasswordParams) =>
  request.post('/account/password/change', { ...params, platform })
