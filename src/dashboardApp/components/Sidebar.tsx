import React, {useState} from 'react';
import {
    TrophyOutlined,
    HomeOutlined,
    AimOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button} from 'antd';
import {useLocation, useNavigate} from 'react-router';

import logo from '../items/logo.png'

import LogOut from './LogOut';

const {Sider} = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = ({key}: { key: string }) => {
        const routes: { [key: string]: string } = {
            '1': '/dashboard',
            '2': '/tournaments',
            '3': '/games',
            '4': '/banned',
        };

        const targetRoute = routes[key];
        const currentPath = location.pathname;

        if (!currentPath.startsWith(targetRoute) || currentPath !== targetRoute) {
            navigate(targetRoute);
        }
    };

    const getSelectedKey = () => {
        const currentPath = location.pathname;
        if (currentPath.includes('/dashboard')) return '1';
        if (currentPath.includes('/tournaments')) return '2';
        if (currentPath.includes('/games')) return '3';
        if (currentPath.includes('/banned')) return '4';
        return '1';
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} width={240} collapsedWidth={90}
               className="bg-[#161616]">
            <div
                style={{
                    padding: '0 16px',
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#161616',
                    borderBottom: '1px solid #333',
                }}
            >
                <Button
                    type="text"
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center bg-transparent w-full h-full border-none hover:scale-105 hover:brightness-90 transition-all duration-300"
                >
                    <img
                        src={logo}
                        alt="Loading..."
                        className={`${collapsed ? "w-10 h-10" : "w-10 h-10"} object-contain transition-all duration-300`}
                    />
                    {!collapsed && (
                        <h1 className="text-[#8D151F] font-bold text-md ml-3 transition-all duration-300">
                            Igraona Igraona
                        </h1>
                    )}
                </Button>


            </div>

            <Menu
                theme="dark"
                mode="inline"
                className="pt-4 p-1 bg-[#161616] h-[80%]"
                selectedKeys={[getSelectedKey()]}
                items={[
                    {
                        key: '1',
                        icon: <HomeOutlined/>,
                        label: 'Početna',
                    },
                    {
                        key: '2',
                        icon: <TrophyOutlined/>,
                        label: 'Turniri',
                    },
                    {
                        key: '3',
                        icon: <AimOutlined/>,
                        label: 'Games',
                    },
                    {
                        key: '4',
                        icon: <DeleteOutlined/>,
                        label: 'Banned',
                    },
                ]}
                onSelect={handleNavigation}
            />

            <div style={{paddingTop: '20px', textAlign: 'center', borderTop: '1px solid #333'}}>
                <LogOut collapsed={collapsed}/>
            </div>

        </Sider>
    );
};

export default Sidebar;