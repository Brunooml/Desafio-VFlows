import React, { useContext } from 'react';
import TestContext from '../context/TestContext';
import Header from '../components/Header';
import logo from '../data/logo.png'
import contracts from '../data/contracts';


function Contratos() {
  const { cnpj } = useContext(TestContext);

  return (
    <div>
      <img src={ logo } width="100"/>
      <h3>Pagamento de Fornecedor</h3>
      <Header />
      <h6>Contratos Vinculado</h6>
      <table>
      <thead>
            <tr>
                <th>Nome do Contrato</th>
                <th>Código do Contrato</th>
                <th>Retenção Técnica</th>
                <th>Detalhes</th>
            </tr>
            </thead>
            <tbody>
              {
                  contracts.filter((element) => element.header.cnpj == cnpj.cnpj).map((contrato, i) => (
                    <tr key={ i }>
                      <td>{contrato.lista_contratos.nome_contrato}</td>
                      <td>{contrato.lista_contratos.codigo_contrato}</td>
                      <td>{contrato.lista_contratos.percentual_retencao_tecnica}</td>
                    </tr>
                  ))
              }
            </tbody>
      </table>

      {console.log(contracts) }
      { console.log(cnpj)}
    </div>
  )
}

export default Contratos