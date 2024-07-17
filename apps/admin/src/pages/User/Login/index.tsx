import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }: any) => {
  return {
    root: {
      display: 'flex',
      backgroundImage: "url('/assets/images/login-bg.png')",
      backgroundSize: 'cover',
      width: '100%',
      height: '100vh',
    },
    brand: {
      backgroundImage: "url('/assets/images/login-brand.png')",
      backgroundSize: '100% 100%',
      width: '56.67%',
      height: '100%',
    },
    loginWrap: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginCard: {
      width: '481px',
      backgroundColor: '#fff',
      padding: '56px 48px 88px 48px',
      borderRadius: '20px',
      boxShadow: ' 0px 0px 0px  rgba(0, 0, 0, 0.1), 0px 17px 36px  rgba(23, 57, 222, 0.25)',
    },
    loginTitle: {
      fontFamily: 'Noto Sans SC',
      textAlign: 'center',
      fontSize: '36px',
      fontWeight: 700,
      color: '#000',
    },
    loginSubTitle: {
      fontFamily: 'Noto Sans SC',
      textAlign: 'center',
      marginTop: '12px',
      fontSize: '14px',
      fontWeight: 400,
      color: '#000',
      margin: 0,
    },
    loginForm: {
      marginTop: '40px',
    },
    loginFormItem: css`
    background-color: rgba(231, 241, 253, 0.4);
    &.ant-input-affix-wrapper > input.ant-input {
      &::placeholder {
        font-size: 20px;
        color: rgba(4, 19, 74, 0.4);
        font-family: 'Noto Sans SC';
        font-weight: 400;
      }
      padding: 6px 8px;
      font-size: 20px;
      color: rgba(4, 19, 74, 0.4);
      font-family: 'Noto Sans SC';
      font-weight: 400;
    }
  `,
    loginItemIcon: {
      fontSize: '24px',
      color: 'rgba(28, 53, 145, 0.6)',
    },
    loginFormChexkBox: css`
      & .ant-checkbox+span {
        color: rgba(4, 19, 74, 0.4);
        font-size: 20px;
        font-weight: 400;
      }
      margin-bottom: 86px;
    `,
    loginFormBtn: css`
      &.ant-btn {
        padding: 24px 15px;
        font-size: 20px;
      }
    `
  };
});

export default function Login() {
  const { styles } = useStyle();

  return (
    <div className={styles.root}>
      <div className={styles.brand}></div>
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>欢迎登录系统</h1>
          <p className={styles.loginSubTitle}> WELCOME!</p>

          <Form className={styles.loginForm} name="basic">
            <Form.Item name={'account'}>
              <Input
                className={styles.loginFormItem}
                variant="filled"
                placeholder="请输入账号"
                prefix={<UserOutlined className={styles.loginItemIcon} />}
              />
            </Form.Item>
            <Form.Item name={'password'}>
              <Input.Password
                className={styles.loginFormItem}
                variant="filled"
                placeholder="请输入密码"
                prefix={<LockOutlined className={styles.loginItemIcon} />}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className={styles.loginFormChexkBox}>记住密码</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button className={styles.loginFormBtn} type="primary" block>立即登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
