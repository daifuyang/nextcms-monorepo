declare namespace API {
  type LoginReq = {
    /** 用户的账号，可以是邮箱、手机号或用户名 */
    account: string;
    /** 用户的登录密码，使用密码登录时必须提供 */
    password: string;
    /** 登录类型，可以是 'email'、'phone' 或 'account' */
    loginType?: 'email' | 'phone' | 'account';
    /** 手机登录类型，当使用手机号登录时可以选择 'sms' 短信验证码登录 */
    phoneType?: 'sms' | 'password';
  };

  type loginResponse =
    // #/components/schemas/success
    success & {
      /** 成功信息 */
      msg: string;
      data: { accessToken: string; expiresAt: number; refreshToken: string; reExpiresAt: number };
    };

  type success = {
    /** Response code */
    code: number;
    /** Response message */
    msg: string;
    data?: Record<string, any> | Record<string, any>[] | string | number | boolean;
  };
}
