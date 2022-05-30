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
import { FaSortDown, FaCaretUp, FaTrash, FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import { IoCheckmarkCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { MdOutlinePersonSearch, MdOutlineGroupAdd, MdOutlineManageSearch } from 'react-icons/md';
import { BsXLg, BsCheckLg } from 'react-icons/bs';
import { getGroupAdmin } from '../../actions/groupActions';

const AdminGroupProfile = ({ group, getGroupAdmin, loading }) => {
  const [groupData, setGroupData] = useState({
    staffName: '',
    subjectName: '',
    // students: [],
    mentors: [],
    mentees: [],
    uniqueAttendances: [],
    loading: true,
  });

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    // console.log('1. Loading: ' + loading);
    // console.log('2. user:');
    // console.log(user);
    // console.log('1-2. Loading: ' + loading);
    getGroupAdmin(id);
  }, [getGroupAdmin, id]);

  useEffect(() => {
    // console.log('3. loading: ' + loading);
    // console.log('4. user:');
    // console.log(user);

    if (group.hasOwnProperty('groupId')) {
      const uniqueDates = [];

      setGroupData({
        staffName: group.Staff.staffName,
        subjectName: group.Subject.subjectName,
        mentors: group.Members.filter((member) => member.isMentor)
          .sort((a, b) => {
            return a.studentId - b.studentId;
          })
          .map((student) => ({
            ...student,
            attendances: group.Attendances.filter(
              (attendanceItem) => attendanceItem.studentId === student.studentId
            ),
          })),
        mentees: group.Members.filter((member) => !member.isMentor)
          .sort((a, b) => {
            return a.studentId - b.studentId;
          })
          .map((student) => ({
            ...student,
            attendances: group.Attendances.filter(
              (attendanceItem) => attendanceItem.studentId === student.studentId
            ),
          })),
        uniqueAttendances: group.Attendances.filter((date) => {
          if (uniqueDates.includes(date.date)) {
            return null;
          }
          uniqueDates.push(date.date);
          return date.date;
        }).sort((a, b) => {
          return a.date - b.date;
        }),
        loading: false,
      });

      console.log('groupData');
      console.log(groupData);
    }
  }, [group]);

  useEffect(() => {
    console.log('groupData');
    console.log(groupData);
  }, [groupData]);

  console.log(groupData);

  // Email
  let addresses = '';
  let mentorNames = '';
  // const emailString = '';
  const { mentors, mentees, subjectName } = groupData;

  for (let i = 0; i < mentors.length; i += 1) {
    let mentorEmail = mentors[i].Student.studentEmail;
    addresses += mentorEmail;
    addresses += ';';
    mentorNames += mentors[i].Student.studentName;
    if (i !== mentors.length - 1) {
      mentorNames += ', ';
    }
  }
  for (let i = 0; i < mentees.length; i += 1) {
    let email = mentees[i].Student.studentEmail;
    addresses += email;
    if (i !== mentees.length - 1) {
      addresses += ';';
    }
  }
  const emailString = `mailto:${addresses}?subject=SMS - ${subjectName} with ${mentorNames}`;

  return groupData.loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="col-md card columnColor shadow mt-2 mb-2" id="colBackground">
      <h3 className="text-center m-2 fw-bold">Group Details</h3>
      <h3 className="text-center">
        <a href={emailString}>
          <FaEnvelope title="Email group" style={{ 'text-decoration': 'none' }} />
        </a>
      </h3>
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
                Subject:
              </td>
              <td style={{ width: '5%' }} id="borderless"></td>
              <td style={{ width: '75%' }} className="fs-5" id="borderless">
                {groupData.subjectName}
              </td>
            </tr>
            <tr id="borderless">
              <td style={{ width: '20%' }} className="fst-italic fw-bold fs-5" id="borderless">
                Teacher:
              </td>
              <td style={{ width: '5%' }} id="borderless"></td>
              <td style={{ width: '75%' }} className="fs-5" id="borderless">
                {groupData.staffName}
              </td>
            </tr>
            {groupData.mentors.map((mentor, index) => (
              <tr id="borderless">
                <td style={{ width: '20%' }} className="fst-italic fw-bold fs-5" id="borderless">
                  {index === 0 ? 'Mentor/s:' : null}
                </td>
                <td className="text-center" style={{ width: '5%' }} id="borderless">
                  <Link to={`/student/${mentor.studentId}`}>
                    <MdOutlinePersonSearch
                      title="Student Details"
                      style={{
                        cursor: 'pointer',
                        color: 'blue',
                        transform: 'scale(1.5)',
                      }}
                    />
                  </Link>
                </td>
                <td style={{ width: '75%' }} className="fs-5" id="borderless">
                  {mentor.Student.studentName}
                </td>
              </tr>
            ))}
            {groupData.mentees.map((mentee, index) => (
              <tr id="borderless">
                <td style={{ width: '20%' }} className="fst-italic fw-bold fs-5" id="borderless">
                  {index === 0 ? 'Mentee/s:' : null}
                </td>
                <td className="text-center" style={{ width: '5%' }} id="borderless">
                  <Link to={`/student/${mentee.studentId}`}>
                    <MdOutlinePersonSearch
                      title="Student Details"
                      style={{
                        cursor: 'pointer',
                        color: 'blue',
                        transform: 'scale(1.5)',
                      }}
                    />
                  </Link>
                </td>
                <td style={{ width: '75%' }} className="fs-5" id="borderless">
                  {mentee.Student.studentName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <h3 className="text-center">Sessions</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              {groupData.mentors.map((student) => (
                <th scope="col" className="text-center">
                  {student.Student.studentName}
                </th>
              ))}
              {groupData.mentees.map((student) => (
                <th scope="col" className="text-center">
                  {student.Student.studentName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupData.uniqueAttendances.map((date, index) => (
              <tr>
                <th scope="row">{date.date}</th>
                {groupData.mentors.map((mentor, i) => (
                  <td className="text-center">
                    {mentor.attendances.find(
                      (element) => element.date === date.date && element.confirmed
                    ) ? (
                      <BsCheckLg
                        title="Attendance Confirmed"
                        style={{
                          color: 'green',
                          transform: 'scale(1.6)',
                        }}
                      />
                    ) : (
                      <BsXLg
                        title="Attendance Not Confirmed"
                        style={{
                          color: 'red',
                          transform: 'scale(1.6)',
                        }}
                      />
                    )}
                  </td>
                ))}
                {groupData.mentees.map((mentee, i) => (
                  <td className="text-center">
                    {mentee.attendances.find(
                      (element) => element.date === date.date && element.confirmed
                    ) ? (
                      <BsCheckLg
                        title="Attendance Confirmed"
                        style={{
                          color: 'green',
                          transform: 'scale(1.6)',
                        }}
                      />
                    ) : (
                      <BsXLg
                        title="Attendance Not Confirmed"
                        style={{
                          color: 'red',
                          transform: 'scale(1.6)',
                        }}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
};

// Create our propTypes
AdminGroupProfile.propTypes = {
  getGroupAdmin: PropTypes.func.isRequired,
  group: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  group: state.group.group,
  loading: state.group.loading,
});

export default connect(mapStateToProps, { getGroupAdmin })(AdminGroupProfile);
