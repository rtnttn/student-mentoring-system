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
// import { logout } from '../../actions/authActions';

const Header = () => {
  // console.log(props);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light nav nav-pills navBackground">
        <div className="container-fluid">
          <a className="navbar-brand ps-2" href="dashboard.html">
            <h1>Computer and IT Mentoring</h1>
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
            <ul className="nav nav-pills nav-fill ms-auto mt-2 mb-2 mb-lg-0">
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link active" to="/dashboard">
                  Home
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link" to="/subjects">
                  Subjects
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link" to="/createGroup">
                  Create Group
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link" to="/login">
                  Logout
                </Link>
              </li>
              <li className="nav-item ps-2 pe-2">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

// We can set default props for a component if nothing is passed through.
Header.defaultProps = {};

// We can use prop types to check data that is passed through
Header.propTypes = {};
// Shortcut pts

export default connect(null, {})(Header);
