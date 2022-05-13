/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';
// Proptypes is used heavily within redux.
import PropTypes from 'prop-types';

import DashboardApplications from './DashboardApplications';
import DashboardUsers from './DashboardUsers';

import '../../styles.css';

const Dashboard = () => {
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
        <div className="col-md card mt-2 ms-2 columnColor shadow" id="colBackground"></div>
      </div>
    </div>
  );
};

export default Dashboard;
