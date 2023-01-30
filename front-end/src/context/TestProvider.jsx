import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TestContext from './TestContext';

function TestProvider({ children }) {

 const contextValue = {
 }

  return (
    <TestContext.Provider value={ contextValue }>
    { children }
    </TestContext.Provider>
  );
}

TestContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TestProvider;