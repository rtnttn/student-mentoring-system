import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { FaHome, FaPlus, FaQuestion, FaSignInAlt, FaDoorOpen, FaSignOutAlt } from 'react-icons/fa';

const PubHeader = ({ branding }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container-fluid justify-content-center">
        <ul className="nav">
          <li className="nav-item">
            <Link className="navbar-brand" title="Home" to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-school"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
              </svg>
              {branding}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

PubHeader.defaultProps = {
  branding: 'Student Mentoring System',
};

PubHeader.propTypes = {
  branding: PropTypes.string,
};

export default PubHeader;
