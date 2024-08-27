// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户登录 用户可以通过邮箱、手机号或账号进行登录，支持密码登录和短信验证码登录。 POST /login */
export async function login(
  body: {
    /** 用户的账号，可以是邮箱、手机号或用户名 */
    account?: string;
    /** 用户的登录密码，使用密码登录时必须提供 */
    password?: string;
    /** 登录类型，可以是 'email'、'phone' 或 'account' */
    loginType?: 'email' | 'phone' | 'account';
    /** 手机登录类型，当使用手机号登录时可以选择 'sms' 短信验证码登录 */
    phoneType?: 'sms' | 'password';
  },
  options?: { [key: string]: any },
) {
  return request<{
    code?: number;
    message?: string;
    data?: {
      accessToken?: string;
      expiresAt?: number;
      refreshToken?: string;
      reExpiresAt?: number;
    };
  }>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
