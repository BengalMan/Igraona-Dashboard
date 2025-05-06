import React, {PropsWithChildren} from 'react';
import {Layout, theme, Table, Space} from 'antd';

const {Content} = Layout;

import {useOne} from "@refinedev/core"
import {useParams} from 'react-router';

import BanPlayer from './BanPlayer';

const ShowPlayers: React.FC<PropsWithChildren<{}>> = ({children, teamId}) => {
    const {id} = useParams();

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const {data, isLoading} = useOne({
        resource: "participants",
        id: id,
        meta: {
            teamId: teamId,
        },
    })

    const columns = [
        {
            title: 'Ime igrača',
            dataIndex: 'player1',
            key: 'player1',
            render: (_: any, record: any) => (
                <Space>
                    {record.url}
                </Space>
            ),
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

    console.log(data?.data.players)

    return (
        <Layout className="h-screen" style={{display: 'flex', flexDirection: 'row'}}>

            <Layout style={{flex: 1, backgroundColor: '#f0f2f5'}}>
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
                        dataSource={data?.data.players}
                        columns={columns}
                        rowKey="id"
                        pagination={{
                            pageSize: 6,
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