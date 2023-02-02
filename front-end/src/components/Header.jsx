import React, { useContext } from 'react';
import TestContext from '../context/TestContext';
import contracts from '../data/contracts';

function Header() {
  const { cnpj } = useContext(TestContext);
  return (
    <div>
      { contracts.filter((element) => element.header.cnpj === cnpj.cnpj).map((contrato) => (
        <div key={contrato.id}>
          <span>
            <p>CNPJ:</p>
            { contrato.header.cnpj }
          </span>
          <br />
          <span>
            <p>Razão Social:</p>
            { contrato.header.razao_social }
          </span>
          <br />
          <span>
            <p>Nome Fantasia:</p>
            { contrato.header.nome_fantasia }
          </span>
        </div>
      )) }
    </div>
  );
}

export default Header;
