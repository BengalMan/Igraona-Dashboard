import React, { PropsWithChildren } from 'react';
import { Layout, theme, Table, Avatar, Space } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

const { Content } = Layout;

import { useGo, useOne } from "@refinedev/core"
import { CreateButton, DeleteButton, EditButton } from '@refinedev/antd';
import { useNavigate, useParams } from 'react-router';
import dataProvider from '../../providers/data-provider';

const ShowTeams: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const { id } = useParams();

    const navigate = useNavigate()


    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { data, isLoading } = useOne({
        resource: "tournaments",
        id: id
    })

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: () => <Avatar icon={<AntDesignOutlined />} />,
        },
        {
            title: 'Naziv tima',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Akcije',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space>
                    <EditButton hideText size="small" resource="participants" recordItemId={id} onClick={() => {
                        navigate(`/tournaments/${id}/${record.id}/edit`)
                    }} />
                    <DeleteButton hideText size="small" resource="participants" recordItemId={id} meta={{ tName: `${record.name}` }} />
                </Space>
            ),
        },
    ];

    console.log(data?.data.teams);

    return (
        <Layout className="h-screen" style={{ display: 'flex', flexDirection: 'row' }}>
            <Layout style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >

                    <div style={{ marginBottom: 16 }}>
                        <CreateButton
                            resource="tournaments"
                            onClick={() => navigate(`/tournaments/${id}/new`)}
                        />
                    </div>

                    <Table
                        loading={isLoading}
                        dataSource={data?.data.teams}
                        columns={columns}
                        rowKey="id"
                        pagination={{
                            pageSize: 5,
                            position: ['bottomCenter'],
                        }}
                        onRow={(record) => ({
                            onClick: (event) => {
                                const target = event.target as HTMLElement;
                                if (target.closest('button')) return;
                                navigate(`/tournaments/${id}/${record.name}`);
                            },
                        })}
                    />

                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ShowTeams;
