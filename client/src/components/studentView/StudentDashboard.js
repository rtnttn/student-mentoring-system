/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import PropTypes from 'prop-types';
import React  from 'react';
import { connect } from 'react-redux';
import StudentApplication from './StudentApplication';
import StudentGroup from './StudentGroup';

import '../../styles.css';


 const StudentDashboard = () => {
    return (
        // columns 
        <div className="container">
          <div className="row">
            {/* Column 1 */}
            <div className="col-md card m-1 columnColor shadow"  id="colBackground">
              <StudentApplication />
            </div>
    
            {/* Column 2 */}
            <div className="col-md card m-1 columnColor shadow"  id="colBackground">
              <StudentGroup />
            </div>
          </div>
        </div>
      );
};

StudentDashboard.defaultProps = {};

StudentDashboard.propTypes = {};

export default connect(null, {})(StudentDashboard);