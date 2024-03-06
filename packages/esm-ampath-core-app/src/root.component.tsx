import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AmpathDashboard from './ampath-dashboard/ampath-dashboard.component';

export default function Root() {
  return (
    <BrowserRouter basename={window['getOpenmrsSpaBase']()}>
      <Routes>
        <Route path="/dashboard" element={<AmpathDashboard />} />
        <Route path="/dashboard/:view" element={<AmpathDashboard />} />
        <Route path="/home" element={<Navigate to={'/dashboard/home'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
