import React, { PropsWithChildren } from 'react';
import { Layout, theme, Table, Avatar, Space, Button } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

const { Content } = Layout;

import { useOne } from "@refinedev/core"
import { DeleteButton } from '@refinedev/antd';
import { useParams } from 'react-router';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../providers/firebase';

import BanPlayer from './BanPlayer';

const ShowPlayers: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const { id } = useParams();
    const { name } = useParams()

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { data, isLoading } = useOne({
        resource: "tournaments",
        id: id
    })

    console.log('evo', data?.data.teams)

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: () => <Avatar icon={<AntDesignOutlined />} />,
        },
        {
            title: 'Ime igrača',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => <span>{name}</span>,
        },
        {
            title: 'Akcije',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space>
                    {/* <DeleteButton hideText size="small" resource="tournaments" recordItemId={record.id} /> */}
                    <BanPlayer player={record}></BanPlayer>
                </Space>
            ),
        },
    ];

    const players = data?.data?.teams
        ?.find((team: any) => team.name === name)
        ?.players?.map((player: any) => ({
            key: `${name}-${player}`,
            name: player,
            teamName: name,
        })) || [];

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

                    <Table
                        loading={isLoading}
                        dataSource={players}
                        columns={columns}
                        rowKey="id"
                        pagination={{
                            pageSize: 5,
                            position: ['bottomCenter'],
                        }}
                        onRow={(record) => ({
                            onClick: (event) => {
                                const target = event.target as HTMLElement;
                                if (
                                    target.closest('button') ||
                                    target.closest('input') ||
                                    target.closest('.ant-modal')
                                ) {
                                    return;
                                }
                                window.location.replace(`${record.name}`)
                            },
                        })}
                    />
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ShowPlayers;
