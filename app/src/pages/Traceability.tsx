import { Table, Typography, Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export function TraceabilityPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hub-trace'],
    queryFn: async () => (await api.get('/hub/traceability')).data,
  });
  if (isLoading) return <Spin />;
  if (error) return <Alert type="error" message="Không tải được ma trận truy vết" />;
  const rows = data?.traceability || [];

  return (
    <div>
      <Typography.Title level={4}>Ma trận truy vết</Typography.Title>
      <Typography.Paragraph type="secondary">Liên kết công việc → tính năng → màn hình. Ma trận đầy đủ yêu cầu–màn hình–FE/BE–test nằm ở document/content/07-truy-vet.</Typography.Paragraph>
      {rows.length === 0 && <Alert type="info" style={{ marginBottom: 16 }} message="Chưa có dữ liệu truy vết trong DB Hub (đồng bộ khi migration)." />}
      <Table
        rowKey={(r: any) => r.id || r.code}
        dataSource={rows}
        pagination={{ pageSize: 15 }}
        columns={[
          { title: 'Mã công việc', dataIndex: 'code', width: 120 },
          { title: 'Tiêu đề', dataIndex: 'title' },
          { title: 'Tính năng', dataIndex: 'featureIds', render: (v: string[]) => (Array.isArray(v) ? v.join(', ') : '—') },
          { title: 'Màn hình', dataIndex: 'screenIds', render: (v: string[]) => (Array.isArray(v) ? v.join(', ') : '—') },
        ]}
      />
    </div>
  );
}
