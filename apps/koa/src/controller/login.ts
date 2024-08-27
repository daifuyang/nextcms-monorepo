import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import response from "@/lib/response";
import { LoginReq } from "@/typings/login";
import { cmsUser } from "@prisma/client";
import { Context } from "koa";
import { getUser } from "@/models/user";
import { parseJson } from "@/lib/request";
import { createUserToken } from "@/models/userToken";
import { calculateExpiresAt } from "@/lib/date";
import {
  jwtRefreshSecret,
  jwtRefreshSecretExpire,
  jwtSecret,
  jwtSecretExpire
} from "@/constants/jwt";

/**
 * 处理用户登录请求，根据提供的登录类型进行身份验证。
 *
 * @param {Context} ctx - Koa 的上下文对象，包含请求和响应对象。
 * @returns {Promise<void>} - 当登录处理完成时返回一个 Promise。
 *
 * @typedef {Object} LoginReq
 * @property {string} account - 用户账号，可以是用户名、邮箱或手机号。
 * @property {string} password - 用户的密码。
 * @property {string} loginType - 登录类型，例如 "email"、"phone" 或 "username"。
 * @property {string} phoneType - 如果 `loginType` 是 "phone"，则为手机号类型，例如 "mobile" 或 "landline"。
 *
 * @author daifuyang
 * @date 2024-08-14
 */

const accountEnum = {
  email: "邮箱",
  phone: "手机号",
  account: "账号"
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 用户登录
 *     description: 用户可以通过邮箱、手机号或账号进行登录，支持密码登录和短信验证码登录。
 *     operationId: login
 *     tags:
 *       - user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: string
 *                 description: 用户的账号，可以是邮箱、手机号或用户名
 *                 example: "admin"
 *                 required: true
 *               password:
 *                 type: string
 *                 description: 用户的登录密码，使用密码登录时必须提供
 *                 example: "123456"
 *                 required: true
 *               loginType:
 *                 type: string
 *                 description: 登录类型，可以是 'email'、'phone' 或 'account'
 *                 enum: [email, phone, account]
 *                 default: account
 *               phoneType:
 *                 type: string
 *                 description: 手机登录类型，当使用手机号登录时可以选择 'sms' 短信验证码登录
 *                 enum: [sms, password]
 *     responses:
 *       200:
 *         description: 登录成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "登录成功！"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: JWT 访问令牌
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     expiresAt:
 *                       type: integer
 *                       description: 访问令牌过期时间
 *                       example: 1725354191
 *                     refreshToken:
 *                       type: string
 *                       description: 刷新令牌
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     reExpiresAt:
 *                       type: integer
 *                       description: 刷新令牌过期时间
 *                       example: 1724835791
 */
export const Login = async (ctx: Context) => {
  const { account, password, loginType = "account", phoneType } = parseJson(ctx) as LoginReq;

  if (!account) {
    ctx.body = response.error(`${accountEnum[loginType]}不能为空`);
    return;
  }

  // 根据登录类型进行身份验证
  let user: cmsUser | null = null;
  switch (loginType) {
    case "email":
      // 邮箱登录逻辑
      user = await getUser({ email: account });
      break;
    case "phone":
      // 手机号登录逻辑
      user = await getUser({ phone: account });
      break;
    case "account":
      // 用户名登录逻辑
      user = await getUser({ loginName: account });
      break;
  }
  // 检查用户是否存在
  if (!user) {
    ctx.body = response.error("用户不存在");
    return;
  }

  // 验证码登录
  if (loginType === "phone" && phoneType === "sms") {
    return;
  }

  if (!password) {
    ctx.body = response.error("密码不能为空");
    return;
  }

  if (user?.password) {
    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      ctx.body = response.error("密码错误");
      return;
    }
  } else {
    ctx.body = response.error("密码错误");
    return;
  }

  // 生成JWT token
  const expiresIn = jwtSecretExpire;
  const accessToken = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn });

  // 生成refresh token
  const reExpiresIn = jwtRefreshSecretExpire;
  const refreshToken = jwt.sign({ userId: user.id }, jwtRefreshSecret, {
    expiresIn: reExpiresIn
  });

  const expiresAt = calculateExpiresAt(expiresIn);
  const reExpiresAt = calculateExpiresAt(reExpiresIn);

  const userToken = await createUserToken({
    userId: user.id,
    accessToken,
    refreshToken,
    expiresAt,
    reExpiresAt
  });

  if (!userToken) {
    ctx.body = response.error("登录失败");
    return;
  }

  ctx.body = response.success("登录成功！", { accessToken, expiresAt, refreshToken, reExpiresAt });
};
