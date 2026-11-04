import { useEffect, useMemo, useState } from 'react';
import { Layout, Menu, Typography, Spin, Alert, Input } from 'antd';
import { FileTextOutlined, BookOutlined } from '@ant-design/icons';
import { marked } from 'marked';

const { Header, Sider, Content } = Layout;

// API công khai (không login). Base lấy từ vite BASE_URL (/shms/docs/ → /shms/api/v1).
const API = import.meta.env.BASE_URL.replace(/\/docs\/?$/, '').replace(/\/$/, '') + '/api/v1';

interface Node {
  type: 'file' | 'folder';
  title: string;
  path: string;
  children?: Node[];
}

// Chuyển cây wiki thành items menu AntD; chỉ file mới chọn được.
function toMenuItems(nodes: Node[]): any[] {
  return nodes.map((n) =>
    n.type === 'folder'
      ? { key: n.path, icon: <BookOutlined />, label: n.title, children: toMenuItems(n.children || []) }
      : { key: n.path, icon: <FileTextOutlined />, label: n.title },
  );
}

// Lấy file đầu tiên trong cây để mở mặc định.
function firstFile(nodes: Node[]): string | null {
  for (const n of nodes) {
    if (n.type === 'file') return n.path;
    if (n.children) {
      const f = firstFile(n.children);
      if (f) return f;
    }
  }
  return null;
}

export function Wiki() {
  const [tree, setTree] = useState<Node[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch(`${API}/wiki/tree`)
      .then((r) => r.json())
      .then((d) => {
        setTree(d.tree || []);
        const f = firstFile(d.tree || []);
        if (f) setSelected(f);
        setLoading(false);
      })
      .catch(() => { setError('Không tải được mục lục wiki'); setLoading(false); });
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetch(`${API}/wiki/page?path=${encodeURIComponent(selected)}`)
      .then((r) => r.json())
      .then((d) => setHtml(marked.parse(d.content || '') as string))
      .catch(() => setHtml('<p>Không tải được nội dung trang.</p>'));
  }, [selected]);

  const items = useMemo(() => toMenuItems(tree), [tree]);
  const openKeys = useMemo(() => tree.filter((n) => n.type === 'folder').map((n) => n.path), [tree]);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}><Spin size="large" /></div>;
  if (error) return <Alert type="error" message={error} style={{ margin: 40 }} />;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#1565c0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <BookOutlined style={{ color: '#fff', fontSize: 22 }} />
        <Typography.Text strong style={{ color: '#fff', fontSize: 18 }}>SHMS — Tài liệu hướng dẫn</Typography.Text>
        <Typography.Text style={{ color: 'rgba(255,255,255,0.75)', marginLeft: 'auto' }}>Wiki công khai</Typography.Text>
      </Header>
      <Layout>
        <Sider width={300} theme="light" style={{ borderRight: '1px solid #f0f0f0', overflow: 'auto' }}>
          <div style={{ padding: 12 }}>
            <Input.Search placeholder="Lọc trang" allowClear onChange={(e) => setFilter(e.target.value.toLowerCase())} />
          </div>
          <Menu
            mode="inline"
            selectedKeys={selected ? [selected] : []}
            defaultOpenKeys={openKeys}
            items={filterItems(items, filter)}
            onClick={(e) => setSelected(e.key)}
            style={{ borderRight: 0 }}
          />
        </Sider>
        <Content style={{ padding: '24px 40px', background: '#fff', overflow: 'auto' }}>
          <article className="wiki-body" dangerouslySetInnerHTML={{ __html: html }} />
        </Content>
      </Layout>
    </Layout>
  );
}

// Lọc menu theo từ khóa (giữ folder nếu có con khớp).
function filterItems(items: any[], q: string): any[] {
  if (!q) return items;
  const out: any[] = [];
  for (const it of items) {
    if (it.children) {
      const kids = filterItems(it.children, q);
      if (kids.length || String(it.label).toLowerCase().includes(q)) out.push({ ...it, children: kids });
    } else if (String(it.label).toLowerCase().includes(q)) {
      out.push(it);
    }
  }
  return out;
}
