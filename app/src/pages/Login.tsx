import { Button, Card, Form, Input, Typography, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../store/auth';
import { apiError } from '../api/client';

export function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  async function onFinish(v: { username: string; password: string }) {
    setLoading(true);
    try {
      await login(v.username, v.password);
      message.success('Đăng nhập thành công');
      nav('/');
    } catch (e) {
      message.error(apiError(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0d47a1,#1976d2)' }}>
      <Card style={{ width: 400, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Typography.Title level={3} style={{ color: '#1565c0', marginBottom: 0 }}>SHMS Project Hub</Typography.Title>
          <Typography.Text type="secondary">Cổng quản lý dự án SHMS</Typography.Text>
        </div>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="username" rules={[{ required: true, message: 'Nhập tài khoản' }]}>
            <Input prefix={<UserOutlined />} placeholder="Tài khoản" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Nhập mật khẩu' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading}>Đăng nhập</Button>
        </Form>
        <Typography.Paragraph type="secondary" style={{ fontSize: 12, marginTop: 16, marginBottom: 0 }}>
          Demo: pm/pm123 (quản lý dự án) · admin/admin123. Mọi thành viên xem được; sửa/review theo quyền.
        </Typography.Paragraph>
      </Card>
    </div>
  );
}
