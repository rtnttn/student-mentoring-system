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
// show approved mentor subjects
// add mentor/mentee groups
// add logic for max groups
// add logic for subjects (for mentors)

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaSortDown, FaCaretUp } from 'react-icons/fa';
import { MdOutlinePersonSearch } from 'react-icons/md';
import { getUsers } from '../../actions/userActions';

const DashboardUsers = ({ getUsers, loading, users }) => {
  // subUsers is a filtered version of users
  const [subUsers, setSubUsers] = useState({
    mentees: {
      count: -1,
      rows: [],
    },
    mentors: {
      count: -1,
      rows: [],
    },
    staff: {
      count: -1,
      rows: [],
    },
    useSubUsers: false,
  });

  // data for the search form
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    groups: '',
  });
  const { name, course, groups } = formData; // destructuring

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // gets users when component is called
  useEffect(() => {
    getUsers();
  }, [getUsers]);

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

  const [showStaffInfo, setShowStaffInfo] = useState(false);
  const onShowClickStaff = (e) => {
    // console.log('onShowClickMentor called');
    setShowStaffInfo(!showStaffInfo);
  };
  // End of Hidden list logic

  // onSubmit for the search function
  const onSubmit = async (e) => {
    e.preventDefault();

    // console.log('subUsers: ');

    const menteesFiltered = await users.mentees.rows.filter(
      (mentee) =>
        mentee.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentee.courseName.toLowerCase().includes(course.toLowerCase()) &&
        mentee.Members.length <= groups
    );
    // console.log(menteesFiltered);
    const menteesCount = menteesFiltered.length;
    // console.log(menteesCount);

    const mentorsFiltered = await users.mentors.rows.filter(
      (mentor) =>
        mentor.studentName.toLowerCase().includes(name.toLowerCase()) &&
        mentor.courseName.toLowerCase().includes(course.toLowerCase()) &&
        mentor.Members.length <= groups
    );
    // console.log(mentorsFiltered);
    const mentorsCount = await mentorsFiltered.length;
    // console.log(mentorsCount);

    const staffFiltered = await users.staff.rows.filter((staff) =>
      staff.staffName.toLowerCase().includes(name.toLowerCase())
    );
    // console.log(menteesFiltered);
    const staffCount = await staffFiltered.length;
    // console.log(menteesCount);

    await setSubUsers({
      mentees: {
        count: menteesCount,
        rows: menteesFiltered,
      },
      mentors: {
        count: mentorsCount,
        rows: mentorsFiltered,
      },
      staff: {
        count: staffCount,
        rows: staffFiltered,
      },
      useSubUsers: true,
    });
  }; // End of onSubmit

  // return loading while gathering users list
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {/* <div className="col-md card m-1 columnColor"> */}
      <h3 className="text-center mt-2">Users</h3>
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
              Course
            </label>
          </div>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Course Name"
              name="course"
              value={course}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
        <div className="row g-2 mb-1">
          <div className="col-sm-4">
            <label htmlFor="exampleInputEmail1" className="col-form-label">
              Max Groups
            </label>
          </div>
          <div className="col-sm-8">
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Max number of active groups"
              name="groups"
              value={groups}
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
      {/* USERS COUNT */}
      <h5 className="align-self-center">
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <td>Mentee:</td>
              {subUsers.useSubUsers ? (
                <td>{subUsers.mentees.count}</td>
              ) : (
                <td>{users.mentees.count}</td>
              )}
            </tr>
            <tr>
              <td>Mentor:</td>
              {subUsers.useSubUsers ? (
                <td>{subUsers.mentors.count}</td>
              ) : (
                <td>{users.mentors.count}</td>
              )}
            </tr>
            <tr>
              <td>Staff:</td>
              {subUsers.useSubUsers ? (
                <td>{subUsers.staff.count}</td>
              ) : (
                <td>{users.staff.count}</td>
              )}
            </tr>
          </tbody>
        </table>
      </h5>
      {/* END USERS COUNT */}
      {/* USER CONTENT */}
      {/* MENTEE USERS */}
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
              {subUsers.useSubUsers
                ? subUsers.mentees.rows.map((mentee) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {mentee.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Email:</td>
                          <td>{mentee.studentEmail}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Course:</td>
                          <td>{mentee.courseName}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Mentee Groups:</td>
                          <td>{mentee.Members.filter((m) => m.isMentor === false).length}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))
                : users.mentees.rows.map((mentee) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {mentee.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Email:</td>
                          <td>{mentee.studentEmail}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Course:</td>
                          <td>{mentee.courseName}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Mentee Groups:</td>
                          <td>{mentee.Members.filter((m) => m.isMentor === false).length}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
        {/* END MENTEE USERS */}
        {/* MENTOR USERS */}
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
              {subUsers.useSubUsers
                ? subUsers.mentors.rows.map((mentor) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {mentor.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Email:</td>
                          <td>{mentor.studentEmail}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Course:</td>
                          <td>{mentor.courseName}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Mentee Groups:</td>
                          <td>{mentor.Members.filter((m) => m.isMentor === false).length}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Mentor Groups:</td>
                          <td>{mentor.Members.filter((m) => m.isMentor === true).length}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))
                : users.mentors.rows.map((mentor) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {mentor.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Email:</td>
                          <td>{mentor.studentEmail}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Course:</td>
                          <td>{mentor.courseName}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Mentee Groups:</td>
                          <td>{mentor.Members.filter((m) => m.isMentor === false).length}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Mentor Groups:</td>
                          <td>{mentor.Members.filter((m) => m.isMentor === true).length}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
        {/* END OF MENTOR USERS */}
        {/* STAFF USERS */}
        <li className="list-group-item">
          <h5 className="text-center">
            Staff
            {showStaffInfo ? (
              <FaCaretUp onClick={(e) => onShowClickStaff(e)} style={{ cursor: 'pointer' }} />
            ) : (
              <FaSortDown onClick={(e) => onShowClickStaff(e)} style={{ cursor: 'pointer' }} />
            )}
          </h5>
          {showStaffInfo ? (
            <ul className="list-group columnSubListColor">
              {subUsers.useSubUsers
                ? subUsers.staff.rows.map((staff) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {staff.staffName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Email:</td>
                          <td>{staff.staffEmail}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))
                : users.staff.rows.map((staff) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {staff.staffName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Email:</td>
                          <td>{staff.staffEmail}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
        {/* END OF STAFF USERS */}
      </ul>
    </div>
  );
};

DashboardUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  loading: state.user.loading,
});

export default connect(mapStateToProps, { getUsers })(DashboardUsers);
