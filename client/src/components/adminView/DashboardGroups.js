/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-fragments */
/* eslint-disable radix */
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

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    nonPerforming: false,
  });
  const { name, subject, teacher, nonPerforming } = formData; // destructuring

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const oncCheckboxClick = (e) => {
    setFormData({
      ...formData,
      nonPerforming: !nonPerforming,
    });
  };

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
    // console.log(formData);

    // console.log('subGroups: ');

    const groupsFiltered = groups.groups.filter(
      (group) =>
        group.Members.filter((m) =>
          m.Student.studentName.toLowerCase().includes(name.toLowerCase())
        ).length > 0 &&
        group.Subject.subjectName.toLowerCase().includes(subject.toLowerCase()) &&
        group.Staff.staffName.toLowerCase().includes(teacher.toLowerCase()) &&
        (nonPerforming
          ? groups.lastMet[0].find((element) => element.groupId === group.groupId)
            ? (new Date() -
                new Date(
                  groups.lastMet[0].find((element) => element.groupId === group.groupId).date
                )) /
                (1000 * 60 * 60 * 24 * 7) >
              2
            : false
          : true)
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

  // console.log(new Date() - new Date('2001-01-05'));

  // return loading while gathering application list
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {/* <div className="col-md card m-1 columnColor"> */}
      <h3 className="text-center mt-2">Groups</h3>
      <div className="text-center mb-2">
        <Link to="/subjects">
          <button type="submit" className="btn btn-primary justify-content-center me-1">
            Manage Subjects
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
        <div className="row g-2 mb-1">
          <div className="col-sm-4">
            <label htmlFor="exampleInputEmail1" className="col-form-label">
              Overdue Meeting
            </label>
          </div>
          <div className="col-sm-1">
            <input
              type="checkbox"
              className="form-check-input pt-1"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ verticalAlign: 'middle', position: 'relative' }}
              onChange={(e) => oncCheckboxClick(e)}
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
                        {groups.firstMet[0].find((element) => element.groupId === group.groupId) ? (
                          <Fragment>
                            <tr>
                              <td className="fst-italic">Age:</td>
                              <td>
                                {parseInt(
                                  (new Date() -
                                    new Date(
                                      groups.firstMet[0].find(
                                        (element) => element.groupId === group.groupId
                                      ).date
                                    )) /
                                    (1000 * 60 * 60 * 24 * 7),
                                  10
                                ) + ' Weeks'}
                              </td>
                            </tr>
                            <tr>
                              <td className="fst-italic">Sessions:</td>
                              <td>
                                {
                                  groups.sessionCount[0].find(
                                    (element) => element.groupId === group.groupId
                                  ).sessionCount
                                }
                              </td>
                            </tr>
                            <tr>
                              <td className="fst-italic">Sessions/Week:</td>
                              <td>
                                <div className="progress">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width:
                                        (parseInt(
                                          (new Date() -
                                            new Date(
                                              groups.firstMet[0].find(
                                                (element) => element.groupId === group.groupId
                                              ).date
                                            )) /
                                            (1000 * 60 * 60 * 24 * 7)
                                        ) === 0
                                          ? 0
                                          : (groups.sessionCount[0].find(
                                              (element) => element.groupId === group.groupId
                                            ).sessionCount /
                                              parseInt(
                                                (new Date() -
                                                  new Date(
                                                    groups.firstMet[0].find(
                                                      (element) => element.groupId === group.groupId
                                                    ).date
                                                  )) /
                                                  (1000 * 60 * 60 * 24 * 7)
                                              )) *
                                            100) + '%',
                                    }}
                                  >
                                    {parseInt(
                                      (new Date() -
                                        new Date(
                                          groups.firstMet[0].find(
                                            (element) => element.groupId === group.groupId
                                          ).date
                                        )) /
                                        (1000 * 60 * 60 * 24 * 7)
                                    ) === 0
                                      ? 'New Group'
                                      : (
                                          groups.sessionCount[0].find(
                                            (element) => element.groupId === group.groupId
                                          ).sessionCount /
                                          parseInt(
                                            (new Date() -
                                              new Date(
                                                groups.firstMet[0].find(
                                                  (element) => element.groupId === group.groupId
                                                ).date
                                              )) /
                                              (1000 * 60 * 60 * 24 * 7)
                                          )
                                        ).toFixed(2)}
                                  </div>
                                  <div
                                    className="progress-bar bg-transparent text-black"
                                    role="progressbar"
                                    style={{
                                      width:
                                        parseInt(
                                          (new Date() -
                                            new Date(
                                              groups.firstMet[0].find(
                                                (element) => element.groupId === group.groupId
                                              ).date
                                            )) /
                                            (1000 * 60 * 60 * 24 * 7)
                                        ) === 0
                                          ? 100
                                          : Math.max(
                                              0,
                                              100 -
                                                (groups.sessionCount[0].find(
                                                  (element) => element.groupId === group.groupId
                                                ).sessionCount /
                                                  parseInt(
                                                    (new Date() -
                                                      new Date(
                                                        groups.firstMet[0].find(
                                                          (element) =>
                                                            element.groupId === group.groupId
                                                        ).date
                                                      )) /
                                                      (1000 * 60 * 60 * 24 * 7)
                                                  )) *
                                                  100
                                            ) + '%',
                                    }}
                                  >
                                    {(groups.sessionCount[0].find(
                                      (element) => element.groupId === group.groupId
                                    ).sessionCount /
                                      parseInt(
                                        (new Date() -
                                          new Date(
                                            groups.firstMet[0].find(
                                              (element) => element.groupId === group.groupId
                                            ).date
                                          )) /
                                          (1000 * 60 * 60 * 24 * 7)
                                      )) *
                                      100 >
                                    0
                                      ? ''
                                      : '0'}
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="fst-italic">Last Met:</td>
                              <td
                                style={{
                                  color:
                                    (new Date() -
                                      new Date(
                                        groups.lastMet[0].find(
                                          (element) => element.groupId === group.groupId
                                        ).date
                                      )) /
                                      (1000 * 60 * 60 * 24 * 7) >
                                    2
                                      ? 'red'
                                      : 'black',
                                }}
                              >
                                {
                                  groups.lastMet[0].find(
                                    (element) => element.groupId === group.groupId
                                  ).date
                                }
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2">
                                <Link to={`/group/${group.groupId}`}>
                                  <MdOutlineManageSearch
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
                            </tr>{' '}
                          </Fragment>
                        ) : (
                          <tr>
                            <td className="fst-italic">Sessions:</td>
                            <td>No Meetings Yet</td>
                          </tr>
                        )}
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
                        {groups.firstMet[0].find((element) => element.groupId === group.groupId) ? (
                          <Fragment>
                            <tr>
                              <td className="fst-italic">Age:</td>
                              <td>
                                {parseInt(
                                  (new Date() -
                                    new Date(
                                      groups.firstMet[0].find(
                                        (element) => element.groupId === group.groupId
                                      ).date
                                    )) /
                                    (1000 * 60 * 60 * 24 * 7),
                                  10
                                ) + ' Weeks'}
                              </td>
                            </tr>
                            <tr>
                              <td className="fst-italic">Sessions:</td>
                              <td>
                                {
                                  groups.sessionCount[0].find(
                                    (element) => element.groupId === group.groupId
                                  ).sessionCount
                                }
                              </td>
                            </tr>
                            <tr>
                              <td className="fst-italic">Sessions/Week:</td>
                              <td>
                                <div className="progress">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width:
                                        (parseInt(
                                          (new Date() -
                                            new Date(
                                              groups.firstMet[0].find(
                                                (element) => element.groupId === group.groupId
                                              ).date
                                            )) /
                                            (1000 * 60 * 60 * 24 * 7)
                                        ) === 0
                                          ? 0
                                          : (groups.sessionCount[0].find(
                                              (element) => element.groupId === group.groupId
                                            ).sessionCount /
                                              parseInt(
                                                (new Date() -
                                                  new Date(
                                                    groups.firstMet[0].find(
                                                      (element) => element.groupId === group.groupId
                                                    ).date
                                                  )) /
                                                  (1000 * 60 * 60 * 24 * 7)
                                              )) *
                                            100) + '%',
                                    }}
                                  >
                                    {parseInt(
                                      (new Date() -
                                        new Date(
                                          groups.firstMet[0].find(
                                            (element) => element.groupId === group.groupId
                                          ).date
                                        )) /
                                        (1000 * 60 * 60 * 24 * 7)
                                    ) === 0
                                      ? 'New Group'
                                      : (
                                          groups.sessionCount[0].find(
                                            (element) => element.groupId === group.groupId
                                          ).sessionCount /
                                          parseInt(
                                            (new Date() -
                                              new Date(
                                                groups.firstMet[0].find(
                                                  (element) => element.groupId === group.groupId
                                                ).date
                                              )) /
                                              (1000 * 60 * 60 * 24 * 7)
                                          )
                                        ).toFixed(2)}
                                  </div>
                                  <div
                                    className="progress-bar bg-transparent text-black"
                                    role="progressbar"
                                    style={{
                                      width:
                                        parseInt(
                                          (new Date() -
                                            new Date(
                                              groups.firstMet[0].find(
                                                (element) => element.groupId === group.groupId
                                              ).date
                                            )) /
                                            (1000 * 60 * 60 * 24 * 7)
                                        ) === 0
                                          ? 100
                                          : Math.max(
                                              0,
                                              100 -
                                                (groups.sessionCount[0].find(
                                                  (element) => element.groupId === group.groupId
                                                ).sessionCount /
                                                  parseInt(
                                                    (new Date() -
                                                      new Date(
                                                        groups.firstMet[0].find(
                                                          (element) =>
                                                            element.groupId === group.groupId
                                                        ).date
                                                      )) /
                                                      (1000 * 60 * 60 * 24 * 7)
                                                  )) *
                                                  100
                                            ) + '%',
                                    }}
                                  >
                                    {(groups.sessionCount[0].find(
                                      (element) => element.groupId === group.groupId
                                    ).sessionCount /
                                      parseInt(
                                        (new Date() -
                                          new Date(
                                            groups.firstMet[0].find(
                                              (element) => element.groupId === group.groupId
                                            ).date
                                          )) /
                                          (1000 * 60 * 60 * 24 * 7)
                                      )) *
                                      100 >
                                    0
                                      ? ''
                                      : '0'}
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="fst-italic">Last Met:</td>
                              <td
                                style={{
                                  color:
                                    (new Date() -
                                      new Date(
                                        groups.lastMet[0].find(
                                          (element) => element.groupId === group.groupId
                                        ).date
                                      )) /
                                      (1000 * 60 * 60 * 24 * 7) >
                                    2
                                      ? 'red'
                                      : 'black',
                                }}
                              >
                                {
                                  groups.lastMet[0].find(
                                    (element) => element.groupId === group.groupId
                                  ).date
                                }
                              </td>
                            </tr>
                          </Fragment>
                        ) : (
                          <tr>
                            <td className="fst-italic">Sessions:</td>
                            <td>No Meetings Yet</td>
                          </tr>
                        )}
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
