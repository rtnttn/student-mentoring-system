/* eslint-disable no-shadow */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { register } from '../../actions/authActions';

import '../../loginAlt.css';

const Register = ({ register }) => {
  // Set up our form state
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    password: '',
    passwordCompare: '',
    courseName: '',
    courseStage: '',
    errors: {},
  });
  const [errors, setErrors] = useState({});
  // Destructure
  const { studentName, email, password, passwordCompare, courseName, courseStage } = formData;

  // On Change function
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // On Submit
  const onSubmit = async (e) => {
    // This wil prevent the browser from refreshing the page.
    e.preventDefault();
    console.log('On Submit');

    if (password !== passwordCompare) {
      // write some error message
      // use classnames package
      setErrors({ password: 'Passwords do not match' });
      return;
    } else {
      const user = { studentName, email, password, courseName, courseStage };
      register(user);
    }
  };

  // if (isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  // Copy our form.
  return (
    <Fragment>
      <div>
        <div className="sidenav">
          <div className="main-heading">
            <h1>
              Student Mentoring System
              <br /> Login Page
            </h1>
          </div>
        </div>
        <div className="main">
          <div className="col-md-8 col-sm-12">
            <div className="login-form">
              <form className="create-account-form" onSubmit={(e) => onSubmit(e)}>
                <h2>Create Account</h2>
                <div className="col-md-auto">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="col-form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputFullName"
                      placeholder="Enter full name"
                      name="studentName"
                      value={studentName}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="col-form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="col-form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputPassword2" className="col-form-label">
                      Repeat Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword2"
                      placeholder="Password"
                      name="passwordCompare"
                      value={passwordCompare}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Course</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="courseName"
                      value={courseName}
                      onChange={(e) => onChange(e)}
                    >
                      <option>Select Course</option>
                      <option>BIS17 Bachelor of Information Systems</option>
                      <option>22445VIC Advanced Diploma of Cyber Security</option>
                      <option>
                        ICT50220 Diploma of Information Technology (Advanced Networking)
                      </option>
                      <option>
                        ICT50220 Diploma of Information Technology (Game Art and Design)
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleInputCourseStage" className="col-form-label">
                      Semester
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputCourseStage"
                      placeholder="How many semesters are you into the course?"
                      name="courseStage"
                      value={courseStage}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary my-2">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <h1 className="text-primary">Register as a new user</h1>
      <div className="card mb-3">
        <div className="card-header">Register</div>
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className={classnames('form-control', { 'is-invalid': errors.password })}
                id="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            <div className="mb-3">
              <label htmlFor="passwordCompare">Repeat Password</label>
              <input
                type="text"
                className="form-control"
                id="passwordCompare"
                placeholder="passwordCompare"
                name="passwordCompare"
                value={passwordCompare}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" value="Register" className="btn btn-light " />
            </div>
          </form>
        </div>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div> */}
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  // isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  // isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
