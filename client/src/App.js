/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// IMPORT COMPONENTS
import Header from './components/layouts/Header';
import Dashboard from './components/adminView/Dashboard';
import Register from './components/auth/Register';
import AdminLayout from './components/layouts/AdminLayout';
import AdminStudentProfile from './components/students/AdminStudentProfile';
import AdminGroupProfile from './components/groups/AdminGroupProfile';
import StudentLayout from './components/layouts/StudentLayout';
import StudentDashboard from './components/studentView/StudentDashboard';

import './styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/student/:id" element={<AdminStudentProfile />} />
              <Route path="/group/:id" element={<AdminGroupProfile />} />
            </Route>

            <Route path="register" element={<Register />} />

            <Route path="/student" element={<StudentLayout />}/>
            <Route path="/student" element={<StudentDashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
