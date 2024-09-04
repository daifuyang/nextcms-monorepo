import { addRole } from '@/services/ant-design-pro/roles';
import { ModalForm, ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { Form, message } from 'antd';

declare interface Props {
  title: string;
  children: any;
}

const SaveForm = (props: Props) => {
  const { title, children } = props;

  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      description?: string;
      sort?: number;
      status?: 0 | 1; // 0:禁用 1:启用
    }>
      title={title}
      trigger={children}
      form={form}
      autoFocusFirstInput
      width={520}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
      onFinish={async (values) => {
        const res = await addRole(values);
        if (res.code === 1) {
            message.success(res.msg);
            return true;
        }
        message.error(res.msg);
        return false;
      }}
    >
      <ProFormText name="name" label="角色名称" placeholder="请输入角色名称" />
      <ProFormText name="description" label="角色描述" placeholder="请输入角色描述" />
      <ProFormDigit
        name="sort"
        label="排序"
        fieldProps={{ precision: 0 }}
        placeholder="请输入排序"
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        initialValue={1}
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ]}
      />
    </ModalForm>
  );
};

export default SaveForm;
