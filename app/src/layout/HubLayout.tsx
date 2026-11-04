import { Layout, Menu, Dropdown, Avatar, Typography } from 'antd';
import {
  DashboardOutlined, FileTextOutlined, ProfileOutlined, NodeIndexOutlined,
  BulbOutlined, AppstoreOutlined, UserOutlined, LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/auth';

const { Header, Sider, Content } = Layout;

const NAV = [
  { key: '/', icon: <DashboardOutlined />, label: 'Tổng quan' },
  { key: '/features', icon: <AppstoreOutlined />, label: 'Tính năng (67 + HUB)' },
  { key: '/documents', icon: <FileTextOutlined />, label: 'Tài liệu' },
  { key: '/tasks', icon: <ProfileOutlined />, label: 'Công việc' },
  { key: '/traceability', icon: <NodeIndexOutlined />, label: 'Truy vết' },
  { key: '/decisions', icon: <BulbOutlined />, label: 'Quyết định' },
];

export function HubLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const selected = NAV.map((n) => n.key)
    .filter((k) => (k === '/' ? loc.pathname === '/' : loc.pathname.startsWith(k)))
    .sort((a, b) => b.length - a.length)[0] || '/';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1565c0', fontSize: 16 }}>
          SHMS Hub
        </div>
        <Menu mode="inline" selectedKeys={[selected]} items={NAV.map((n) => ({ key: n.key, icon: n.icon, label: n.label }))} onClick={(e) => nav(e.key)} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
          <Typography.Text strong style={{ fontSize: 16 }}>SHMS Project Hub — Cổng quản lý dự án</Typography.Text>
          <Dropdown menu={{ items: [{ key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', onClick: () => { logout(); nav('/login'); } }] }}>
            <span style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} style={{ background: '#1565c0' }} /> <span style={{ marginLeft: 8 }}>{user?.fullName}</span>
            </span>
          </Dropdown>
        </Header>
        <Content style={{ margin: 16, padding: 20, background: '#fff', borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
