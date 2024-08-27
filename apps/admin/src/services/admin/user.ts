// 用户相关接口
import { request } from '@umijs/max';

// 用户登录
export const login = (data: API.LoginParams) => {
  return request<{
    data: API.Response<any>;
  }>('/api/v1/login', {
    method: 'POST',
    data,
  });
};
