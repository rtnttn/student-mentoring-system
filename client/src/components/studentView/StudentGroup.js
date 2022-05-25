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
import { FaSortDown, FaCaretUp } from 'react-icons/fa';
import { getStudentInfo } from '../../actions/studentActions';




const StudentApplications = ({ getStudentInfo, loading, student }) => {
  // subApplications is a filtered version of applications

  const { id } = useParams();


  // adds applications 
  useEffect(() => {
    getStudentInfo(id);
  }, [ getStudentInfo ],);
  

  // Hidden List logic
  const [showGroup, setShowGroup] = useState(false);
  const onShowClickGroup = (e) => {
    // console.log('onShowClickPending called');
    setShowGroup(!showGroup);
  };
  

  const onSubmit= async e =>{
    e.preventDefault();
    console.log("OnSubmit running...");
  }

  // return loading while gathering application list
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      {/* <div className="col-md card m-1 columnColor"> */}
      <h3 className="text-center mt-2">Groups</h3>

      {/* APPLICATION COUNT */}
      <h5 className="align-self-center">
        <table style={{ margin: 'auto' }}>
          <tbody>
            <tr>
              <td>Groups:</td>
                <td>{student.student.Applications.filter(application => application.isApproved).length }</td>
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
            Groups
            {showGroup ? (
              <FaCaretUp onClick={(e) => onShowClickGroup(e)} style={{ cursor: 'pointer' }} />
            ) : (
              <FaSortDown onClick={(e) => onShowClickGroup(e)} style={{ cursor: 'pointer' }} />
            )}
          </h5>
          {showGroup ? (
            <ul className="list-group columnSubListColor">
              {student.student.Applications.filter(application => application.isApproved).map((groups) => (
                    <table className="table table-bordered">
                      <tbody>
                      <tr>
                          <td className="fst-italic">Role:</td>
                          <td style={{ width: '75%' }}>{groups.forMentor ? 'Mentor' : 'Mentee'}</td>
                        </tr>
                        <tr>
                          <td className="fst-italic">Subject:</td>
                          <td style={{ width: '75%' }}>{groups.Subject.subjectName}</td>
                        </tr>
                      </tbody>
                    </table>
                  )
                  )}  {student.student.Members.map ((member) =>  member.isMentor ?(
                    <tr>
                      <td className="fst-italic">Mentee:</td>
                      <td>{member.Sub}</td>
                    </tr>
                  ) : null )
                  
                  } 
                  
            </ul>
          ) : null}
        </li>
      </ul>
    </div>
  );
};

StudentApplications.propTypes = {
  getStudentInfo: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student.student,
  loading: state.student.loading,
});

export default connect(mapStateToProps,{ getStudentInfo})(StudentApplications);
