/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getStaff, addStaff } from '../../actions/staffActions';

const AdminStaffCreate = ({ staff, getStaff, addStaff, loading }) => {
  const [formData, setFormData] = useState({
    staffName: '',
    staffEmail: '',
    staffPassword: 'password',
    errors: {},
  });
  const { staffName, staffEmail, staffPassword, errors } = formData; // destructuring

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (staffName === '') {
      setFormData({ ...formData, errors: { staffName: 'Name is Required' } });
      return; // stop the onSumbit running.
    }
    if (staffEmail === '') {
      setFormData({ ...formData, errors: { staffEmail: 'Email is Required' } });
      return; // stop the onSumbit running.
    }
    if (staff.find((staff) => staff.staffEmail === staffEmail)) {
      setFormData({ ...formData, errors: { staffEmail: 'Email Address already in use' } });
      return; // stop the onSumbit running.
    }
    if (staffPassword === '') {
      setFormData({ ...formData, errors: { staffPassword: 'Password is Required' } });
      return; // stop the onSumbit running.
    }

    const newStaff = {
      staffName,
      staffEmail,
      staffPassword,
    };

    // console.log(newStaff);
    addStaff(newStaff);
    getStaff();
  };

  useEffect(() => {
    console.log('getStaff');
    // console.log('1. Loading: ' + loading);
    // console.log('2. user:');
    // console.log(user);
    // console.log('1-2. Loading: ' + loading);
    getStaff();
  }, [getStaff]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="col-md card columnColor shadow mt-2 mb-2" id="colBackground">
      <div className="container ps-5 pe-5 pt-3">
        <div className="ps-5 pe-5">
          <h4 className="text-center">Add a Teacher</h4>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row g-2 mb-1">
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1" className="col-form-label">
                  Teacher Name:
                </label>
              </div>
              <div className="col-sm-10">
                <input
                  type="text"
                  className={classnames('form-control', { 'is-invalid': errors.staffName })}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  // placeholder="New Student Name"
                  name="staffName"
                  value={staffName}
                  onChange={(e) => onChange(e)}
                />
                {errors.staffName && <div className="invalid-feedback">{errors.staffName}</div>}
              </div>
            </div>
            <div className="row g-2 mb-1">
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1" className="col-form-label">
                  Email:
                </label>
              </div>
              <div className="col-sm-10">
                <input
                  type="text"
                  className={classnames('form-control', { 'is-invalid': errors.staffEmail })}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="(must be unique)"
                  name="staffEmail"
                  value={staffEmail}
                  onChange={(e) => onChange(e)}
                />
                {errors.staffEmail && <div className="invalid-feedback">{errors.staffEmail}</div>}
              </div>
            </div>
            <div className="row g-2 mb-1">
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1" className="col-form-label">
                  Password:
                </label>
              </div>
              <div className="col-sm-10">
                <input
                  type="text"
                  className={classnames('form-control', { 'is-invalid': errors.staffPassword })}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="staffPassword"
                  // defaultValue="1234"
                  value={staffPassword}
                  onChange={(e) => onChange(e)}
                />
                {errors.staffPassword && (
                  <div className="invalid-feedback">{errors.staffPassword}</div>
                )}
              </div>
            </div>
            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary justify-content-center">
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Create our propTypes
AdminStaffCreate.propTypes = {
  getStaff: PropTypes.func.isRequired,
  addStaff: PropTypes.func.isRequired,
  staff: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  staff: state.staff.staff,
  loading: state.staff.loading,
});

export default connect(mapStateToProps, { getStaff, addStaff })(AdminStaffCreate);
