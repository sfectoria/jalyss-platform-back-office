import React from 'react'
import { Outlet } from 'react-router-dom';

const DashboardModule = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default DashboardModule