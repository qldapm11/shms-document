import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import 'antd/dist/reset.css';
import { Wiki } from './Wiki';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: '#1565c0', borderRadius: 6, colorInfo: '#1565c0' } }}>
      <Wiki />
    </ConfigProvider>
  </React.StrictMode>,
);
