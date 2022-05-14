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

// TODO LIST
// onclick for inspect user

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaSortDown, FaCaretUp } from 'react-icons/fa';
import { MdOutlineManageSearch } from 'react-icons/md';
import { getGroups } from '../../actions/groupActions';

import '../../styles.css';

const DashboardGroups = ({ getGroups, loading, groups }) => {
  // subGroups is a filtered version of Groups
  const [subGroups, setSubGroups] = useState({
    groups: [],
    groupCount: -1,
    useSubGroups: false,
  });

  // data for the search form
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    teacher: '',
  });
  const { name, subject, teacher } = formData; // destructuring

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // gets Groups when component is called
  useEffect(() => {
    getGroups();
  }, [getGroups]);

  // Hidden List logic
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const onShowClickGroup = (e) => {
    // console.log('onShowClickMentee called');
    setShowGroupInfo(!showGroupInfo);
  };
  // End of Hidden list logic

  // onSubmit for the search function
  const onSubmit = async (e) => {
    e.preventDefault();

    // console.log('subGroups: ');

    const groupsFiltered = groups.groups.filter(
      (group) =>
        group.Members.filter((m) =>
          m.Student.studentName.toLowerCase().includes(name.toLowerCase())
        ).length > 0 &&
        group.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        group.Staff.staffName.toLowerCase().includes(teacher.toLowerCase())
    );
    // console.log(groupsFiltered);

    const groupsCount = groupsFiltered.length;
    // console.log(groupsCount);

    // const groupsFiltered = groups.groups;
    // const groupsCount = groupsFiltered.length;

    // console.log('GroupsFiltered');
    // console.log(groupsFiltered);

    setSubGroups({
      groups: groupsFiltered,
      groupCount: groupsCount,
      useSubGroups: true,
    });
    // console.log(subGroups);
  }; // End of onSubmit

  // return loading while gathering application list
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {/* <div className="col-md card m-1 columnColor"> */}
      <h3 className="text-center mt-2">Groups</h3>
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
        <div className="row g-2 mb-1">
          <div className="col-sm-4">
            <label htmlFor="exampleInputEmail1" className="col-form-label">
              Teacher
            </label>
          </div>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Teacher Name"
              name="teacher"
              value={teacher}
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
      {/* GROUP COUNT */}
      <h5 className="align-self-center">
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <td>Groups:</td>
              {subGroups.useSubGroups ? (
                <td>{subGroups.groupCount}</td>
              ) : (
                <td>{groups.groupCount}</td>
              )}
            </tr>
          </tbody>
        </table>
      </h5>
      {/* END GROUP COUNT */}
      {/* GROUP CONTENT */}
      <ul className="list-group">
        <li className="list-group-item">
          <h5 className="text-center">
            Groups
            {showGroupInfo ? (
              <FaCaretUp onClick={(e) => onShowClickGroup(e)} style={{ cursor: 'pointer' }} />
            ) : (
              <FaSortDown onClick={(e) => onShowClickGroup(e)} style={{ cursor: 'pointer' }} />
            )}
          </h5>
          {showGroupInfo ? (
            <ul className="list-group columnSubListColor">
              {subGroups.useSubGroups
                ? subGroups.groups.map((group) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Subject:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {group.Subject.subjectName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Teacher:</td>
                          <td>{group.Staff.staffName}</td>
                        </tr>
                        {group.Members.map((member) =>
                          member.isMentor ? (
                            <tr>
                              <td className="fst-italic">Mentor:</td>
                              <td>{member.Student.studentName}</td>
                            </tr>
                          ) : null
                        )}
                        {group.Members.map((member) =>
                          !member.isMentor ? (
                            <tr>
                              <td className="fst-italic">Mentee:</td>
                              <td>{member.Student.studentName}</td>
                            </tr>
                          ) : null
                        )}
                        <tr>
                          <td colSpan="2">
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))
                : groups.groups.map((group) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Subject:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {group.Subject.subjectName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Teacher:</td>
                          <td>{group.Staff.staffName}</td>
                        </tr>
                        {group.Members.map((member) =>
                          member.isMentor ? (
                            <tr>
                              <td className="fst-italic">Mentor:</td>
                              <td>{member.Student.studentName}</td>
                            </tr>
                          ) : null
                        )}
                        {group.Members.map((member) =>
                          !member.isMentor ? (
                            <tr>
                              <td className="fst-italic">Mentee:</td>
                              <td>{member.Student.studentName}</td>
                            </tr>
                          ) : null
                        )}
                        <tr>
                          <td colSpan="2">
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
        {/* END GROUP CONTENT */}
      </ul>
    </div>
  );
};

DashboardGroups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  groups: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  groups: state.group.groups,
  loading: state.group.loading,
});

export default connect(mapStateToProps, { getGroups })(DashboardGroups);
