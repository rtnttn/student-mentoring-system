import React from 'react';
import { Link } from 'react-router-dom';

const date = new Date();

const Footer = () => {
  return (
    <div className="container-fluid bg-light py-3 my-4 position-relative bottom-0 w-100">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <Link to="/login/student" className="nav-link py-2 ml-3 text-black">
              Student Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login/staff" className="nav-link py-2 ml-3 text-black">
              Staff Login
            </Link>
          </li>
        </ul>
        <ul className="nav justify-content-center">
          <li className="nav-item py-2 ml-3 text-black">
            {/* fromCharCode(169) will insert a copyright symbol */}
            copyright {String.fromCharCode(169)}
            {/* Going to add in the current year */}
            {` ${date.getFullYear()}`} GroupOne
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
