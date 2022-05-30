/* eslint-disable react/jsx-boolean-value */
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
import { getApplicationsBasic, addApplication } from '../../actions/applicationActions';
import { getStudents } from '../../actions/studentActions';
import { getSubjects } from '../../actions/subjectActions';

const AdminApplicationCreate = ({
  basicApplications,
  students,
  subjects,
  getApplicationsBasic,
  addApplication,
  getStudents,
  getSubjects,
  loading,
}) => {
  const [formData, setFormData] = useState({
    studentId: 0,
    subjectId: 0,
    appType: 'mentee',
    errors: {},
  });
  const { studentId, subjectId, appType, errors } = formData; // destructuring

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value, 10) });

  const onRadioChange = (e) => setFormData({ ...formData, appType: e.target.value });

  const [sortedData, setSortedData] = useState({
    students: [],
    subjects: [],
    loading: true,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    if (studentId === 0) {
      setFormData({ ...formData, errors: { studentId: 'Student is Required' } });
      return; // stop the onSumbit running.
    }
    if (subjectId === 0) {
      setFormData({ ...formData, errors: { subjectId: 'Subject is Required' } });
      return; // stop the onSumbit running.
    }

    const newApplication = {
      studentId,
      subjectId,
      forMentor: appType === 'mentor',
    };

    if (
      subjectId !== 5 &&
      newApplication.forMentor &&
      !sortedData.students.find((student) => student.studentId === newApplication.studentId)
        .isMentor
    ) {
      setFormData({
        ...formData,
        errors: { appType: 'This student has not been approved for mentorship' },
      });
      return; // stop the onSumbit running.
    }

    if (
      basicApplications.find(
        (app) =>
          app.studentId === studentId &&
          app.subjectId === subjectId &&
          app.forMentor === newApplication.forMentor
      )
    ) {
      setFormData({
        ...formData,
        errors: {
          appType: 'This student already has an application of this kind for this subject',
        },
      });
      return; // stop the onSumbit running.
    }
    // mentorship application needs ismentor true
    if (subjectId === 5 && !newApplication.forMentor) {
      setFormData({
        ...formData,
        errors: { appType: 'Mentorship application requires type mentor' },
      });
      return; // stop the onSumbit running.
    }
    // console.log(students.sort((a, b) => a.studentName.localeCompare(b.studentName)));
    // console.log(sortedData);
    // console.log(newApplication);
    addApplication(newApplication);
    // console.log(newApplication);
    getApplicationsBasic();
  };

  useEffect(() => {
    // console.log('getStudents');
    // console.log('getSubjects');
    // console.log('getApplicationsBasic');
    // console.log('1. Loading: ' + loading);
    // console.log('2. user:');
    // console.log(user);
    // console.log('1-2. Loading: ' + loading);
    getStudents();
    getSubjects();
    getApplicationsBasic();
  }, [getStudents, getSubjects, getApplicationsBasic]);

  useEffect(() => {
    if (students.length !== 0 && subjects.length !== 0) {
      setSortedData({
        students: students.sort((a, b) => a.studentName.localeCompare(b.studentName)),
        subjects: [
          subjects.find((subject) => subject.subjectName === 'Mentor Application'),
          ...subjects
            .filter((subject) => subject.subjectName !== 'Mentor Application')
            .sort((a, b) => a.subjectName.localeCompare(b.subjectName)),
        ],
        loading: false,
      });
    }
  }, [students, subjects, basicApplications]);

  return sortedData.loading ? (
    <div>
      <h1>Loading...</h1>
      <h2>This page will not load if there are no students or subjects</h2>
    </div>
  ) : (
    <div className="col-md card columnColor shadow mt-2 mb-2" id="colBackground">
      <div className="container ps-5 pe-5 pt-3">
        <div className="ps-5 pe-5">
          <h4 className="text-center">Create an Application</h4>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row g-2 mb-1">
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1" className="col-form-label">
                  Student:
                </label>
              </div>
              <div className="form-group mt-1">
                <select
                  className={classnames('form-select', { 'is-invalid': errors.studentId })}
                  id="exampleFormControlSelect1"
                  name="studentId"
                  onChange={(e) => onChange(e)}
                >
                  <option defaultValue={0} value={0}>
                    [Select a Student]
                  </option>
                  {sortedData.students.map((student, index) => (
                    <option value={parseInt(student.studentId, 10)}>{student.studentName}</option>
                  ))}
                </select>
                {errors.studentId && <div className="invalid-feedback">{errors.studentId}</div>}
              </div>
            </div>
            <div className="row g-2 mb-1">
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1" className="col-form-label">
                  Subject:
                </label>
              </div>
              <div className="form-group mt-1">
                <select
                  className={classnames('form-select', { 'is-invalid': errors.subjectId })}
                  id="exampleFormControlSelect1"
                  name="subjectId"
                  onChange={(e) => onChange(e)}
                >
                  <option defaultValue={0} value={0}>
                    [Select a Subject]
                  </option>
                  {sortedData.subjects.map((subject, index) => (
                    <option value={parseInt(subject.subjectId, 10)}>{subject.subjectName}</option>
                  ))}
                </select>
                {errors.subjectId && <div className="invalid-feedback">{errors.subjectId}</div>}
              </div>
            </div>
            <div className="row g-2 mb-1">
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1" className="col-form-label">
                  Application Type:
                </label>
              </div>
              <div className="form-check">
                <input
                  className={classnames('form-check-input', { 'is-invalid': errors.appType })}
                  type="radio"
                  name="appType"
                  id="exampleRadios1"
                  value="mentee"
                  onChange={(e) => onRadioChange(e)}
                  checked={appType === 'mentee'}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Mentee
                </label>
              </div>
              <div className="form-check">
                <input
                  className={classnames('form-check-input', { 'is-invalid': errors.appType })}
                  type="radio"
                  name="appType"
                  id="exampleRadios2"
                  value="mentor"
                  onChange={(e) => onRadioChange(e)}
                  checked={appType === 'mentor'}
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Mentor
                </label>
                {errors.appType && <div className="invalid-feedback mt-2">{errors.appType}</div>}
              </div>
            </div>

            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary justify-content-center">
                Create Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Create our propTypes
AdminApplicationCreate.propTypes = {
  getApplicationsBasic: PropTypes.func.isRequired,
  addApplication: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  getSubjects: PropTypes.func.isRequired,
  students: PropTypes.array,
  basicApplications: PropTypes.array,
  subjects: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  students: state.student.students,
  basicApplications: state.application.basicApplications,
  subjects: state.subject.subjects,
  loading: state.student.loading,
});

export default connect(mapStateToProps, {
  getApplicationsBasic,
  addApplication,
  getStudents,
  getSubjects,
})(AdminApplicationCreate);
