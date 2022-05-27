/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Outlet } from 'react-router-dom';

// import StaffHeader from './StaffHeader';

const AdminLayout = () => {
  return (
    <>
      {/* <StaffHeader /> */}
      <Outlet />
    </>
  );
};

export default AdminLayout;
