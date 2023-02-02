/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TestContext from './TestContext';

function TestProvider({ children }) {
  const [cnpj, setCnpj] = useState('');
  const [check, setCheck] = useState('');
  const [errorContratos, setErrorContratos] = useState('');

  const contextValue = {
    cnpj,
    setCnpj,
    check,
    setCheck,
    errorContratos,
    setErrorContratos,
  };

  return (
    <TestContext.Provider value={contextValue}>
      { children }
    </TestContext.Provider>
  );
}

TestProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TestProvider;
