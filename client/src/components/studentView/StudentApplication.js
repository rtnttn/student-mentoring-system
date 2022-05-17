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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaClock } from 'react-icons/fa';
import { addApplication } from '../../actions/applicationActions';


const StudentApplications = ({ addApplication, loading, applications }) => {
  // subApplications is a filtered version of applications
  const [subApplications, setSubApplications] = useState({
    pendings: {
      count: -1,
    },
    useSubApplications: false,
  });

  // data for the submit form
  const [formData, setFormData] = useState({
    applyAs: '',
    subject: '',
  });
  const {applyAs, subject } = formData; // destructuring

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // adds applications 
  useEffect(() => {
    addApplication();
  }, [addApplication],);
  

  // Hidden List logic
  const [showPending, setShowPending] = useState(false);
  const onShowClickPending = (e) => {
    // console.log('onShowClickPending called');
    setShowPending(!showPending);
  };
  // End of Hidden list logic

  /* setSubApplications({
    pendings: {
      count: pendingsCount,
    },
    useSubApplications: true,
  }); */

  const onSubmit= async e =>{
    e.preventDefault();
    console.log("OnSubmit running...");

    if(applyAs === ''){
      setFormData({...formData, errors: {applyAs:'Apply as is required'}});
      return;
    }
    if(subject === ''){
      setFormData({...formData, errors: {subject:'Subject is required'}});
      return;
    }


    const newApplication = {
      applyAs,
      subject
    }
      console.log(newApplication);
      addApplication(newApplication);
      setSubApplications({...subApplications, pendings: {count: subApplications.pendings.count +1}});
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
        <div>
              <div className="col-sm-4">
                <label for="exampleInputEmail1" className="col-form-label">Apply As</label>
              </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="MentorMentee" id="mentor" value="applyAs"/>
              <label className="form-check-label" for="mentor">
                Mentor
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="MentorMentee" id="mentee" value="applyAs" checked/>
              <label className="form-check-label" for="mentee">
                Mentee
              </label>
            </div>
            </div>
            <div className="row g-2 mb-1">
              <div className="col-sm-4">
                <label for="exampleInputEmail1" className="col-form-label">Subject</label>
              </div>
              <div className="col-sm-8">
                <select className="form-select" aria-label="Default select example">
                  <option selected>Select Subject</option>
                  <option value="1">Networking</option>
                  <option value="2">Database</option>
                  <option value="3">OOP</option>
                  <option value="4">Intro to Java</option>
                </select>                
              </div>
            </div>
            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary justify-content-center">Submit</button>              
            </div>
      </form>
      {/* END Application FORM */}
      {/* APPLICATION COUNT */}
      <h5 className="align-self-center">
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <td>Pending:</td>
              {subApplications.useSubApplications ? (
                <td>{subApplications.pendings.count}</td>
              ) : (
                <td>{applications.pendings.count}</td>
              )} 
            </tr>
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
              <FaClock onClick={(e) => onShowClickPending(e)} style={{ cursor: 'pointer' }} />
            ) : (
              <FaClock onClick={(e) => onShowClickPending(e)} style={{ cursor: 'pointer' }} />
            )}
          </h5>
          {showPending ? (
            <ul className="list-group columnSubListColor">
              {subApplications.useSubApplications
                ? subApplications.pendings.rows.map((pending) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {pending.Student.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Subject:</td>
                          <td>{pending.Subject.subjectName}</td>
                        </tr>
                      </tbody>
                    </table>
                  ))
                : applications.pendings.rows.map((pendings) => (
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ width: '30%' }} className="fst-italic">
                            Name:
                          </td>
                          <td style={{ width: '70%' }} className="fw-bold">
                            {pendings.Student.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Subject:</td>
                          <td>{pendings.Subject.subjectName}</td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
            </ul>
          ) : null}
        </li>
        {/* END PENDING APPLICATIONS */}
      </ul>
    </div>
  );
};

StudentApplications.propTypes = {
  addApplication: PropTypes.func.isRequired,
//   getApplications: PropTypes.func.isRequired,
  applications: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  applications: state.application.applications,
  loading: state.application.loading,
});

export default connect(mapStateToProps,addApplication)(StudentApplications);
