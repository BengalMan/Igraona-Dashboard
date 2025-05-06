import React, {PropsWithChildren} from 'react';
import {Layout, theme, Table, Avatar, Space} from 'antd';
import {EyeOutlined, ArrowLeftOutlined} from '@ant-design/icons';

const {Content} = Layout;

import {useList} from "@refinedev/core"
import {CreateButton, DeleteButton, EditButton} from '@refinedev/antd';
import {useNavigate, useParams} from 'react-router';
import ShowPlayers from "../players/ShowPlayers";

interface ShowPlayersProps {
    teamId: any;
}

const ShowTeams: React.FC<ShowPlayersProps> = ({children}) => {
    const {id} = useParams();

    const [teamId, setTeamId] = React.useState<any | undefined>(undefined);

    const navigate = useNavigate()

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const {data, isLoading} = useList({
        resource: "participants",
        meta: {
            tournamentId: id,
        },
    })

    const handleEdit = (record: any) => {
        setTeamId(record.id)
    };

    const columns = [
        {
            title: 'Naziv tima',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Kontakt',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Akcije',
            key: 'actions',
            render: (_: any, record: any) => (
                <Space>
                    <EditButton hideText size="small" resource="tournaments" icon={<EyeOutlined/>}
                                recordItemId={record.id} onClick={() => handleEdit(record)}></EditButton>
                    {/*<EditButton hideText size='small' resource="participants" recordItemId={record.id}/>*/}
                    <DeleteButton hideText size="small" resource="participants" recordItemId={record.id} meta={{
                        id: id
                    }}/>
                </Space>
            ),
        },
    ];

    return (
        <Layout className="h-screen" style={{display: 'flex', flexDirection: 'row'}}>
            <Layout style={{flex: 0.5, backgroundColor: '#f0f2f5'}}>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >

                    <div style={{marginBottom: 16}} className='flex justify-between w-full text-right '>
                        <CreateButton
                            type="primary"
                            className="antbutton"
                            onClick={() => navigate('/tournaments')}
                            icon={<ArrowLeftOutlined/>}
                        >
                            Back
                        </CreateButton>
                        <CreateButton
                            resource="tournaments"
                            className='antbutton'
                            onClick={() => navigate(`/tournaments/${id}/new`)}
                        />
                    </div>

                    <Table
                        loading={isLoading}
                        dataSource={data?.data}
                        columns={columns}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            position: ['bottomCenter'],
                        }}
                    />

                    {children}
                </Content>
            </Layout>

            <Layout style={{flex: 0.5}}>
                <ShowPlayers teamId={teamId}/>
            </Layout>
        </Layout>
    );
};

export default ShowTeams;