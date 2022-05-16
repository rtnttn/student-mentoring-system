/* eslint-disable no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
// Proptypes is used heavily within redux.
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashboardApplications from './DashboardApplications';
import DashboardUsers from './DashboardUsers';
import DashboardGroups from './DashboardGroups';
import { userDefault } from '../../actions/userActions';

import '../../styles.css';

const Dashboard = ({ userDefault }) => {
  // useEffect(() => {
  //   window.addEventListener('movemouse', () => {});
  //   console.log('mount function');

  //   return () => { // returned function will be called on component unmount
  //     window.removeEventListener('movemouse', () => {});
  //     console.log('unmount function');
  //     userDefault();
  //   };
  // }, []);

  return (
    // Columns content
    <div className="container">
      <div className="row">
        {/* Col 1 */}
        <div className="col-md card mt-2 me-2 columnColor shadow" id="colBackground">
          <DashboardApplications />
          <br />
        </div>

        {/* Col 2 */}
        <div className="col-md card mt-2 ms-1 me-1 columnColor shadow" id="colBackground">
          <DashboardUsers />
          <br />
        </div>

        {/* Col 3 */}
        <div className="col-md card mt-2 ms-2 columnColor shadow" id="colBackground">
          <DashboardGroups />
          <br />
        </div>
      </div>
    </div>
  );
};

// Create our propTypes
Dashboard.propTypes = {
  userDefault: PropTypes.func.isRequired,
};

export default connect(null, { userDefault })(Dashboard);
