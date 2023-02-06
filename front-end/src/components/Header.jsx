import React, { useContext } from 'react';
import TestContext from '../context/TestContext';
import contracts from '../data/contracts';

function Header() {
  const { cnpj } = useContext(TestContext);
  return (
    <header className="border-solid border border-lime-200 h-10 m-1 px-2 py-1 ">
      { contracts.filter((element) => element.header.cnpj === cnpj.cnpj).map((contrato) => (
        <div className="flex space-x-10" key={contrato.id}>
          <span>
            <p className="font-semibold">Razão Social:</p>
            <p className="italic">{ contrato.header.razao_social }</p>
          </span>
          <span>
            <p className="font-semibold">Nome Fantasia:</p>
            <p className="italic">{ contrato.header.nome_fantasia }</p>
          </span>
          <span>
            <p className="font-semibold">CNPJ:</p>
            <p className="italic">{ contrato.header.cnpj }</p>
          </span>
        </div>
      )) }
    </header>
  );
}

export default Header;
