import React from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { BrowserRouter } from 'react-router';
import { Header } from '@/components/Header';
import { ConfigProvider, theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

export const App: React.FC = () => (
  <ConfigProvider
    theme={{
      algorithm: defaultAlgorithm,
    }}
  >
    <div className={'vstack full font-mono font-bold'}>
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  </ConfigProvider>
);
