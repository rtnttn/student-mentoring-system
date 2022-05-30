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
import { FaSortDown, FaCaretUp, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { IoCheckmarkCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { MdOutlinePersonSearch, MdOutlineGroupAdd, MdOutlineManageSearch } from 'react-icons/md';
import { getStudentAdmin } from '../../actions/userActions';
import {
  deleteApplication,
  approveMentorship,
  approveMentorSubject,
} from '../../actions/applicationActions';
import {
  getAvailabilityForStudent,
  editAvailabilities,
  getTimeslots,
} from '../../actions/availabilityActions';

const AdminStudentProfile = ({
  user,
  availabilities,
  timeslots,
  getStudentAdmin,
  getAvailabilityForStudent,
  editAvailabilities,
  getTimeslots,
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
    availabilityCheckboxes: Array(21).fill(false),
    loading: true,
    availabilityLoading: true,
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    // console.log('1. Loading: ' + loading);
    // console.log('2. user:');
    // console.log(user);
    // console.log('1-2. Loading: ' + loading);
    getStudentAdmin(id);
    getAvailabilityForStudent(id);
    getTimeslots();
    console.log(studentData);
  }, [getStudentAdmin, getAvailabilityForStudent, getTimeslots, id]);

  useEffect(() => {
    // console.log('3. loading: ' + loading);
    // console.log('4. user:');
    console.log(user);
    if (user.hasOwnProperty('student')) {
      setStudentData({
        ...studentData,
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
    console.log(studentData);
  }, [user]);

  useEffect(() => {
    setStudentData({
      ...studentData,
      availabilityCheckboxes: studentData.availabilityCheckboxes.map((value, index) =>
        availabilities.find((availability) => availability.timeslotId === index + 1) ? true : value
      ),
      availabilityLoading: false,
    });
  }, [availabilities]);

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
    console.log(studentData);

    approveMentorSubject(applicationId);
  };

  const handleCheckbox = (e) => {
    setStudentData({
      ...studentData,
      availabilityCheckboxes: studentData.availabilityCheckboxes.map((value, index) =>
        parseInt(e.target.value, 10) === index ? !value : value
      ),
    });
    console.log(studentData);
    // console.log(e.target.value);
  };

  const changeAvailabilities = async () => {
    let newAvailabilities = studentData.availabilityCheckboxes.reduce(
      (out, bool, index) => (bool ? out.concat(index) : out),
      []
    );
    newAvailabilities.forEach((num, index) => {
      newAvailabilities[index] = num + 1;
    });
    const submitData = {
      timeslotIds: newAvailabilities,
      studentId: parseInt(id, 10),
    };
    // console.log(submitData);
    editAvailabilities(submitData);
    setShowConfirm(true);
  };

  return studentData.loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="col-md card columnColor shadow mt-2 mb-2" id="colBackground">
      <h3 className="text-center m-2 fw-bold">Student Details</h3>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h4 className="text-primary">
          <FaArrowLeft className="m-1" />
          Back
        </h4>
      </Link>
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

        <h3 className="text-center">Availabilities</h3>

        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col" className="text-center">
                Morning
              </th>
              <th scope="col" className="text-center">
                Afternoon
              </th>
              <th scope="col" className="text-center">
                Evening
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Monday</th>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="0"
                  checked={studentData.availabilityCheckboxes[0]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  checked={studentData.availabilityCheckboxes[1]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="2"
                  checked={studentData.availabilityCheckboxes[2]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Tuesday</th>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="3"
                  checked={studentData.availabilityCheckboxes[3]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="4"
                  checked={studentData.availabilityCheckboxes[4]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="5"
                  checked={studentData.availabilityCheckboxes[5]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Wednesday</th>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="6"
                  checked={studentData.availabilityCheckboxes[6]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="7"
                  checked={studentData.availabilityCheckboxes[7]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="8"
                  checked={studentData.availabilityCheckboxes[8]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Thursday</th>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="9"
                  checked={studentData.availabilityCheckboxes[9]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="10"
                  checked={studentData.availabilityCheckboxes[10]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="11"
                  checked={studentData.availabilityCheckboxes[11]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Friday</th>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="12"
                  checked={studentData.availabilityCheckboxes[12]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="13"
                  checked={studentData.availabilityCheckboxes[13]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="14"
                  checked={studentData.availabilityCheckboxes[14]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Saturday</th>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="15"
                  checked={studentData.availabilityCheckboxes[15]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="16"
                  checked={studentData.availabilityCheckboxes[16]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="17"
                  checked={studentData.availabilityCheckboxes[17]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
            </tr>
            <tr>
              <th scope="row">Sunday</th>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="18"
                  checked={studentData.availabilityCheckboxes[18]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="19"
                  checked={studentData.availabilityCheckboxes[19]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="20"
                  checked={studentData.availabilityCheckboxes[20]}
                  onChange={(e) => handleCheckbox(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {showConfirm ? (
          <div className="text-center mb-2">
            <h5 className="text-success">Availabilities Updated!</h5>
          </div>
        ) : null}

        <div className="text-center mb-2">
          <button
            onClick={changeAvailabilities}
            type="submit"
            className="btn btn-primary justify-content-center"
          >
            Confirm Availabilities
          </button>
        </div>

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
  getAvailabilityForStudent: PropTypes.func.isRequired,
  editAvailabilities: PropTypes.func.isRequired,
  getTimeslots: PropTypes.func.isRequired,
  user: PropTypes.object,
  availabilities: PropTypes.array,
  timeslots: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  availabilities: state.availability.availabilities,
  timeslots: state.availability.timeslots,
  loading: state.user.loading,
});

export default connect(mapStateToProps, {
  getStudentAdmin,
  deleteApplication,
  approveMentorship,
  approveMentorSubject,
  getAvailabilityForStudent,
  editAvailabilities,
  getTimeslots,
})(AdminStudentProfile);
