import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { useRef } from 'react';
import SaveForm from './saveForm';

type MenuItem = {
  id: number;
  name: string;
  icon: string;
  order: number;
  permission: string;
  component: string;
  status: string;
  created_at: string;
};

const columns: ProColumns<MenuItem>[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '菜单名称为必填项',
        },
      ],
    },
  },
  {
    title: '图标',
    dataIndex: 'icon',
    hideInSearch: true,
    render: (_, record) => <Tag color="blue">{record.icon}</Tag>,
  },
  {
    title: '排序',
    dataIndex: 'order',
    valueType: 'digit',
    hideInSearch: true,
    sorter: true,
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    hideInSearch: true,
    copyable: true,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    hideInSearch: true,
    copyable: true,
    ellipsis: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      active: { text: '启用', status: 'Success' },
      inactive: { text: '禁用', status: 'Error' },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    hideInSearch: true,
    sorter: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={`/menu/${record.id}`} key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<MenuItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        // 替换成你自己的API请求
        return [];
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="菜单管理"
      toolBarRender={() => [
        <SaveForm title="新建菜单" key="button">
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            新建
          </Button>
        </SaveForm>,
      ]}
    />
  );
};
