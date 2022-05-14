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

// TODO LIST
// onclick for inspect user
// onclick for create group
// onclick for approve mentor
// onclick for delete application

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaSortDown, FaCaretUp, FaTrash } from 'react-icons/fa';
import { IoCheckmarkCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { MdOutlinePersonSearch, MdOutlineGroupAdd } from 'react-icons/md';
import { getApplications } from '../../actions/applicationActions';

import '../../styles.css';

const DashboardApplications = ({ getApplications, loading, applications }) => {
  // subApplications is a filtered version of applications
  const [subApplications, setSubApplications] = useState({
    mentees: [],
    mentors: [],
    menteeCount: -1,
    mentorCount: -1,
    useSubApplications: false,
  });

  // data for the search form
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
  });
  const { name, subject } = formData; // destructuring

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // gets applications when component is called
  useEffect(() => {
    getApplications();
  }, [getApplications]);

  // Hidden List logic
  const [showMenteeInfo, setShowMenteeInfo] = useState(false);
  const onShowClickMentee = (e) => {
    // console.log('onShowClickMentee called');
    setShowMenteeInfo(!showMenteeInfo);
  };

  const [showMentorInfo, setShowMentorInfo] = useState(false);
  const onShowClickMentor = (e) => {
    // console.log('onShowClickMentor called');
    setShowMentorInfo(!showMentorInfo);
  };
  // End of Hidden list logic

  // onSubmit for the search function
  const onSubmit = async (e) => {
    e.preventDefault();

    // console.log('subApplication: ');

    const menteesFiltered = applications.mentees.filter(
      (mentee) =>
        mentee.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentee.Subject.subjectName.toLowerCase().includes(subject.toLowerCase())
    );
    // console.log(menteesFiltered);

    const menteesCount = menteesFiltered.length;
    // console.log(menteesCount);

    const mentorsFiltered = applications.mentors.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase())
    );
    // console.log(mentorsFiltered);

    const mentorsCount = mentorsFiltered.length;
    // console.log(mentorsCount);

    setSubApplications({
      mentees: [menteesFiltered],
      mentors: [mentorsFiltered],
      menteeCount: menteesCount,
      mentorCount: mentorsCount,
      useSubApplications: true,
    });
  }; // End of onSubmit

  // return loading while gathering application list
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {/* <div className="col-md card m-1 columnColor"> */}
      <h3 className="text-center mt-2">Applications</h3>
      {/* SEARCH FORM */}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row g-2 mb-1">
          <div className="col-sm-4">
            <label htmlFor="exampleInputEmail1" className="col-form-label">
              Name
            </label>
          </div>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Student Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="row g-2 mb-1">
          <div className="col-sm-4">
            <label htmlFor="exampleInputEmail1" className="col-form-label">
              Subject
            </label>
          </div>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Subject Name"
              name="subject"
              value={subject}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="text-center mb-2">
          <button type="submit" className="btn btn-primary justify-content-center">
            Search
          </button>
        </div>
      </form>
      {/* END SEARCH FORM */}
      {/* APPLICATION COUNT */}
      <h5 className="align-self-center">
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <td>Mentee:</td>
              {subApplications.useSubApplications ? (
                <td>{subApplications.menteeCount}</td>
              ) : (
                <td>{applications.menteeCount}</td>
              )}
            </tr>
            <tr>
              <td>Mentor:</td>
              {subApplications.useSubApplications ? (
                <td>{subApplications.mentorCount}</td>
              ) : (
                <td>{applications.mentorCount}</td>
              )}
            </tr>
          </tbody>
        </table>
      </h5>
      {/* END APPLICATION COUNT */}
      {/* APPLICATION CONTENT */}
      {/* MENTEE APPLICATIONS */}
      <ul className="list-group">
        <li className="list-group-item">
          <h5 className="text-center">
            Mentee
            {showMenteeInfo ? (
              <FaCaretUp onClick={(e) => onShowClickMentee(e)} style={{ cursor: 'pointer' }} />
            ) : (
              <FaSortDown onClick={(e) => onShowClickMentee(e)} style={{ cursor: 'pointer' }} />
            )}
          </h5>
          {showMenteeInfo ? (
            <ul className="list-group columnSubListColor">
              {subApplications.useSubApplications
                ? subApplications.mentees.map((mentee) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {mentee.Student.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Subject:</td>
                          <td>{mentee.Subject.subjectName}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Active Mentee Groups:</td>
                          <td>
                            {mentee.Student.Members.filter((m) => m.isMentor === false).length}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <FaTrash
                              // onClick={(e) => deleteApplication(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'red',
                                marginRight: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <MdOutlinePersonSearch
                              // onClick={(e) => userProfile(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'left',
                                color: 'blue',
                                marginLeft: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <MdOutlineGroupAdd
                              // onClick={(e) => createGroup(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'left',
                                color: 'blue',
                                marginLeft: '20',
                                transform: 'scale(1.5)',
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))
                : applications.mentees.map((mentee) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {mentee.Student.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Subject:</td>
                          <td>{mentee.Subject.subjectName}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Active Mentee Groups:</td>
                          <td>
                            {mentee.Student.Members.filter((m) => m.isMentor === false).length}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <FaTrash
                              // onClick={(e) => deleteApplication(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'red',
                                marginRight: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <MdOutlinePersonSearch
                              // onClick={(e) => userProfile(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'left',
                                color: 'blue',
                                marginLeft: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <MdOutlineGroupAdd
                              // onClick={(e) => createGroup(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'left',
                                color: 'blue',
                                marginLeft: '20',
                                transform: 'scale(1.5)',
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
        {/* END MENTEE APPLICATIONS */}
        {/* MENTOR APPLICATIONS */}
        <li className="list-group-item">
          <h5 className="text-center">
            Mentor
            {showMentorInfo ? (
              <FaCaretUp onClick={(e) => onShowClickMentor(e)} style={{ cursor: 'pointer' }} />
            ) : (
              <FaSortDown onClick={(e) => onShowClickMentor(e)} style={{ cursor: 'pointer' }} />
            )}
          </h5>
          {showMentorInfo ? (
            <ul className="list-group columnSubListColor">
              {subApplications.useSubApplications
                ? subApplications.mentors.map((mentor) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {mentor.Student.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Subject:</td>
                          <td>{mentor.Subject.subjectName}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Active Mentor Groups:</td>
                          <td>
                            {mentor.Student.Members.filter((m) => m.isMentor === true).length}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <FaTrash
                              // onClick={(e) => deleteApplication(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'red',
                                marginRight: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <IoCheckmarkCircleOutline
                              // onClick={(e) => approveMentor(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'green',
                                marginRight: '20',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <MdOutlinePersonSearch
                              // onClick={(e) => userProfile(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'left',
                                color: 'blue',
                                marginLeft: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <MdOutlineGroupAdd
                              // onClick={(e) => createGroup(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'left',
                                color: 'blue',
                                marginLeft: '20',
                                transform: 'scale(1.5)',
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))
                : applications.mentors.map((mentor) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {mentor.Student.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Subject:</td>
                          <td>{mentor.Subject.subjectName}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Active Mentor Groups:</td>
                          <td>
                            {mentor.Student.Members.filter((m) => m.isMentor === true).length}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <FaTrash
                              // onClick={(e) => deleteApplication(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'red',
                                marginRight: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <IoCheckmarkCircleOutline
                              // onClick={(e) => approveMentor(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'green',
                                marginRight: '20',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <MdOutlinePersonSearch
                              // onClick={(e) => userProfile(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'left',
                                color: 'blue',
                                marginLeft: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <MdOutlineGroupAdd
                              // onClick={(e) => createGroup(e)}
                              style={{
                                cursor: 'pointer',
                                float: 'left',
                                color: 'blue',
                                marginLeft: '20',
                                transform: 'scale(1.5)',
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
      </ul>
    </div>
  );
};

DashboardApplications.propTypes = {
  getApplications: PropTypes.func.isRequired,
  applications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  applications: state.application.applications,
  loading: state.application.loading,
});

export default connect(mapStateToProps, { getApplications })(DashboardApplications);
