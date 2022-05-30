/* eslint-disable object-shorthand */
/* eslint-disable no-useless-return */
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
import { useParams, Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FaSortDown, FaCaretUp, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { IoCheckmarkCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { MdOutlinePersonSearch, MdOutlineGroupAdd, MdOutlineManageSearch } from 'react-icons/md';
import { BsXLg, BsCheckLg, BsCloudLightning } from 'react-icons/bs';
import { getGroupForAdd, addGroup, addMenteeToGroup } from '../../actions/groupActions';

const AdminGroupProfile = ({ infoForAdd, getGroupForAdd, addMenteeToGroup, addGroup, loading }) => {
  const navigate = useNavigate();

  const [selectData, setSelectData] = useState({
    subjectId: '',
    subjectName: '',
    staff: [],
    menteeApplications: [],
    mentorApplications: [],
    loading: true,
  });

  const [formData, setFormData] = useState({
    supervisorId: 0,
    mentorId: 0,
    mentees: { menteeId1: 0, menteeId2: 0, menteeId3: 0, menteeId4: 0, menteeId5: 0 },
    errors: {},
  });
  const { supervisorId, mentorId, mentees, errors } = formData;

  const { id } = useParams();

  useEffect(() => {
    // console.log('1. Loading: ' + loading);
    // console.log('2. user:');
    // console.log(user);
    // console.log('1-2. Loading: ' + loading);
    getGroupForAdd();
  }, [getGroupForAdd, id]);

  useEffect(() => {
    // console.log('3. loading: ' + loading);
    // console.log('4. user:');
    // console.log(user);

    if (infoForAdd.hasOwnProperty('applications')) {
      setSelectData({
        subjectId: infoForAdd.applications.find(
          (application) => application.applicationId === parseInt(id, 10)
        ).Subject.subjectId,
        subjectName: infoForAdd.applications.find(
          (application) => application.applicationId === parseInt(id, 10)
        ).Subject.subjectName,
        staff: infoForAdd.staff,
        menteeApplications: infoForAdd.applications.filter(
          (application) =>
            !application.forMentor &&
            application.subjectId ===
              infoForAdd.applications.find(
                (application) => application.applicationId === parseInt(id, 10)
              ).Subject.subjectId
        ),
        mentorApplications: infoForAdd.applications.filter(
          (application) =>
            application.forMentor &&
            application.isApproved &&
            application.subjectId ===
              infoForAdd.applications.find(
                (application) => application.applicationId === parseInt(id, 10)
              ).Subject.subjectId
        ),
        loading: false,
      });
      setFormData({
        ...formData,
        mentees: {
          ...mentees,
          menteeId1: parseInt(
            infoForAdd.applications.find(
              (application) => application.applicationId === parseInt(id, 10)
            ).studentId,
            10
          ),
        },
      });
    }
  }, [infoForAdd]);

  // console.log(mentorId !== 0);

  const onSubmit = async (e) => {
    // console.log(formData);
    // This wil prevent the browser from refreshing the page.
    e.preventDefault();
    // Test function call.
    // console.log('OnSubmit running...');

    let menteesFiltered = [
      mentees.menteeId1,
      mentees.menteeId2,
      mentees.menteeId3,
      mentees.menteeId4,
      mentees.menteeId5,
    ];

    // console.log(menteesFiltered);
    menteesFiltered = menteesFiltered.filter((id) => id !== 0);

    // console.log(menteesFiltered);
    // console.log(new Set(menteesFiltered).size);
    // console.log(menteesFiltered.length);

    if (supervisorId === 0) {
      setFormData({ ...formData, errors: { supervisorId: 'Teacher is Required' } });
      return; // stop the onSumbit running.
    }
    if (mentorId === 0) {
      setFormData({ ...formData, errors: { mentorId: 'Mentor is Required' } });
      return; // stop the onSumbit running.
    }
    if (menteesFiltered.length === 0) {
      setFormData({ ...formData, errors: { mentees: 'Mentee is Required' } });
      return;
    }
    if (new Set(menteesFiltered).size !== menteesFiltered.length) {
      setFormData({ ...formData, errors: { mentees: 'No Duplicate Mentees' } });
      return;
    }

    menteesFiltered = menteesFiltered.map((mentee) => ({
      studentId: mentee,
      isMentor: false,
    }));

    // console.log(menteesFiltered);

    const newGroup = {
      group: {
        supervisorId: supervisorId,
        subjectId: selectData.subjectId,
      },
      students: [
        ...menteesFiltered,
        {
          studentId: mentorId,
          isMentor: true,
        },
      ],
    };
    // console.log('newGroup');
    // console.log(newGroup);

    addGroup(newGroup);
    navigate('/');
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value, 10) });
    // console.log(formData);
  };

  const onMenteeChange = (e) => {
    setFormData({
      ...formData,
      mentees: {
        ...mentees,
        [e.target.name]: parseInt(e.target.value, 10),
      },
    });
    // console.log(formData);
  };

  const onGroupSubmit = async (groupId) => {
    // console.log('onGroupSubmit');
    // console.log(groupId);

    const newMember = {
      students: [
        {
          studentId: parseInt(
            selectData.menteeApplications.find(
              (application) => application.applicationId === parseInt(id, 10)
            ).studentId,
            10
          ),
          isMentor: false,
        },
      ],
    };

    // console.log(newMember);

    addMenteeToGroup(newMember, groupId);
    navigate('/');
  };

  // console.log(selectData.mentorApplications.find((mentor) => mentor.studentId === mentorId));

  return selectData.loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="col-md card columnColor shadow mt-2 mb-2" id="colBackground">
      <h3 className="text-center m-2 fw-bold">Fill Application</h3>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h4 className="text-primary">
          <FaArrowLeft className="m-1" />
          Back
        </h4>
      </Link>
      <div className="container ps-5 pe-5 pt-3">
        <h4 className="fw-bold">Subject: {selectData.subjectName}</h4>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label className="fs-4 fw-bold mt-3" htmlFor="exampleFormControlSelect1">
              Teacher
            </label>
            <select
              className={classnames('form-select', { 'is-invalid': errors.supervisorId })}
              id="exampleFormControlSelect1"
              name="supervisorId"
              onChange={(e) => onChange(e)}
            >
              <option defaultValue={0} value={0}>
                [Select Teacher]
              </option>
              {selectData.staff.map((teacher) => (
                <option value={parseInt(teacher.staffId, 10)}>{teacher.staffName}</option>
              ))}
            </select>
            {errors.supervisorId && <div className="invalid-feedback">{errors.supervisorId}</div>}
          </div>
          <div className="form-group">
            <label className="fs-4 fw-bold mt-3" htmlFor="exampleFormControlSelect1">
              Mentor
            </label>

            <select
              className={classnames('form-select', { 'is-invalid': errors.mentorId })}
              id="exampleFormControlSelect1"
              name="mentorId"
              onChange={(e) => onChange(e)}
            >
              <option defaultValue={0} value={0}>
                [Select Mentor]
              </option>
              {selectData.mentorApplications.map((mentor) => (
                <option value={parseInt(mentor.studentId, 10)}>{mentor.Student.studentName}</option>
              ))}
            </select>
            {errors.mentorId && <div className="invalid-feedback">{errors.mentorId}</div>}
          </div>
          {mentorId !== 0 ? (
            <table className="table table-bordered table-striped mt-1">
              <tbody>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentee Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.mentorApplications
                        .find((mentor) => mentor.studentId === mentorId)
                        .Student.Members.filter((m) => m.isMentor === false).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentor Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.mentorApplications
                        .find((mentor) => mentor.studentId === mentorId)
                        .Student.Members.filter((m) => m.isMentor === true).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Availability:
                  </td>
                  <td style={{ width: '80%' }}>
                    {selectData.mentorApplications
                      .find((mentor) => mentor.studentId === mentorId)
                      .Student.Availabilities.map((time) => time.Timeslot.timeslotName + ', ')}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to={`/student/${mentorId}`}>
                      <MdOutlinePersonSearch
                        // onClick={(e) => userProfile(e)}
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
          ) : null}

          <div className="form-group">
            <label className="fs-4 fw-bold mt-3" htmlFor="exampleFormControlSelect1">
              Mentees - Select up to 5
            </label>
            <select
              className={classnames('form-select', { 'is-invalid': errors.mentees })}
              id="exampleFormControlSelect1"
              name="menteeId1"
              onChange={(e) => onMenteeChange(e)}
            >
              {selectData.menteeApplications.map((mentee, index) =>
                index === 0 ? (
                  <option
                    defaultValue={parseInt(
                      selectData.menteeApplications.find(
                        (application) => application.applicationId === parseInt(id, 10)
                      ).studentId,
                      10
                    )}
                    value={parseInt(
                      selectData.menteeApplications.find(
                        (application) => application.applicationId === parseInt(id, 10)
                      ).studentId,
                      10
                    )}
                  >
                    {
                      selectData.menteeApplications.find(
                        (application) => application.applicationId === parseInt(id, 10)
                      ).Student.studentName
                    }
                  </option>
                ) : (
                  <option value={parseInt(mentee.studentId, 10)}>
                    {mentee.Student.studentName}
                  </option>
                )
              )}
            </select>
          </div>

          {mentees.menteeId1 !== 0 ? (
            <table className="table table-bordered table-striped mt-1">
              <tbody>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentee Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId1)
                        .Student.Members.filter((m) => m.isMentor === false).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentor Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId1)
                        .Student.Members.filter((m) => m.isMentor === true).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Availability:
                  </td>
                  <td style={{ width: '80%' }}>
                    {selectData.menteeApplications
                      .find((mentee) => mentee.studentId === mentees.menteeId1)
                      .Student.Availabilities.map((time) => time.Timeslot.timeslotName + ', ')}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to={`/student/${mentees.menteeId1}`}>
                      <MdOutlinePersonSearch
                        // onClick={(e) => userProfile(e)}
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
          ) : null}

          <div className="form-group mt-1">
            <select
              className={classnames('form-select', { 'is-invalid': errors.mentees })}
              id="exampleFormControlSelect1"
              name="menteeId2"
              onChange={(e) => onMenteeChange(e)}
            >
              <option defaultValue={0} value={0}>
                [Select Mentee]
              </option>
              {selectData.menteeApplications.map((mentee, index) => (
                <option value={parseInt(mentee.studentId, 10)}>{mentee.Student.studentName}</option>
              ))}
            </select>
          </div>

          {mentees.menteeId2 !== 0 ? (
            <table className="table table-bordered table-striped mt-1">
              <tbody>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentee Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId2)
                        .Student.Members.filter((m) => m.isMentor === false).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentor Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId2)
                        .Student.Members.filter((m) => m.isMentor === true).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Availability:
                  </td>
                  <td style={{ width: '80%' }}>
                    {selectData.menteeApplications
                      .find((mentee) => mentee.studentId === mentees.menteeId2)
                      .Student.Availabilities.map((time) => time.Timeslot.timeslotName + ', ')}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to={`/student/${mentees.menteeId2}`}>
                      <MdOutlinePersonSearch
                        // onClick={(e) => userProfile(e)}
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
          ) : null}

          <div className="form-group mt-1">
            <select
              className={classnames('form-select', { 'is-invalid': errors.mentees })}
              id="exampleFormControlSelect1"
              name="menteeId3"
              onChange={(e) => onMenteeChange(e)}
            >
              <option defaultValue={0} value={0}>
                [Select Mentee]
              </option>
              {selectData.menteeApplications.map((mentee, index) => (
                <option value={parseInt(mentee.studentId, 10)}>{mentee.Student.studentName}</option>
              ))}
            </select>
          </div>

          {mentees.menteeId3 !== 0 ? (
            <table className="table table-bordered table-striped mt-1">
              <tbody>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentee Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId3)
                        .Student.Members.filter((m) => m.isMentor === false).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentor Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId3)
                        .Student.Members.filter((m) => m.isMentor === true).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Availability:
                  </td>
                  <td style={{ width: '80%' }}>
                    {selectData.menteeApplications
                      .find((mentee) => mentee.studentId === mentees.menteeId3)
                      .Student.Availabilities.map((time) => time.Timeslot.timeslotName + ', ')}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to={`/student/${mentees.menteeId3}`}>
                      <MdOutlinePersonSearch
                        // onClick={(e) => userProfile(e)}
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
          ) : null}

          <div className="form-group mt-1">
            <select
              className={classnames('form-select', { 'is-invalid': errors.mentees })}
              id="exampleFormControlSelect1"
              name="menteeId4"
              onChange={(e) => onMenteeChange(e)}
            >
              <option defaultValue={0} value={0}>
                [Select Mentee]
              </option>
              {selectData.menteeApplications.map((mentee, index) => (
                <option value={parseInt(mentee.studentId, 10)}>{mentee.Student.studentName}</option>
              ))}
            </select>
          </div>

          {mentees.menteeId4 !== 0 ? (
            <table className="table table-bordered table-striped mt-1">
              <tbody>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentee Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId4)
                        .Student.Members.filter((m) => m.isMentor === false).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentor Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId4)
                        .Student.Members.filter((m) => m.isMentor === true).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Availability:
                  </td>
                  <td style={{ width: '80%' }}>
                    {selectData.menteeApplications
                      .find((mentee) => mentee.studentId === mentees.menteeId4)
                      .Student.Availabilities.map((time) => time.Timeslot.timeslotName + ', ')}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to={`/student/${mentees.menteeId4}`}>
                      <MdOutlinePersonSearch
                        // onClick={(e) => userProfile(e)}
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
          ) : null}

          <div className="form-group mt-1">
            <select
              className={classnames('form-select', { 'is-invalid': errors.mentees })}
              id="exampleFormControlSelect1"
              name="menteeId5"
              onChange={(e) => onMenteeChange(e)}
            >
              <option defaultValue={0} value={0}>
                [Select Mentee]
              </option>
              {selectData.menteeApplications.map((mentee, index) => (
                <option value={parseInt(mentee.studentId, 10)}>{mentee.Student.studentName}</option>
              ))}
            </select>
            {errors.mentees && <div className="invalid-feedback">{errors.mentees}</div>}
          </div>

          {mentees.menteeId5 !== 0 ? (
            <table className="table table-bordered table-striped mt-1">
              <tbody>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentee Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId5)
                        .Student.Members.filter((m) => m.isMentor === false).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Mentor Groups:
                  </td>
                  <td style={{ width: '80%' }}>
                    {
                      selectData.menteeApplications
                        .find((mentee) => mentee.studentId === mentees.menteeId5)
                        .Student.Members.filter((m) => m.isMentor === true).length
                    }
                  </td>
                </tr>
                <tr>
                  <td className="fst-italic fw-bold" style={{ width: '20%' }}>
                    Availability:
                  </td>
                  <td style={{ width: '80%' }}>
                    {selectData.menteeApplications
                      .find((mentee) => mentee.studentId === mentees.menteeId5)
                      .Student.Availabilities.map((time) => time.Timeslot.timeslotName + ', ')}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to={`/student/${mentees.menteeId5}`}>
                      <MdOutlinePersonSearch
                        // onClick={(e) => userProfile(e)}
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
          ) : null}

          <div className="text-center mb-2 mt-2">
            <button type="submit" className="btn btn-primary justify-content-center">
              Create Group
            </button>
          </div>
        </form>

        <br />

        <ul className="list-group">
          <li className="list-group-item mt-4">
            <h3 className="text-center">
              Or Add &quot;
              {
                selectData.menteeApplications.find(
                  (application) => application.applicationId === parseInt(id, 10)
                ).Student.studentName
              }
              &quot; to an Existing Group
            </h3>
            <ul className="list-group">
              <li className="list-group-item pt-4">
                <h4 className="text-center">{selectData.subjectName} Groups:</h4>
                {infoForAdd.group
                  .filter((group) => group.subjectId === selectData.subjectId)
                  .map((group) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td className="fst-italic fs-5" style={{ width: '15%' }}>
                            Teacher:
                          </td>
                          <td className="fs-5" style={{ width: '85%' }}>
                            {group.Staff.staffName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic fs-5" style={{ width: '15%' }}>
                            Mentor:
                          </td>
                          <td className="fs-5" style={{ width: '85%' }}>
                            {group.Members.find((student) => student.isMentor).Student.studentName}
                          </td>
                        </tr>
                        {group.Members.map((student) =>
                          student.isMentor ? null : (
                            <tr>
                              <td className="fst-italic fs-5" style={{ width: '15%' }}>
                                Mentee:
                              </td>
                              <td className="fs-5" style={{ width: '85%' }}>
                                {student.Student.studentName}
                              </td>
                            </tr>
                          )
                        )}
                        {group.Members.map((student, index) => (
                          <tr>
                            <td className="fst-italic fs-5" style={{ width: '15%' }}>
                              {student.Student.studentName} availabilities
                            </td>
                            <td className="fs-5" style={{ width: '85%' }}>
                              {student.Student.Availabilities.map(
                                (time) => time.Timeslot.timeslotName + ', '
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="fst-italic fs-5" style={{ width: '15%' }}>
                            Meetings:
                          </td>
                          <td className="fs-5" style={{ width: '85%' }}>
                            {infoForAdd.sessionCount[0].find(
                              (count) => count.groupId === group.groupId
                            )
                              ? infoForAdd.sessionCount[0].find(
                                  (count) => count.groupId === group.groupId
                                ).sessionCount
                              : 0}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic fs-5" style={{ width: '15%' }}>
                            Last Met:
                          </td>
                          <td className="fs-5" style={{ width: '85%' }}>
                            {infoForAdd.lastMet[0].find((date) => date.groupId === group.groupId)
                              ? infoForAdd.lastMet[0].find((date) => date.groupId === group.groupId)
                                  .date
                              : 'No Meetings Yet'}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="2">
                            <div className="text-center mb-2 mt-2">
                              <button
                                // value={group.groupId}
                                type="submit"
                                onClick={(e) => onGroupSubmit(group.groupId)}
                                className="btn btn-primary justify-content-center"
                              >
                                Add to Group
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Create our propTypes
AdminGroupProfile.propTypes = {
  getGroupForAdd: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  addMenteeToGroup: PropTypes.func.isRequired,
  infoForAdd: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  infoForAdd: state.group.infoForAdd,
  loading: state.group.loading,
});

export default connect(mapStateToProps, { getGroupForAdd, addGroup, addMenteeToGroup })(
  AdminGroupProfile
);
