import React from 'react';
import { ProTable, ProColumns, PageContainer } from '@ant-design/pro-components';
import { Role } from '@/typings/role';
import { Button, Divider, Space, Typography } from 'antd';
import { getRoles } from '@/services/ant-design-pro/roles';
import { PlusOutlined } from '@ant-design/icons';
import SaveForm from './saveForm';

const statusKeyEnum: any = {
  0: 'disabled',
  1: 'enabled',
};

const statusValueEnum: any = {
  all: '',
  enabled: 1,
  disabled: 0,
};

// 列定义
const columns: ProColumns<Role>[] = [
  {
    title: '角色编号',
    dataIndex: 'id',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 260,
  },
  {
    title: '角色描述',
    dataIndex: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    valueType: 'dateTime',
    width: 240,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'dateTimeRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updatedTime',
    valueType: 'dateTime',
    width: 240,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    width: 200,
    initialValue: 'all',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      enabled: { text: '启用', status: 'Success' },
      disabled: { text: '禁用', status: 'Error' },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    width: 180,
    render: (text, record, _, action) => (
      <Space split={<Divider type="vertical" />}>
        <Typography.Link>查看</Typography.Link>
        <Typography.Link>编辑</Typography.Link>
        <Typography.Text type="danger">删除</Typography.Text>
      </Space>
    ),
  },
];

const RoleList: React.FC = () => {
  return (
    <PageContainer>
      <ProTable<Role>
        columns={columns}
        request={async (params, sort, filter) => {
          const { status = '' } = params;
          params.status = statusValueEnum[status];
          const res: any = await getRoles(params);
          const data = res.data.data.map((item: any) => {
            return {
              ...item,
              status: statusKeyEnum[item.status],
            };
          });
          if (res.code === 1) {
            return {
              data,
              page: res.data.page,
              total: res.data.total,
              success: true,
            };
          }
          return {
            success: false,
            data: [],
          };
        }}
        pagination={{
          defaultPageSize: 10,
        }}
        rowKey="id"
        toolBarRender={() => [
          <SaveForm title='新建角色' key="add">
            <Button icon={<PlusOutlined />} type="primary">
            新建
          </Button>
          </SaveForm>,
        ]}
        search={{
          labelWidth: 'auto',
        }}
      />
    </PageContainer>
  );
};

export default RoleList;
