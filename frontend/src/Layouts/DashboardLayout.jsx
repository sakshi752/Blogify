import React from 'react'
import SideBar from '../Components/Sidebar/SideBar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
