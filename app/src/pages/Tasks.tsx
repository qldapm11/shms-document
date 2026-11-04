import { Table, Typography, Spin, Alert, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

const STATUS_COLOR: Record<string, string> = {
  DRAFT: 'default', READY: 'cyan', IN_PROGRESS: 'blue', BLOCKED: 'red',
  IN_REVIEW: 'orange', CHANGES_REQUESTED: 'volcano', DONE: 'green', CANCELLED: 'default',
};

export function TasksPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hub-tasks'],
    queryFn: async () => (await api.get('/hub/tasks')).data,
  });
  if (isLoading) return <Spin />;
  if (error) return <Alert type="error" message="Không tải được công việc" />;
  const tasks = data?.tasks || [];

  return (
    <div>
      <Typography.Title level={4}>Công việc dự án</Typography.Title>
      {tasks.length === 0 && <Alert type="info" style={{ marginBottom: 16 }} message="Chưa có công việc trong DB Hub. Backlog hiện ở document/state/tasks.json (G01–G40 + T-*), sẽ đồng bộ khi migration." />}
      <Table
        rowKey="id"
        dataSource={tasks}
        pagination={{ pageSize: 15 }}
        columns={[
          { title: 'Mã', dataIndex: 'code', width: 110 },
          { title: 'Tiêu đề', dataIndex: 'title' },
          { title: 'Loại', dataIndex: 'type', width: 90 },
          { title: 'Phụ trách', dataIndex: 'ownerId', width: 120, render: (v: string) => v || '—' },
          { title: 'Trạng thái', dataIndex: 'status', width: 150, render: (s: string) => <Tag color={STATUS_COLOR[s] || 'default'}>{s}</Tag> },
        ]}
      />
    </div>
  );
}
