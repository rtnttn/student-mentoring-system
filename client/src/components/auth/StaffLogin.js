/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { staffLogin } from '../../actions/authActions';

const StaffLogin = ({ staffLogin, isAuthenticated }) => {
  // Set up form state
  const [formData, setFormData] = useState({
    staffEmail: '',
    staffPassword: '',
    errors: {},
  });

  // Destructure the state
  const { staffEmail, staffPassword, errors } = formData;

  // On Change
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // on Sumbit
  const onSubmit = async (e) => {
    // This wil prevent the browser from refreshing the page.
    e.preventDefault();
    console.log('On Submit');
    const user = { staffEmail, staffPassword };
    staffLogin(user);
  };

  // check if they are already logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1 className="text-primary">Login</h1>
      <div className="card mb-3">
        <div className="card-header">Login</div>
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="staffEmail">Email</label>
              <input
                type="text"
                className={classnames('form-control', { 'is-invalid': errors.staffEmail })}
                id="staffEmail"
                placeholder="Email"
                name="staffEmail"
                value={staffEmail}
                onChange={(e) => onChange(e)}
              />
              {errors.staffEmail && <div className="invalid-feedback">{errors.staffEmail}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="staffPassword">Password</label>
              <input
                type="password"
                className={classnames('form-control', { 'is-invalid': errors.staffPassword })}
                id="staffPassword"
                placeholder="Password"
                name="staffPassword"
                value={staffPassword}
                onChange={(e) => onChange(e)}
              />
              {errors.staffPassword && (
                <div className="invalid-feedback">{errors.staffPassword}</div>
              )}
            </div>
            <div className="d-grid gap-2">
              <input type="submit" value="Login" className="btn btn-light " />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

StaffLogin.propTypes = {
  staffLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { staffLogin })(StaffLogin);
