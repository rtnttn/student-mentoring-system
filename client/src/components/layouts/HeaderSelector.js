/* eslint-disable no-else-return */
/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Header from './Header';
import StaffHeader from './StaffHeader';
import StudentHeader from './StudentHeader';
import PubHeader from './PubHeader';

const HeaderSelector = ({ auth }) => {
  const { isAuthStudent } = auth;
  const { isAuthStaff } = auth;

  if (isAuthStaff === true) {
    return (
      <div className="container">
        <StaffHeader />
      </div>
    );
  } else if (isAuthStudent === true) {
    return (
      <div className="container">
        <StudentHeader />
      </div>
    );
  } else {
    return <PubHeader />;
  }
};

HeaderSelector.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(HeaderSelector);
