/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { studentLogin } from '../../actions/authActions';

const StudentLogin = ({ studentLogin, isAuthStudent }) => {
  // Set up form state
  const [formData, setFormData] = useState({
    studentEmail: '',
    studentPassword: '',
    errors: {},
  });

  // Destructure the state
  const { studentEmail, studentPassword, errors } = formData;

  // On Change
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // on Sumbit
  const onSubmit = async (e) => {
    // This wil prevent the browser from refreshing the page.
    e.preventDefault();
    console.log('On Submit');
    const user = { studentEmail, studentPassword };
    studentLogin(user);
  };

  // check if they are already logged in
  if (isAuthStudent) {
    return <Navigate to="/studentDash" />;
  }

  return (
    <>
      <h1 className="text-primary">Login</h1>
      <div className="card mb-3">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="studentEmail">Email</label>
              <input
                type="text"
                className={classnames('form-control', { 'is-invalid': errors.studentEmail })}
                id="studentEmail"
                placeholder="Email"
                name="studentEmail"
                value={studentEmail}
                onChange={(e) => onChange(e)}
              />
              {errors.studentEmail && <div className="invalid-feedback">{errors.studentEmail}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="studentPassword">Password</label>
              <input
                type="password"
                className={classnames('form-control', { 'is-invalid': errors.studentPassword })}
                id="studentPassword"
                placeholder="Password"
                name="studentPassword"
                value={studentPassword}
                onChange={(e) => onChange(e)}
              />
              {errors.studentPassword && (
                <div className="invalid-feedback">{errors.studentPassword}</div>
              )}
            </div>
            <div className="d-grid gap-2">
              <input type="submit" value="Login" className="btn btn-light " />
            </div>
          </form>
        </div>
        <p className="m-1">
          Don&apos;t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </>
  );
};

StudentLogin.propTypes = {
  studentLogin: PropTypes.func.isRequired,
  isAuthStudent: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthStudent: state.auth.isAuthStudent,
});

export default connect(mapStateToProps, { studentLogin })(StudentLogin);
