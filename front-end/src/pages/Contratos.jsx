/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TestContext from '../context/TestContext';
import Header from '../components/Header';
import logo from '../data/logo.png';
import contracts from '../data/contracts';

function Contratos() {
  const {
    cnpj,
    check,
    setCheck,
    errorContratos,
    setErrorContratos,
  } = useContext(TestContext);
  const history = useHistory();

  const getUserContracts = (data) => (contracts
    .find((contract) => contract.header.cnpj === data.cnpj).lista_contratos);

  const contratos = getUserContracts(cnpj);

  const handleClick = (e) => {
    if (e.target.checked) {
      setCheck((prevState) => [...prevState, e.target.name]);
    } else {
      setCheck((prevState) => [...prevState.filter((item) => item !== e.target.name)]);
    }
  };

  const handleSubmitPrev = () => [setCheck(''), setErrorContratos(''), history.push('/')];

  const handleSubmitNext = () => {
    if (check.length > 1) {
      return setErrorContratos('Somente um Contrato deverá ser selecionado');
    }
    if (check.length === 0) {
      return setErrorContratos('Ao menos um Contrato deverá ser selecionado');
    }
    return (history.push('/notas'));
  };

  return (
    <div>
      <img src={logo} width="100" alt="logo" />
      <h3>Pagamento de Fornecedor</h3>
      <Header />
      <h6>Contratos Vinculado</h6>
      <table>
        <thead>
          <tr>
            <th>{}</th>
            <th>Nome do Contrato</th>
            <th>Código do Contrato</th>
            <th>Retenção Técnica</th>
            <th>Detalhes</th>
            <th>{}</th>
          </tr>
        </thead>
        <tbody>
          { contratos.map((contrato) => (
            <tr key={contrato.id}>
              <td><input type="checkbox" name={contrato.id} onClick={(e) => handleClick(e)} /></td>
              <td>{contrato.nome_contrato}</td>
              <td>{contrato.codigo_contrato}</td>
              <td>{contrato.percentual_retencao_tecnica}</td>
              <td><button type="submit">Q</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit" onClick={handleSubmitPrev}>Anterior</button>
      <button type="submit" onClick={handleSubmitNext}>Próximo</button>

      { errorContratos && <span>{ errorContratos }</span>}

    </div>
  );
}

export default Contratos;
