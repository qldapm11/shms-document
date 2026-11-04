import { List, Typography, Spin, Alert, Card } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export function DecisionsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hub-decisions'],
    queryFn: async () => (await api.get('/hub/decisions')).data,
  });
  if (isLoading) return <Spin />;
  if (error) return <Alert type="error" message="Không tải được quyết định" />;
  const decisions = data?.decisions || [];

  return (
    <div>
      <Typography.Title level={4}>Quyết định dự án</Typography.Title>
      {decisions.length === 0 && <Alert type="info" style={{ marginBottom: 16 }} message="Chưa có quyết định trong DB Hub. Nhật ký quyết định hiện ở document/state/decisions.json (D001–D008), sẽ đồng bộ khi migration." />}
      <List
        dataSource={decisions}
        renderItem={(d: any) => (
          <Card size="small" style={{ marginBottom: 12 }}>
            <Typography.Text strong>{d.title}</Typography.Text>
            <Typography.Paragraph style={{ marginBottom: 4 }}>{d.decision}</Typography.Paragraph>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Thẩm quyền: {d.authority || '—'} · {d.reason || ''}
            </Typography.Text>
          </Card>
        )}
      />
    </div>
  );
}
