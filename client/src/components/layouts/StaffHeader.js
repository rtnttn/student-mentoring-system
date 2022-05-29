/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// We can use PropTypes to enforce type checking.
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { staffLogout } from '../../actions/authActions';

import '../../styles.css';

const StaffHeader = ({ staffLogout }) => {
  // console.log(props);
  return (
    <div>
      <nav
        id="navBackground"
        className="navbar navbar-expand-xl navbar-light nav nav-pills rounded-3 mt-2 border shadow-sm"
      >
        <div className="container-fluid">
          <a className="navbar-brand ps-2" href="#">
            <h1 className="pb-1 border-bottom border-3 rounded" id="navTitle">
              Computer and IT Mentoring
            </h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav nav-fill navbar-nav ms-auto me-auto mt-2 mb-2 mb-lg-0">
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link active text-light" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link text-primary" to="/applications/add">
                  Create Application
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link text-primary" to="/student/add">
                  Create Student
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link text-primary" to="/teacher/add">
                  Create Teacher
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link text-primary" to="/subjects">
                  Subjects
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link
                  className="nav-link text-primary"
                  to="#!"
                  onClick={(e) => {
                    staffLogout();
                    window.location.reload(false);
                  }}
                >
                  Logout
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link text-primary" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
      <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
    </div>
  );
};

// We can set default props for a component if nothing is passed through.
StaffHeader.defaultProps = {};

// We can use prop types to check data that is passed through
StaffHeader.propTypes = {
  staffLogout: PropTypes.func.isRequired,
};
// Shortcut pts

export default connect(null, { staffLogout })(StaffHeader);
