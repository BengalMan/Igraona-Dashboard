import React, {PropsWithChildren} from 'react';
import {Layout, theme, List, Avatar} from 'antd';
import {AntDesignOutlined} from '@ant-design/icons';

const {Content} = Layout;

import {useList} from "@refinedev/core"
import {CreateButton, DeleteButton, EditButton} from '@refinedev/antd';
import {useNavigate} from 'react-router';


const ShowTLanding: React.FC<PropsWithChildren<{}>> = ({children}) => {
    const navigate = useNavigate()

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const {data, isLoading} = useList({
        resource: "tournaments",
    })

    if (isLoading) {
        return <div>...Loading</div>
    }


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
                    <List
                        loading={isLoading}
                        itemLayout="horizontal"
                        dataSource={data?.data}
                        renderItem={(turnir, index) => (
                            <List.Item onClick={() => navigate(`/t/${turnir.id}`)} style={{cursor: "pointer"}}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar icon={<AntDesignOutlined/>}/>
                                    }
                                    title={turnir.name}
                                    description={`ID turnira: ${turnir.id}`}
                                />
                            </List.Item>

                        )}
                    />
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default ShowTLanding