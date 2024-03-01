import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OtzDashboard from './otz.component';

const Root: React.FC = () => {
  const basePath = window.getOpenmrsSpaBase() + 'home/otz';

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/" element={<OtzDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
