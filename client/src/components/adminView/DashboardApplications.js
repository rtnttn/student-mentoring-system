/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-prototype-builtins */
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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSortDown, FaCaretUp, FaTrash } from 'react-icons/fa';
import { IoCheckmarkCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { MdOutlinePersonSearch, MdOutlineGroupAdd } from 'react-icons/md';
import {
  getApplications,
  deleteApplication,
  approveMentorship,
  approveMentorSubject,
} from '../../actions/applicationActions';

import '../../styles.css';

const DashboardApplications = ({
  getApplications,
  deleteApplication,
  approveMentorship,
  approveMentorSubject,
  loading,
  applications,
}) => {
  // subApplications is a filtered version of applications
  const [subApplications, setSubApplications] = useState({
    mentees: [],
    mentors: [],
    mentorUniversal: [],
    approvedMentor: [],
    menteeCount: -1,
    mentorCount: -1,
    mentorUniversalCount: -1,
    approvedCount: -1,
    useSubApplications: false,
    deletedIds: [],
    approvedIds: [],
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
    // console.log('Get Applications');
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

  const [showMentorUniversalInfo, setShowMentorUniversalInfo] = useState(false);
  const onShowClickMentorUniversal = (e) => {
    // console.log('onShowClickMentor called');
    setShowMentorUniversalInfo(!showMentorUniversalInfo);
  };

  const [showApprovedMentorInfo, setShowApprovedMentorInfo] = useState(false);
  const onShowClickApprovedMentor = (e) => {
    // console.log('onShowClickMentor called');
    setShowApprovedMentorInfo(!showApprovedMentorInfo);
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
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId) &&
        !mentor.isApproved
    );
    // console.log(mentorsFiltered);

    const mentorsCount = mentorsFiltered.length;
    // console.log(mentorsCount);

    const mentorsUniversalFiltered = applications.mentorEoI.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase())
    );
    // console.log(mentorsFiltered);

    const mentorsUniversalCount = mentorsUniversalFiltered.length;
    // console.log(mentorsCount);

    const approvedMentorFiltered = applications.mentors.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        mentor.isApproved
    );
    // console.log(approvedMentorFiltered);

    const approvedMentorCount = approvedMentorFiltered.length;
    // console.log(mentorsCount);

    setSubApplications({
      ...subApplications,
      mentees: menteesFiltered,
      mentors: mentorsFiltered,
      mentorUniversal: mentorsUniversalFiltered,
      approvedMentor: approvedMentorFiltered,
      menteeCount: menteesCount,
      mentorCount: mentorsCount,
      mentorUniversalCount: mentorsUniversalCount,
      approvedCount: approvedMentorCount,
      useSubApplications: true,
    });
  }; // End of onSubmit

  const onDelete = async (id) => {
    // deleteApplication(id);

    setSubApplications({
      ...subApplications,
      // mentees: [menteesFiltered],
      // mentors: [mentorsFiltered],
      // menteeCount: menteesCount,
      // mentorCount: mentorsCount,
      // useSubApplications: true,
      deletedIds: subApplications.deletedIds.push(id),
    });
    // console.log(subApplications);

    const menteesFiltered = applications.mentees.filter(
      (mentee) =>
        mentee.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentee.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentee.applicationId)
    );
    // console.log(menteesFiltered);

    const menteesCount = menteesFiltered.length;
    // console.log(menteesCount);

    const mentorsFiltered = applications.mentors.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId) &&
        !mentor.isApproved
    );
    // console.log(mentorsFiltered);

    const mentorsCount = mentorsFiltered.length;
    // console.log(mentorsCount);

    const mentorsUniversalFiltered = applications.mentorEoI.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId)
    );
    // console.log(mentorsFiltered);

    const mentorsUniversalCount = mentorsUniversalFiltered.length;
    // console.log(mentorsCount);

    const approvedMentorFiltered = applications.mentors.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId) &&
        mentor.isApproved
    );
    // console.log(mentorsFiltered);

    const approvedMentorCount = approvedMentorFiltered.length;
    // console.log(mentorsCount);

    setSubApplications({
      ...subApplications,
      mentees: menteesFiltered,
      mentors: mentorsFiltered,
      mentorUniversal: mentorsUniversalFiltered,
      approvedMentor: approvedMentorFiltered,
      menteeCount: menteesCount,
      mentorCount: mentorsCount,
      mentorUniversalCount: mentorsUniversalCount,
      approvedCount: approvedMentorCount,
      useSubApplications: true,
    });

    // console.log(subApplications);

    deleteApplication(id);
  };

  const onApproveMentorSubject = async (id) => {
    console.log('onApprove');

    setSubApplications({
      ...subApplications,
      approvedIds: subApplications.approvedIds.push(id),
    });
    console.log(subApplications);
    console.log(subApplications.approvedIds);

    const menteesFiltered = applications.mentees.filter(
      (mentee) =>
        mentee.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentee.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentee.applicationId)
    );
    // console.log(menteesFiltered);

    const menteesCount = menteesFiltered.length;
    // console.log(menteesCount);

    const mentorsFiltered = applications.mentors.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId) &&
        !mentor.isApproved
    );
    // console.log(mentorsFiltered);

    const mentorsCount = mentorsFiltered.length;
    // console.log(mentorsCount);

    const mentorsUniversalFiltered = applications.mentorEoI.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId)
    );
    // console.log(mentorsFiltered);

    const mentorsUniversalCount = mentorsUniversalFiltered.length;
    // console.log(mentorsCount);

    const approvedMentorFiltered = applications.mentors.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId) &&
        mentor.isApproved
    );
    // console.log(mentorsFiltered);

    const approvedMentorCount = approvedMentorFiltered.length;
    // console.log(mentorsCount);

    setSubApplications({
      ...subApplications,
      mentees: menteesFiltered,
      mentors: mentorsFiltered,
      mentorUniversal: mentorsUniversalFiltered,
      approvedMentor: approvedMentorFiltered,
      menteeCount: menteesCount,
      mentorCount: mentorsCount,
      mentorUniversalCount: mentorsUniversalCount,
      approvedCount: approvedMentorCount,
      useSubApplications: true,
    });

    approveMentorSubject(id);
  };

  const onApproveMentorship = async (mentorId, applicationId) => {
    console.log('onApproveMentorship');

    setSubApplications({
      ...subApplications,
      approvedIds: subApplications.approvedIds.push(applicationId),
    });
    console.log(subApplications);
    console.log(subApplications.approvedIds);

    const menteesFiltered = applications.mentees.filter(
      (mentee) =>
        mentee.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentee.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentee.applicationId)
    );
    // console.log(menteesFiltered);

    const menteesCount = menteesFiltered.length;
    // console.log(menteesCount);

    const mentorsFiltered = applications.mentors.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId) &&
        !mentor.isApproved
    );
    // console.log(mentorsFiltered);

    const mentorsCount = mentorsFiltered.length;
    // console.log(mentorsCount);

    const mentorsUniversalFiltered = applications.mentorEoI.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId)
    );
    // console.log(mentorsFiltered);

    const mentorsUniversalCount = mentorsUniversalFiltered.length;
    // console.log(mentorsCount);

    const approvedMentorFiltered = applications.mentors.filter(
      (mentor) =>
        mentor.Student.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        !subApplications.deletedIds.includes(mentor.applicationId) &&
        mentor.isApproved
    );
    // console.log(mentorsFiltered);

    const approvedMentorCount = approvedMentorFiltered.length;
    // console.log(mentorsCount);

    setSubApplications({
      ...subApplications,
      mentees: menteesFiltered,
      mentors: mentorsFiltered,
      mentorUniversal: mentorsUniversalFiltered,
      approvedMentor: approvedMentorFiltered,
      menteeCount: menteesCount,
      mentorCount: mentorsCount,
      mentorUniversalCount: mentorsUniversalCount,
      approvedCount: approvedMentorCount,
      useSubApplications: true,
    });

    approveMentorship(mentorId);
  };

  // return loading while gathering application list
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {/* <div className="col-md card m-1 columnColor"> */}
      <h3 className="text-center mt-2">Applications</h3>
      <div className="text-center mb-2">
        <Link to={`/application/add`}>
          <button type="submit" className="btn btn-primary justify-content-center">
            Create Application
          </button>
        </Link>
      </div>
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
              <td>Mentorship:</td>
              {subApplications.useSubApplications ? (
                <td>{subApplications.mentorUniversalCount}</td>
              ) : (
                <td>{applications.eoICount}</td>
              )}
            </tr>
            <tr>
              <td>Mentor Subjects:</td>
              {subApplications.useSubApplications ? (
                <td>{subApplications.mentorCount}</td>
              ) : (
                <td>{applications.mentors.filter((mentor) => !mentor.isApproved).length}</td>
              )}
            </tr>
            <tr>
              <td>Approved Mentor Subjects:</td>
              {subApplications.useSubApplications ? (
                <td>{subApplications.approvedCount}</td>
              ) : (
                <td>{applications.mentors.filter((mentor) => mentor.isApproved).length}</td>
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
              <FaCaretUp
                onClick={(e) => onShowClickMentee(e)}
                title="Hide"
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <FaSortDown
                onClick={(e) => onShowClickMentee(e)}
                title="Show"
                style={{ cursor: 'pointer' }}
              />
            )}
          </h5>
          {showMenteeInfo ? (
            <ul className="list-group columnSubListColor">
              {subApplications.useSubApplications
                ? subApplications.mentees.map((mentee) =>
                    mentee.hasOwnProperty('applicationId') &&
                    !subApplications.deletedIds.find((id) => id === mentee.applicationId) ? (
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
                                onClick={(e) => onDelete(mentee.applicationId)}
                                title="Delete application"
                                style={{
                                  cursor: 'pointer',
                                  float: 'right',
                                  color: 'red',
                                  marginRight: '10',
                                  transform: 'scale(1.5)',
                                }}
                              />
                              <Link to={`/student/${mentee.studentId}`}>
                                <MdOutlinePersonSearch
                                  title="Student Details"
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'blue',
                                    marginLeft: '10',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              </Link>
                              <Link to={`/group/add/${mentee.applicationId}`}>
                                <MdOutlineGroupAdd
                                  title="Fill application"
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'blue',
                                    marginLeft: '20',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : null
                  )
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
                              onClick={(e) => onDelete(mentee.applicationId)}
                              title="Delete Application"
                              style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'red',
                                marginRight: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <Link to={`/student/${mentee.studentId}`}>
                              <MdOutlinePersonSearch
                                title="Student Details"
                                style={{
                                  cursor: 'pointer',
                                  float: 'left',
                                  color: 'blue',
                                  marginLeft: '10',
                                  transform: 'scale(1.5)',
                                }}
                              />
                            </Link>
                            <Link to={`/group/add/${mentee.applicationId}`}>
                              <MdOutlineGroupAdd
                                title="Process Application"
                                style={{
                                  cursor: 'pointer',
                                  float: 'left',
                                  color: 'blue',
                                  marginLeft: '20',
                                  transform: 'scale(1.5)',
                                }}
                              />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
        {/* END MENTEE APPLICATIONS */}
        {/* MENTOR APPROVAL APPLICATIONS */}
        <li className="list-group-item">
          <h5 className="text-center">
            Mentorship
            {showMentorUniversalInfo ? (
              <FaCaretUp
                onClick={(e) => onShowClickMentorUniversal(e)}
                title="Hide"
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <FaSortDown
                onClick={(e) => onShowClickMentorUniversal(e)}
                title="Show"
                style={{ cursor: 'pointer' }}
              />
            )}
          </h5>
          {showMentorUniversalInfo ? (
            <ul className="list-group columnSubListColor">
              {subApplications.useSubApplications
                ? subApplications.mentorUniversal.map((mentor) =>
                    mentor.hasOwnProperty('applicationId') &&
                    !subApplications.deletedIds.find((id) => id === mentor.applicationId) ? (
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
                            <td className="fst-italic">Type:</td>
                            <td>Application for Mentorship</td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <FaTrash
                                onClick={(e) => onDelete(mentor.applicationId)}
                                title="Delete Application"
                                style={{
                                  cursor: 'pointer',
                                  float: 'right',
                                  color: 'red',
                                  marginRight: '10',
                                  transform: 'scale(1.5)',
                                }}
                              />
                              <Link to={`/student/${mentor.studentId}`}>
                                <MdOutlinePersonSearch
                                  title="Student Details"
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'blue',
                                    marginLeft: '10',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              </Link>
                              {subApplications.approvedIds.find(
                                (id) => id === mentor.applicationId
                              ) ? (
                                <IoCheckmarkCircle
                                  title="Approve Application"
                                  style={{
                                    float: 'left',
                                    color: 'green',
                                    marginLeft: '20',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              ) : (
                                <IoCheckmarkCircleOutline
                                  onClick={(e) =>
                                    onApproveMentorship(mentor.studentId, mentor.applicationId)
                                  }
                                  title="Grant Mentorship"
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'green',
                                    marginLeft: '20',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : null
                  )
                : applications.mentorEoI.map((mentor) => (
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
                          <td className="fst-italic">Type:</td>
                          <td>Application for Mentorship</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <FaTrash
                              onClick={(e) => onDelete(mentor.applicationId)}
                              title="Delete Application"
                              style={{
                                cursor: 'pointer',
                                float: 'right',
                                color: 'red',
                                marginRight: '10',
                                transform: 'scale(1.5)',
                              }}
                            />
                            <Link to={`/student/${mentor.studentId}`}>
                              <MdOutlinePersonSearch
                                title="Student Details"
                                style={{
                                  cursor: 'pointer',
                                  float: 'left',
                                  color: 'blue',
                                  marginLeft: '10',
                                  transform: 'scale(1.5)',
                                }}
                              />
                            </Link>
                            {subApplications.approvedIds.find(
                              (id) => id === mentor.applicationId
                            ) ? (
                              <IoCheckmarkCircle
                                title="Grant Mentorship"
                                style={{
                                  float: 'left',
                                  color: 'green',
                                  marginLeft: '20',
                                  transform: 'scale(1.5)',
                                }}
                              />
                            ) : (
                              <IoCheckmarkCircleOutline
                                onClick={(e) =>
                                  onApproveMentorship(mentor.studentId, mentor.applicationId)
                                }
                                title="Grant Mentorship"
                                style={{
                                  cursor: 'pointer',
                                  float: 'left',
                                  color: 'green',
                                  marginLeft: '20',
                                  transform: 'scale(1.5)',
                                }}
                              />
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
        {/* MENTOR SUBJECT APPLICATIONS */}
        <li className="list-group-item">
          <h5 className="text-center">
            Mentor Subjects
            {showMentorInfo ? (
              <FaCaretUp
                onClick={(e) => onShowClickMentor(e)}
                title="Hide"
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <FaSortDown
                onClick={(e) => onShowClickMentor(e)}
                title="Show"
                style={{ cursor: 'pointer' }}
              />
            )}
          </h5>
          {showMentorInfo ? (
            <ul className="list-group columnSubListColor">
              {subApplications.useSubApplications
                ? subApplications.mentors.map((mentor) =>
                    mentor.hasOwnProperty('applicationId') &&
                    !subApplications.deletedIds.find((id) => id === mentor.applicationId) ? (
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
                                onClick={(e) => onDelete(mentor.applicationId)}
                                style={{
                                  cursor: 'pointer',
                                  float: 'right',
                                  color: 'red',
                                  marginRight: '10',
                                  transform: 'scale(1.5)',
                                }}
                              />
                              <Link to={`/student/${mentor.studentId}`}>
                                <MdOutlinePersonSearch
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'blue',
                                    marginLeft: '10',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              </Link>
                              {subApplications.approvedIds.find(
                                (id) => id === mentor.applicationId
                              ) ? (
                                <IoCheckmarkCircle
                                  style={{
                                    float: 'left',
                                    color: 'green',
                                    marginLeft: '20',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              ) : (
                                <IoCheckmarkCircleOutline
                                  onClick={(e) => onApproveMentorSubject(mentor.applicationId)}
                                  title="Approve Application"
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'green',
                                    marginLeft: '20',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : null
                  )
                : applications.mentors
                    .filter((mentor) => !mentor.isApproved)
                    .map((mentor) => (
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
                                onClick={(e) => onDelete(mentor.applicationId)}
                                title="Delete Application"
                                style={{
                                  cursor: 'pointer',
                                  float: 'right',
                                  color: 'red',
                                  marginRight: '10',
                                  transform: 'scale(1.5)',
                                }}
                              />
                              <Link to={`/student/${mentor.studentId}`}>
                                <MdOutlinePersonSearch
                                  title="Student Details"
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'blue',
                                    marginLeft: '10',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              </Link>
                              {subApplications.approvedIds.find(
                                (id) => id === mentor.applicationId
                              ) ? (
                                <IoCheckmarkCircle
                                  title="Approve Application"
                                  style={{
                                    float: 'left',
                                    color: 'green',
                                    marginLeft: '20',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              ) : (
                                <IoCheckmarkCircleOutline
                                  onClick={(e) => onApproveMentorSubject(mentor.applicationId)}
                                  title="Approve Application"
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'green',
                                    marginLeft: '20',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))}
            </ul>
          ) : null}
        </li>
        {/* APPROVED MENTOR SUBJECT APPLICATIONS */}
        <li className="list-group-item">
          <h5 className="text-center">
            Approved Mentor Subjects
            {showApprovedMentorInfo ? (
              <FaCaretUp
                onClick={(e) => onShowClickApprovedMentor(e)}
                title="Hide"
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <FaSortDown
                onClick={(e) => onShowClickApprovedMentor(e)}
                title="Show"
                style={{ cursor: 'pointer' }}
              />
            )}
          </h5>
          {showApprovedMentorInfo ? (
            <ul className="list-group columnSubListColor">
              {subApplications.useSubApplications
                ? subApplications.approvedMentor.map((mentor) =>
                    mentor.hasOwnProperty('applicationId') &&
                    !subApplications.deletedIds.find((id) => id === mentor.applicationId) ? (
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
                            <td className="fst-italic">Status:</td>
                            <td>Approved</td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <FaTrash
                                onClick={(e) => onDelete(mentor.applicationId)}
                                style={{
                                  cursor: 'pointer',
                                  float: 'right',
                                  color: 'red',
                                  marginRight: '10',
                                  transform: 'scale(1.5)',
                                }}
                              />
                              <Link to={`/student/${mentor.studentId}`}>
                                <MdOutlinePersonSearch
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'blue',
                                    marginLeft: '10',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : null
                  )
                : applications.mentors
                    .filter((mentor) => mentor.isApproved)
                    .map((mentor) => (
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
                            <td className="fst-italic">Status:</td>
                            <td>Approved</td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <FaTrash
                                onClick={(e) => onDelete(mentor.applicationId)}
                                title="Delete Application"
                                style={{
                                  cursor: 'pointer',
                                  float: 'right',
                                  color: 'red',
                                  marginRight: '10',
                                  transform: 'scale(1.5)',
                                }}
                              />
                              <Link to={`/student/${mentor.studentId}`}>
                                <MdOutlinePersonSearch
                                  title="Student Details"
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'blue',
                                    marginLeft: '10',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              </Link>
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
  deleteApplication: PropTypes.func.isRequired,
  approveMentorship: PropTypes.func.isRequired,
  approveMentorSubject: PropTypes.func.isRequired,
  applications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  applications: state.application.applications,
  loading: state.application.loading,
});

export default connect(mapStateToProps, {
  getApplications,
  deleteApplication,
  approveMentorship,
  approveMentorSubject,
})(DashboardApplications);
