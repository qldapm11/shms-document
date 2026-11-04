import { Table, Typography, Input, Spin, Alert, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '../api/client';

export function DocumentsPage() {
  const [q, setQ] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['hub-documents', q],
    queryFn: async () => (await api.get('/hub/documents', { params: q ? { q } : {} })).data,
  });
  if (isLoading) return <Spin />;
  if (error) return <Alert type="error" message="Không tải được tài liệu" />;
  const docs = data?.documents || [];

  return (
    <div>
      <Typography.Title level={4}>Tài liệu dự án</Typography.Title>
      <Input.Search placeholder="Tìm theo tiêu đề / đường dẫn" allowClear onSearch={setQ} style={{ maxWidth: 360, marginBottom: 16 }} />
      {docs.length === 0 && <Alert type="info" style={{ marginBottom: 16 }} message="Chưa có tài liệu trong DB Hub. Toàn bộ tài liệu nguồn hiện nằm ở document/content (kho bootstrap), sẽ đồng bộ khi migration." />}
      <Table
        rowKey="id"
        dataSource={docs}
        pagination={{ pageSize: 10 }}
        columns={[
          { title: 'Tiêu đề', dataIndex: 'title' },
          { title: 'Đường dẫn', dataIndex: 'path' },
          { title: 'Phân loại', dataIndex: 'category', render: (c: string) => c ? <Tag>{c}</Tag> : '—' },
          { title: 'Phiên bản', dataIndex: 'currentVersion' },
        ]}
      />
    </div>
  );
}
