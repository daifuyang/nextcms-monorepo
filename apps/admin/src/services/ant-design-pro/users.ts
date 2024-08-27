// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 用户登录 用户可以通过邮箱、手机号或账号进行登录，支持密码登录和短信验证码登录。 POST /api/v1/login */
export async function login(body: API.LoginReq, options?: { [key: string]: any }) {
  return request<API.loginResponse>('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
