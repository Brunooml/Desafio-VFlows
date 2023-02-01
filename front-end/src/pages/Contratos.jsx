import React, { useContext } from 'react';
import TestContext from '../context/TestContext';


function Contratos() {
  const { cnpj } = useContext(TestContext);

  return (
    <div>
      <h1>Contratos</h1>
      <span> { cnpj.cnpj } </span>
    </div>
  )
}

export default Contratos