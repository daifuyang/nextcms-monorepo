import { addUser, getUser, updateUser } from '@/services/ant-design-pro/admins';
import { Admin } from '@/typings/admin';
import { ModalForm, ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';

declare interface Props {
  title: string;
  children: any;
  initialValues?: Partial<any>;
  readOnly?: boolean;
  onOk?: () => void;
}

const SaveForm = (props: Props) => {
  const [form] = Form.useForm<Admin>();
  const { message } = App.useApp();

  const [open, setOpen] = useState(false);
  const { title, children, initialValues={ status : 1}, readOnly = false, onOk } = props;

  const fetchData = useCallback(
    async (id: number) => {
      try {
        const res = await getUser({ id });
        if (res.code === 1) {
          form.setFieldsValue(res.data as Admin);
        }
      } catch (error) {
        message.error('请求失败');
      }
    },
    [open, message, form],
  );

  useEffect(() => {
    if (open && initialValues?.id) {
      fetchData(initialValues.id);
    }
  }, [open]);

  return (
    <ModalForm<Admin>
      title={title}
      trigger={children}
      form={form}
      open={open}
      onOpenChange={(open) => setOpen(open)}
      autoFocusFirstInput
      width={520}
      initialValues={initialValues}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
      onFinish={async (values) => {
        let res: any;
        if (values?.id) {
          res = await updateUser({ id: values.id }, values);
        }else {
          res = await addUser(values);
        }
        if (res.code === 1) {
          if (onOk) {
            onOk();
          }
          message.success(res.msg);
          return true;
        }
        message.error(res.msg);
        return false;
      }}
    >
      <ProFormText name="id" label="id" hidden></ProFormText>
    </ModalForm>
  );
};

export default SaveForm;
