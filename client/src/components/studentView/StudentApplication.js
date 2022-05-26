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
/* eslint-disable no-debugger, no-console */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaRegClock, FaRegCheckCircle } from 'react-icons/fa';
import { addApplicationByStudent } from '../../actions/applicationActions';
import { getStudentInfo } from '../../actions/studentActions';
import {getSubject} from '../../actions/subjectActions';




const StudentApplications = ({ addApplicationByStudent, getStudentInfo, getSubject,loading, student }) => {
  // subApplications is a filtered version of applications
  const { id } = useParams();

  
const subjectNameOptions = subjects.subjectName.filter(application)

  // data for the dropdown list 
  const [dropdown, setDropdown] = useState({subject: ''})
  const {subject} = dropdown;
  const listHandleChange = (e) => {
    setDropdown(e.target.value);
  };
  // stores current selection
  const [forMentor, setForMentor] = useState()
  // handles selection change
  const handleChange = e => {
    const {target} = e;
    if (target.checked) {
      setForMentor(target.value);
    }
  }

  // adds applications 
  useEffect(() => {
    getStudentInfo(id);
  }, [ getStudentInfo]);
  
  useEffect(() => {
    addApplicationByStudent(id);
  },[addApplicationByStudent]);

  // Hidden List logic
  const [showPending, setShowPending] = useState(false);
  const onShowClickPending = (e) => {
    // console.log('onShowClickPending called');
    setShowPending(!showPending);
  };

  const [showApproved, setShowApproved] = useState(false);
  const onShowClickApproved = (e) => {
    // console.log('onShowClickPending called');
    setShowApproved(!showApproved);
  };
  

  const onSubmit= async (e) =>{
    e.preventDefault();
    console.log("OnSubmit running...");

    if(forMentor === ''){
      // setRadio({...radio, errors: {applyAs:'Apply as is required'}});
      return;
    }
    if(subject === ''){
      setDropdown({...dropdown, errors: {subject:'Subject is required'}});
      return;
    }


    const newApplication = {
      forMentor,
      subject
    }
      console.log(newApplication);
      addApplicationByStudent(newApplication);
  }

  // return loading while gathering application list
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {/* <div className="col-md card m-1 columnColor"> */}
      <h3 className="text-center mt-2">Applications</h3>
      {/* Submit FORM */}
      
      <form onSubmit={(e) => onSubmit(e)}>
        <div >
              <div className="col-sm-4">
                <label htmlFor="exampleInputEmail1" className="col-form-label">Apply As</label>
              </div>
            <div className="form-check">
              <input 
              className="form-check-input" 
              type="radio" 
              name="MentorMentee" 
              id="mentor" 
              value="mentor"
              checked={forMentor === 'mentor'} 
              onChange={handleChange} />
              <label className="form-check-label" htmlFor="mentor">
                Mentor
              </label>
            </div>
            <div className="form-check">
              <input 
              className="form-check-input" 
              type="radio" 
              name="MentorMentee" 
              id="mentee" 
              value="mentee"
              checked={forMentor === 'mentee'} 
              onChange={handleChange} />
              <label className="form-check-label" htmlFor="mentee">
                Mentee
              </label>
            </div>
            </div>
            <div className="row g-2 mb-1">
              <div className="col-sm-4">
                <label htmlFor="exampleInputEmail1" className="col-form-label">Subject</label>
              </div>
              <div className="col-sm-8">
                <select className="form-select" aria-label="Default select example" value={dropdown} onChange={listHandleChange} >
                  {subjectNameOptions.map((option) => (
                  <option value={option.dropdown}>Select Subject</option>
                    ))}
                  {/* <option >Select Subject</option>
                  <option value="networking">Networking</option>
                  <option value="database">Database</option>
                  <option value="oop">OOP</option>
                  <option value="java">Intro to Java</option> */}
                </select>                
              </div>
            </div>
            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary justify-content-center">Submit</button>              
            </div>
      </form>
      {/* END Application FORM */}
      {/* APPLICATION COUNT */}
      <br></br>
      <h5 className="align-self-center">
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <td>Pending:</td>
               
                <td>{student.student.Applications.filter(application => !application.isApproved).length}</td>
            </tr>
            {student.student.Applications.filter(application => application.isApproved).length === 0 ? null : 
            <tr> 
            <td>Approved:</td>
              <td >{student.student.Applications.filter(application => application.isApproved).length}</td>
          </tr> }
            
          </tbody>
        </table>
      </h5>
      {/* END APPLICATION COUNT */}
      {/* APPLICATION CONTENT */}
      {/* PENDING APPLICATIONS */}
      <ul className="list-group">
        <li className="list-group-item">
          <h5 className="text-center">
            Pending
            {showPending ? (
              <FaRegClock onClick={(e) => onShowClickPending(e)} style={{ cursor: 'pointer' }} />
            ) : (
              <FaRegClock onClick={(e) => onShowClickPending(e)} style={{ cursor: 'pointer' }} />
            )}
          </h5>
          {showPending ? (
            <ul className="list-group columnSubListColor">
              {student.student.Applications.filter(application => !application.isApproved).map((pendings) => (
                    <table className="table table-bordered">
                      <tbody>
                      <tr>
                          <td className="fst-italic">Type:</td>
                          <td style={{ width: '75%' }}>{pendings.forMentor ? 'Mentor' : 'Mentee'}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Subject:</td>
                          <td style={{ width: '75%' }}>{pendings.Subject.subjectName}</td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
        {student.student.Applications.filter(application => application.isApproved).length === 0 ? null : 
        <li className="list-group-item">
          <h5 className="text-center">
            Approved
            {showApproved ? (
              <FaRegCheckCircle onClick={(e) => onShowClickApproved(e)} style={{ cursor: 'pointer' }} />
            ) : (
              <FaRegCheckCircle onClick={(e) => onShowClickApproved(e)} style={{ cursor: 'pointer' }} />
            )}
          </h5>
          {showApproved ? (
            <ul className="list-group columnSubListColor">
              {student.student.Applications.filter(application => application.isApproved).map((pendings) => (
                    <table className="table table-bordered">
                      <tbody>
                      <tr>
                          <td className="fst-italic">Type:</td>
                          <td style={{ width: '75%' }} >{pendings.forMentor ? 'Mentor' : 'Mentee'}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Subject:</td>
                          <td style={{ width: '75%' }}>{pendings.Subject.subjectName}</td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>}
        {/* END PENDING APPLICATIONS */}
      </ul>
    </div>
  );
};

StudentApplications.propTypes = {
  addApplicationByStudent: PropTypes.func.isRequired,
  getStudentInfo: PropTypes.func.isRequired,
  getSubject: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student.student,
  loading: state.student.loading,
});

export default connect(mapStateToProps,{addApplicationByStudent, getStudentInfo, getSubject})(StudentApplications);
