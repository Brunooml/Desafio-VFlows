import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TestContext from '../context/TestContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../data/logo.png';
import contracts from '../data/contracts';
import Table from '../styles/tableStyle';

function Contratos() {
  const {
    cnpj,
    check,
    setCheck,
    errorContratos,
    setErrorContratos,
    setContratosCnpj,
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
    return (history.push('/notas'), setContratosCnpj(contratos), setErrorContratos(''));
  };

  return (
    <div className="bg-lime-50 min-h-screen flex items-center justify-center">
      <div className="border-solid border border-lime-200 bg-white rounded-sm">
        <nav className="flex p-4 items-center space-x-44 m-1">
          <img src={logo} alt="logo" className="w-24 h-10" />
          <p className="text-3xl">Pagamento de Fornecedor</p>
        </nav>
        <Header />
        <section className="border-solid border border-lime-200 flex items-center justify-center m-1 p-1">
          <p>Contratos Vinculados</p>
        </section>
        <main className="m-1">
          <Table className="w-full">
            <thead>
              <tr>
                <th>Nome do Contrato</th>
                <th>Código do Contrato</th>
                <th>Retenção Técnica</th>
              </tr>
            </thead>
            <tbody>
              { contratos.map((contrato) => (
                <tr key={contrato.id}>
                  <td>
                    <input className="m-1 mr-5" type="checkbox" name={contrato.id} onClick={(e) => handleClick(e)} />
                    {contrato.nome_contrato}
                  </td>
                  <td className="pl-6">{contrato.codigo_contrato}</td>
                  <td className=" flex w-20 bg-blue-500 pl-10 pr-9 justify-center ml-8 text-white">{contrato.percentual_retencao_tecnica}</td>
                </tr>
              ))}
            </tbody>
            <button type="submit" onClick={handleSubmitPrev}>Anterior</button>
            <button type="submit" onClick={handleSubmitNext}>Próximo</button>
          </Table>
          { errorContratos && <span className="text-red-500">{ errorContratos }</span>}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Contratos;
