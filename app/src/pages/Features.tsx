import { Table, Typography, Spin, Alert, Tag, Tabs } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

const SPEC_COLOR: Record<string, string> = { NONE: 'default', CATALOG: 'default', DRAFT: 'blue', COMPLETE: 'green', REVIEWED: 'gold' };

function FeatureTable({ rows }: { rows: any[] }) {
  return (
    <Table
      rowKey="id"
      dataSource={rows}
      pagination={{ pageSize: 20 }}
      columns={[
        { title: 'Mã', dataIndex: 'id', width: 90 },
        { title: 'Tên', dataIndex: 'name' },
        { title: 'Vai trò', dataIndex: 'roles', render: (r: string[]) => (Array.isArray(r) ? r.join(', ') : '—') },
        { title: 'Đặc tả', dataIndex: ['readiness', 'spec'], width: 110, render: (s: string) => <Tag color={SPEC_COLOR[s] || 'default'}>{s}</Tag> },
        { title: 'Triển khai', dataIndex: ['readiness', 'impl'], width: 110, render: (s: string) => <Tag>{s}</Tag> },
      ]}
    />
  );
}

export function FeaturesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hub-features'],
    queryFn: async () => (await api.get('/hub/features')).data,
  });
  if (isLoading) return <Spin />;
  if (error) return <Alert type="error" message="Không tải được danh mục tính năng" />;

  const features = data?.features || [];
  const hub = data?.hubFeatures || [];

  return (
    <div>
      <Typography.Title level={4}>Danh mục tính năng</Typography.Title>
      <Typography.Paragraph type="secondary">
        67 tính năng bệnh viện + 9 tính năng Project Hub. Mức độ đặc tả / triển khai tách riêng theo đúng nguyên tắc dự án.
      </Typography.Paragraph>
      {features.length === 0 && <Alert type="warning" style={{ marginBottom: 16 }} message="Chưa đọc được danh mục. Kiểm tra cấu hình FEATURES_FILE ở backend." />}
      <Tabs
        items={[
          { key: 'hospital', label: `Bệnh viện (${features.length})`, children: <FeatureTable rows={features} /> },
          { key: 'hub', label: `Project Hub (${hub.length})`, children: <FeatureTable rows={hub} /> },
        ]}
      />
    </div>
  );
}
