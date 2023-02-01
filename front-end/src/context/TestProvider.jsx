import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TestContext from './TestContext';

function TestProvider({ children }) {
  const [ cnpj, setCnpj ]= useState('');

 const contextValue = {
  cnpj, 
  setCnpj
 }

  return (
    <TestContext.Provider value={ contextValue }>
    { children }
    </TestContext.Provider>
  );
}

TestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TestProvider;