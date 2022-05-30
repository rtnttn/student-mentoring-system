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
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getSubjects, addSubject, deleteSubject } from '../../actions/subjectActions';

const Subjects = ({ subjects, getSubjects, addSubject, deleteSubject, loading }) => {
  const [formData, setFormData] = useState({
    subjectName: '',
    errors: {},
  });
  const { subjectName, errors } = formData; // destructuring

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (subjectName === '') {
      setFormData({ ...formData, errors: { subjectName: 'Subject Name is Required' } });
      return; // stop the onSumbit running.
    }

    addSubject(formData);
    getSubjects();
  };

  useEffect(() => {
    console.log('getSubjects');
    // console.log('1. Loading: ' + loading);
    // console.log('2. user:');
    // console.log(user);
    // console.log('1-2. Loading: ' + loading);
    getSubjects();
  }, [getSubjects]);

  const onDelete = async (id) => {
    console.log('onDelete');
    deleteSubject(id);
    getSubjects();
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="col-md card columnColor shadow mt-2 mb-2" id="colBackground">
      <div className="container ps-5 pe-5 pt-3">
        <div className="ps-5 pe-5">
          <h4 className="text-center">Add a Subject</h4>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h4 className="text-primary">
              <FaArrowLeft className="m-1" />
              Back
            </h4>
          </Link>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="row g-2 mb-1">
              <div className="col-sm-2">
                <label htmlFor="exampleInputEmail1" className="col-form-label">
                  Subject Name:
                </label>
              </div>
              <div className="col-sm-10">
                <input
                  type="text"
                  className={classnames('form-control', { 'is-invalid': errors.subjectName })}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="New Subject Name"
                  name="subjectName"
                  value={subjectName}
                  onChange={(e) => onChange(e)}
                />
                {errors.subjectName && <div className="invalid-feedback">{errors.subjectName}</div>}
              </div>
            </div>
            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary justify-content-center">
                Add Subject
              </button>
            </div>
          </form>

          <br />

          <h4 className="text-center">Current Subjects</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Subject Id</th>
                <th scope="col">Subject Name</th>
                <th scope="col">Delete?</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.subjectId}>
                  <td>{subject.subjectId}</td>
                  <td>{subject.subjectName}</td>
                  <td>
                    {subject.subjectName !== 'Mentor Application' ? (
                      <FaTrash
                        onClick={(e) =>
                          // eslint-disable-next-line no-alert
                          window.confirm(
                            'WARNING!\nYou are about to delete ' +
                              subject.subjectName +
                              '\nDeleting a subject will delete all groups and applications associated with that subject\nAre you sure you want to delete?'
                          )
                            ? onDelete(subject.subjectId)
                            : null
                        }
                        title="Delete Subject"
                        style={{
                          cursor: 'pointer',
                          float: 'left',
                          color: 'red',
                          marginLeft: '10',
                          transform: 'scale(1.5)',
                        }}
                      />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Create our propTypes
Subjects.propTypes = {
  getSubjects: PropTypes.func.isRequired,
  addSubject: PropTypes.func.isRequired,
  deleteSubject: PropTypes.func.isRequired,
  subjects: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  subjects: state.subject.subjects,
  loading: state.subject.loading,
});

export default connect(mapStateToProps, { getSubjects, addSubject, deleteSubject })(Subjects);
