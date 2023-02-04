/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TestContext from './TestContext';

function TestProvider({ children }) {
  const [cnpj, setCnpj] = useState('');
  const [check, setCheck] = useState('');
  const [errorContratos, setErrorContratos] = useState('');
  const [contratosCnpj, setContratosCnpj] = useState('');
  const [checkboxRetencaoImpostos, setCheckboxRetencaoImpostos] = useState(false);
  const [checkboxRetencaoTecnica, setCheckboxRetencaoTecnica] = useState(false);
  const [dataRetencaoValor, setDataRetencaoValor] = useState('');
  const [files, setFiles] = useState('');

  const contextValue = {
    cnpj,
    setCnpj,
    check,
    setCheck,
    errorContratos,
    setErrorContratos,
    contratosCnpj,
    setContratosCnpj,
    checkboxRetencaoImpostos,
    setCheckboxRetencaoImpostos,
    checkboxRetencaoTecnica,
    setCheckboxRetencaoTecnica,
    dataRetencaoValor,
    setDataRetencaoValor,
    files,
    setFiles,
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
