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
import { addStudent, getStudents } from '../../actions/studentActions';

const AdminStudentCreate = ({ students, addStudent, getStudents, loading }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    studentPassword: 'password',
    courseName: 'BIS17 Bachelor of Information Systems',
    courseStage: '1',
    errors: {},
  });
  const { studentName, studentEmail, studentPassword, courseName, courseStage, errors } = formData; // destructuring

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (studentName === '') {
      setFormData({ ...formData, errors: { studentName: 'Name is Required' } });
      return; // stop the onSumbit running.
    }
    if (studentEmail === '') {
      setFormData({ ...formData, errors: { studentEmail: 'Email is Required' } });
      return; // stop the onSumbit running.
    }
    if (students.find((student) => student.studentEmail === studentEmail)) {
      setFormData({ ...formData, errors: { studentEmail: 'Email Address already in use' } });
      return; // stop the onSumbit running.
    }
    if (studentPassword === '') {
      setFormData({ ...formData, errors: { studentPassword: 'Password is Required' } });
      return; // stop the onSumbit running.
    }
    if (courseName === '') {
      setFormData({ ...formData, errors: { courseName: 'Course is Required' } });
      return; // stop the onSumbit running.
    }
    if (courseStage === '') {
      setFormData({ ...formData, errors: { courseStage: 'Course Stage is Required' } });
      return; // stop the onSumbit running.
    }

    const newStudent = {
      studentName,
      studentEmail,
      studentPassword,
      courseName,
      courseStage,
    };

    // console.log(newStudent);
    addStudent(newStudent);
    getStudents();
  };

  useEffect(() => {
    console.log('getStudents');
    // console.log('1. Loading: ' + loading);
    // console.log('2. user:');
    // console.log(user);
    // console.log('1-2. Loading: ' + loading);
    getStudents();
  }, [getStudents]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="col-md card columnColor shadow mt-2 mb-2" id="colBackground">
      <div className="container ps-5 pe-5 pt-3">
        <div className="ps-5 pe-5">
          <h4 className="text-center">Add a Student</h4>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row g-2 mb-1">
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1" className="col-form-label">
                  Student Name:
                </label>
              </div>
              <div className="col-sm-10">
                <input
                  type="text"
                  className={classnames('form-control', { 'is-invalid': errors.studentName })}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  // placeholder="New Student Name"
                  name="studentName"
                  value={studentName}
                  onChange={(e) => onChange(e)}
                />
                {errors.studentName && <div className="invalid-feedback">{errors.studentName}</div>}
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
                  className={classnames('form-control', { 'is-invalid': errors.studentEmail })}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="(must be unique)"
                  name="studentEmail"
                  value={studentEmail}
                  onChange={(e) => onChange(e)}
                />
                {errors.studentEmail && (
                  <div className="invalid-feedback">{errors.studentEmail}</div>
                )}
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
                  className={classnames('form-control', { 'is-invalid': errors.studentPassword })}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="studentPassword"
                  // defaultValue="1234"
                  value={studentPassword}
                  onChange={(e) => onChange(e)}
                />
                {errors.studentPassword && (
                  <div className="invalid-feedback">{errors.studentPassword}</div>
                )}
              </div>
            </div>
            <div className="row g-2 mb-1">
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1" className="col-form-label">
                  Course Name:
                </label>
              </div>
              <div className="col-sm-10">
                <input
                  type="text"
                  className={classnames('form-control', { 'is-invalid': errors.courseName })}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="courseName"
                  // defaultValue="BIS17 Bachelor of Information Systems"
                  value={courseName}
                  onChange={(e) => onChange(e)}
                />
                {errors.courseName && <div className="invalid-feedback">{errors.courseName}</div>}
              </div>
            </div>
            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary justify-content-center">
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Create our propTypes
AdminStudentCreate.propTypes = {
  getStudents: PropTypes.func.isRequired,
  addStudent: PropTypes.func.isRequired,
  students: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  students: state.student.students,
  loading: state.student.loading,
});

export default connect(mapStateToProps, { addStudent, getStudents })(AdminStudentCreate);
