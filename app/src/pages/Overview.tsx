import { Card, Col, Row, Statistic, Typography, Spin, Alert, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export function OverviewPage() {
  const tasks = useQuery({ queryKey: ['hub-tasks'], queryFn: async () => (await api.get('/hub/tasks')).data });
  const docs = useQuery({ queryKey: ['hub-docs'], queryFn: async () => (await api.get('/hub/documents')).data });
  const decisions = useQuery({ queryKey: ['hub-decisions'], queryFn: async () => (await api.get('/hub/decisions')).data });

  if (tasks.isLoading || docs.isLoading) return <Spin />;

  const taskArr = tasks.data?.data || tasks.data?.tasks || tasks.data || [];
  const docArr = docs.data?.data || docs.data?.documents || docs.data || [];
  const decArr = decisions.data?.data || decisions.data?.decisions || decisions.data || [];
  const byStatus: Record<string, number> = {};
  for (const t of Array.isArray(taskArr) ? taskArr : []) byStatus[t.status] = (byStatus[t.status] || 0) + 1;

  return (
    <div>
      <Typography.Title level={4}>Tổng quan dự án SHMS</Typography.Title>
      <Typography.Paragraph type="secondary">
        Cổng quản lý dự án: tài liệu, công việc, truy vết yêu cầu và quyết định. Dữ liệu lấy từ API Hub của hệ thống.
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        <Col xs={12} md={6}><Card><Statistic title="Công việc" value={Array.isArray(taskArr) ? taskArr.length : 0} /></Card></Col>
        <Col xs={12} md={6}><Card><Statistic title="Tài liệu" value={Array.isArray(docArr) ? docArr.length : 0} /></Card></Col>
        <Col xs={12} md={6}><Card><Statistic title="Quyết định" value={Array.isArray(decArr) ? decArr.length : 0} /></Card></Col>
        <Col xs={12} md={6}><Card><Statistic title="Tính năng bệnh viện" value={67} suffix="+ 9 HUB" /></Card></Col>
      </Row>
      <Card title="Công việc theo trạng thái" style={{ marginTop: 16 }}>
        {Object.keys(byStatus).length === 0 ? (
          <Alert type="info" message="Chưa có công việc trong cơ sở dữ liệu Hub. Giai đoạn bootstrap dùng document/state; đồng bộ sang DB khi migration." />
        ) : (
          Object.entries(byStatus).map(([s, n]) => <Tag key={s} color="blue" style={{ marginBottom: 8 }}>{s}: {n}</Tag>)
        )}
      </Card>
    </div>
  );
}
