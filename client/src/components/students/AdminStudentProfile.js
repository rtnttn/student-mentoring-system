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
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaSortDown, FaCaretUp, FaTrash } from 'react-icons/fa';
import { IoCheckmarkCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { MdOutlinePersonSearch, MdOutlineGroupAdd, MdOutlineManageSearch } from 'react-icons/md';
import { getStudentAdmin } from '../../actions/userActions';
import {
  deleteApplication,
  approveMentorship,
  approveMentorSubject,
} from '../../actions/applicationActions';

const AdminStudentProfile = ({
  user,
  getStudentAdmin,
  loading,
  deleteApplication,
  approveMentorship,
  approveMentorSubject,
}) => {
  const [studentData, setStudentData] = useState({
    studentName: '',
    studentEmail: '',
    studentCourse: '',
    approvedSubjects: [],
    openMenteeApplications: [],
    openMentorshipApplications: [],
    openMentorApplications: [],
    menteeGroups: [],
    mentorGroups: [],
    loading: true,
  });

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    // console.log('1. Loading: ' + loading);
    // console.log('2. user:');
    // console.log(user);
    // console.log('1-2. Loading: ' + loading);
    getStudentAdmin(id);
  }, [getStudentAdmin, id]);

  useEffect(() => {
    // console.log('3. loading: ' + loading);
    // console.log('4. user:');
    console.log(user);
    if (user.hasOwnProperty('student')) {
      setStudentData({
        studentName: user.student.studentName,
        studentEmail: user.student.studentEmail,
        studentCourse: user.student.courseName,
        approvedSubjects: user.student.Applications.filter((app) => app.isApproved),
        openMenteeApplications: user.student.Applications.filter(
          (app) => !app.forMentor && app.Subject.subjectName !== 'Mentor Application'
        ),
        openMentorshipApplications: user.student.Applications.filter(
          (app) => app.Subject.subjectName === 'Mentor Application'
        ),
        openMentorApplications: user.student.Applications.filter(
          (app) =>
            app.forMentor && !app.isApproved && app.Subject.subjectName !== 'Mentor Application'
        ),
        menteeGroups: user.student.Members.filter((mem) => !mem.isMentor),
        mentorGroups: user.student.Members.filter((mem) => mem.isMentor),
        loading: false,
      });
    }
  }, [user]);

  const onDelete = async (applicationId) => {
    // deleteApplication(applicationId);

    await setStudentData({
      ...studentData,
      openMenteeApplications: studentData.openMenteeApplications.filter(
        (app) => app.applicationId !== applicationId
      ),
      openMentorApplications: studentData.openMentorApplications.filter(
        (app) => app.applicationId !== applicationId
      ),
      openMentorshipApplications: studentData.openMentorshipApplications.filter(
        (app) => app.applicationId !== applicationId
      ),
    });

    deleteApplication(applicationId);
  };

  const onApproveMentorship = async (applicationId) => {
    setStudentData({
      ...studentData,
      openMentorshipApplications: studentData.openMentorshipApplications.filter(
        (app) => app.applicationId !== applicationId
      ),
    });

    approveMentorship(id);
  };

  const onApproveMentorSubject = async (applicationId) => {
    setStudentData({
      ...studentData,
      approvedSubjects: [
        ...studentData.approvedSubjects,
        user.student.Applications.find((app) => app.applicationId === applicationId),
      ],
      openMentorApplications: studentData.openMentorApplications.filter(
        (app) => app.applicationId !== applicationId
      ),
    });

    approveMentorSubject(applicationId);
  };

  return studentData.loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="col-md card columnColor shadow mt-2 mb-2" id="colBackground">
      <div className="container ps-5 pe-5 pt-3">
        <table className="table table-borderless mt-2">
          <tbody>
            <tr id="borderless">
              <td style={{ width: '20%' }} className="fst-italic fw-bold fs-5" id="borderless">
                Name:
              </td>
              <td style={{ width: '80%' }} className="fs-5" id="borderless">
                {studentData.studentName}
              </td>
            </tr>
            <tr id="borderless">
              <td style={{ width: '20%' }} className="fst-italic fw-bold fs-5" id="borderless">
                Email:
              </td>
              <td style={{ width: '80%' }} className="fs-5" id="borderless">
                {studentData.studentEmail}
              </td>
            </tr>
            <tr id="borderless">
              <td style={{ width: '20%' }} className="fst-italic fw-bold fs-5" id="borderless">
                Course:
              </td>
              <td style={{ width: '80%' }} className="fs-5" id="borderless">
                {studentData.studentCourse}
              </td>
            </tr>
            {studentData.approvedSubjects.map((subject, index) => (
              <tr id="borderless">
                <td style={{ width: '20%' }} className="fst-italic fw-bold fs-5" id="borderless">
                  {index === 0 ? 'Approved Subjects:' : null}
                </td>
                <td style={{ width: '80%' }} className="fs-5" id="borderless">
                  {subject.Subject.subjectName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="list-group">
          <li className="list-group-item mt-4">
            <h3 className="text-center">Open Applications</h3>
            <ul className="list-group">
              <li className="list-group-item pt-4">
                <h4 className="text-center">Mentee</h4>
                {studentData.openMenteeApplications.length !== 0
                  ? studentData.openMenteeApplications.map((app) =>
                      app.hasOwnProperty('applicationId') ? (
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td className="fst-italic fs-5" style={{ width: '15%' }}>
                                Subject:
                              </td>
                              <td className="fs-5" style={{ width: '85%' }}>
                                {app.Subject.subjectName}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2">
                                <FaTrash
                                  onClick={(e) => onDelete(app.applicationId)}
                                  style={{
                                    cursor: 'pointer',
                                    float: 'right',
                                    color: 'red',
                                    marginRight: '10',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                                <Link to={`/group/add/${app.applicationId}`}>
                                  <MdOutlineGroupAdd
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
                  : null}
              </li>
              <li className="list-group-item pt-4">
                <h4 className="text-center">Mentorship</h4>
                {studentData.openMentorshipApplications.length !== 0
                  ? studentData.openMentorshipApplications.map((app) =>
                      app.hasOwnProperty('applicationId') ? (
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td className="fst-italic fs-5" style={{ width: '15%' }}>
                                Type:
                              </td>
                              <td className="fs-5" style={{ width: '85%' }}>
                                Application for Mentorship
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2">
                                <FaTrash
                                  onClick={(e) => onDelete(app.applicationId)}
                                  style={{
                                    cursor: 'pointer',
                                    float: 'right',
                                    color: 'red',
                                    marginRight: '10',
                                    transform: 'scale(1.5)',
                                  }}
                                />

                                <IoCheckmarkCircleOutline
                                  onClick={(e) => onApproveMentorship(app.applicationId)}
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'green',
                                    marginLeft: '20',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : null
                    )
                  : null}
              </li>
              <li className="list-group-item pt-4">
                <h4 className="text-center">Mentor Subjects</h4>
                {studentData.openMentorApplications.length !== 0
                  ? studentData.openMentorApplications.map((app) =>
                      app.hasOwnProperty('applicationId') ? (
                        <table className="table table-bordered">
                          <tbody>
                            <tr>
                              <td className="fst-italic fs-5" style={{ width: '15%' }}>
                                Subject:
                              </td>
                              <td className="fs-5" style={{ width: '85%' }}>
                                {app.Subject.subjectName}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2">
                                <FaTrash
                                  onClick={(e) => onDelete(app.applicationId)}
                                  style={{
                                    cursor: 'pointer',
                                    float: 'right',
                                    color: 'red',
                                    marginRight: '10',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                                <IoCheckmarkCircleOutline
                                  onClick={(e) => onApproveMentorSubject(app.applicationId)}
                                  style={{
                                    cursor: 'pointer',
                                    float: 'left',
                                    color: 'green',
                                    marginLeft: '20',
                                    transform: 'scale(1.5)',
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : null
                    )
                  : null}
              </li>
            </ul>
          </li>
        </ul>
        <ul className="list-group">
          <li className="list-group-item mt-4">
            <h3 className="text-center">Groups</h3>
            <ul className="list-group">
              <li className="list-group-item pt-4">
                <h4 className="text-center">Mentee</h4>
                {studentData.menteeGroups.map((group) => (
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td className="fst-italic fs-5" style={{ width: '15%' }}>
                          Subject:
                        </td>
                        <td className="fs-5" style={{ width: '85%' }}>
                          {group.Group.Subject.subjectName}
                        </td>
                      </tr>
                      <tr>
                        <td className="fst-italic fs-5" style={{ width: '15%' }}>
                          Teacher:
                        </td>
                        <td className="fs-5" style={{ width: '85%' }}>
                          {group.Group.Staff.staffName}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <Link to={`/group/${group.groupId}`}>
                            <MdOutlineManageSearch
                              // onClick={(e) => userProfile(e)}
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
              </li>
              <li className="list-group-item pt-4">
                <h4 className="text-center">Mentor</h4>
                {studentData.mentorGroups.map((group) => (
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td className="fst-italic fs-5" style={{ width: '15%' }}>
                          Subject:
                        </td>
                        <td className="fs-5" style={{ width: '85%' }}>
                          {group.Group.Subject.subjectName}
                        </td>
                      </tr>
                      <tr>
                        <td className="fst-italic fs-5" style={{ width: '15%' }}>
                          Teacher:
                        </td>
                        <td className="fs-5" style={{ width: '85%' }}>
                          {group.Group.Staff.staffName}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <Link to={`/group/${group.groupId}`}>
                            <MdOutlineManageSearch
                              // onClick={(e) => userProfile(e)}
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
              </li>
            </ul>
          </li>
        </ul>
        <br />
      </div>
    </div>
  );
};

// Create our propTypes
AdminStudentProfile.propTypes = {
  getStudentAdmin: PropTypes.func.isRequired,
  deleteApplication: PropTypes.func.isRequired,
  approveMentorship: PropTypes.func.isRequired,
  approveMentorSubject: PropTypes.func.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
});

export default connect(mapStateToProps, {
  getStudentAdmin,
  deleteApplication,
  approveMentorship,
  approveMentorSubject,
})(AdminStudentProfile);
