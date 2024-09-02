import React from 'react';
import { ProTable, ProColumns, PageContainer } from '@ant-design/pro-components';
import { Role } from '@/typings/role';
import { Divider, Space, Typography } from 'antd';

// 列定义
const columns: ProColumns<Role>[] = [
  {
    title: '角色编号',
    dataIndex: 'id',
    hideInSearch: true,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '权限字符',
    dataIndex: 'key',
  },
  {
    title: '角色描述',
    dataIndex: 'desc',
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
  // 模拟数据
  const data: Role[] = [
    { id: 1, name: '超级管理员', key: 'root', desc: '管理网站所有的基本功能' },
    { id: 2, name: '普通管理员', key: 'admin', desc: '普通用户，可以浏览数据，没有修改权限' },
    { id: 3, name: '收营员', key: 'cashier', desc: '只能查看，不能进行任何操作' },
  ];

  return (
    <PageContainer>
      <ProTable<Role> columns={columns} dataSource={data} rowKey="id" />
    </PageContainer>
  );
};

export default RoleList;
