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

const Dashboard = () => {
  return (
    // Columns content
    <div className="container">
      <div className="row">
        {/* Col 1 */}
        <div className="col-md card m-1 columnColor">
          <DashboardApplications />
        </div>

        {/* Col 2 */}
        <div className="col-md card m-1 columnColor">
          <DashboardUsers />
        </div>

        {/* Col 3 */}
        <div className="col-md card m-1 columnColor"></div>
      </div>
    </div>
  );
};

export default Dashboard;
