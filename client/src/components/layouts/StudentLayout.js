/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Outlet } from 'react-router-dom';

import StudentHeader from './StudentHeader';

const StudentLayout = () => {
  return (
    <>
      <StudentHeader />
      <Outlet />
    </>
  );
};

export default StudentLayout;