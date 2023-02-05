/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useContext } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../data/logo.png';
import TestContext from '../context/TestContext';
import Input from '../Form/input';
import Checkbox from '../Form/checkbox';

function Notas() {
  const {
    setCnpj, check, setCheck, setContratosCnpj,
    contratosCnpj, checkboxRetencaoImpostos, setCheckboxRetencaoImpostos,
    checkboxRetencaoTecnica,
    setCheckboxRetencaoTecnica,
    dataRetencaoValor,
    setDataRetencaoValor,
    files,
    setFiles,
  } = useContext(TestContext);
  const formRef = useRef(null);
  const checkId = check[0];
  const history = useHistory();

  const contrato = contratosCnpj.find((e) => e.id === checkId);

  const maskNumbers = (e) => {
    const data = e.target.value;
    let newData = data.replace(/,/g, '.');
    if (!/^[\d@#$%^&*(),.?":{}|<>]+$/.test(newData)) {
      newData = newData.replace(/[^\d]+/g, '');
    } if (!/^\d+(\.\d{0,2})?$/.test(newData)) {
      newData = newData.replace(/^(\d+\.\d{0,2}).*/, '$1');
    } newData = newData.replace(/\./g, ',');
    e.target.value = newData;
  };

  const retencaoClickImpostos = () => setCheckboxRetencaoImpostos(!checkboxRetencaoImpostos);

  const retencaoClickTecnica = () => setCheckboxRetencaoTecnica(!checkboxRetencaoTecnica);

  const handleSubmitPrev = () => (history.push('/contratos'), setCheck(''), setFiles(''));

  let decimal = '';

  const retencaoValor = (data) => {
    const newData = data.replace(/,/g, '.');
    decimal = parseFloat(contrato.percentual_retencao_tecnica) / 100;
    decimal *= newData;
    decimal = decimal.toString();
    decimal = decimal.replace(/\./g, ',');
    return setDataRetencaoValor(decimal);
  };

  const handleBlur = (data) => {
    retencaoValor(data.nativeEvent.target.value);
  };

  const sendData = (data) => {
    console.log(data);
    alert('Solicitação 999999 foi enviada com sucesso.');
    return (history.push('/'), setCheck(''), setCnpj(''), setContratosCnpj(''), setDataRetencaoValor(''), setFiles(''));
  };

  const handleSubmit = (ref) => {
    const transformedObj = {};

    Object.keys(ref).forEach((key) => {
      const newKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_').toLowerCase();
      transformedObj[newKey] = ref[key];
    });

    if (!(transformedObj.numero_da_nota)) {
      return formRef.current.setFieldError('Número da Nota', 'Número da Nota Obrigatório');
    }

    if (!(transformedObj.data_de_emissao)) {
      return formRef.current.setFieldError('Data de Emissão', 'Data de Emissão Obrigatório');
    }

    if (!(transformedObj.data_de_vencimento)) {
      return formRef.current.setFieldError('Data de Vencimento', 'Data de Vencimento Obrigatório');
    }

    if (!(transformedObj.valor) || Number(transformedObj.valor < 1)) {
      return formRef.current.setFieldError('Valor', 'Valor Obrigatório');
    }

    if (transformedObj.issqn && Number(transformedObj.issqn) < 1) {
      return formRef.current.setFieldError('ISSQN', 'ISSQN deve ser maior que zero');
    }

    if (transformedObj.irrf && Number(transformedObj.irrf) < 1) {
      return formRef.current.setFieldError('IRRF', 'IRRF deve ser maior que zero');
    }

    if (transformedObj.csll && Number(transformedObj.csll) < 1) {
      return formRef.current.setFieldError('CSLL', 'CSLL deve ser maior que zero');
    }

    if (transformedObj.cofins && Number(transformedObj.cofins) < 1) {
      return formRef.current.setFieldError('COFINS', 'COFINS deve ser maior que zero');
    }

    if (transformedObj.inss && Number(transformedObj.inss) < 1) {
      return formRef.current.setFieldError('INSS', 'INSS deve ser maior que zero');
    }

    if (transformedObj.pis && Number(transformedObj.pis) < 1) {
      return formRef.current.setFieldError('PIS', 'PIS deve ser maior que zero');
    }
    return sendData(ref);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFiles((prevState) => [...prevState, file]);
  };

  const handleBtnFile = (e) => {
    setFiles((prevState) => [...prevState.filter((item) => item.name !== e.target.name)]);
  };

  return (
    <div>
      <nav>
        <img src={logo} alt="logo" />
        <p>Pagamento de Fornecedor</p>
      </nav>
      <Header />
      <section>
        <p>Dados da Nota Fiscal</p>
      </section>
      <main>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <span>
            <p>Código do Contrato:</p>
            {contrato.codigo_contrato}
          </span>
          <span>
            {contrato.nome_contrato}
          </span>
          <Input name="Número da Nota" onKeyUp={maskNumbers} />
          <Input name="Data de Emissão" type="date" />
          <Input name="Data de Vencimento" type="date" />
          <Input name="Valor" onKeyUp={maskNumbers} onBlur={handleBlur} />
          <Checkbox name="Retenção de Impostos" type="checkbox" checked={checkboxRetencaoImpostos} onClick={retencaoClickImpostos} />
          { checkboxRetencaoImpostos
          && (
          <section>
            <label>Dados de Impostos</label>
            <Input name="ISSQN" onKeyUp={maskNumbers} />
            <Input name="IRRF" onKeyUp={maskNumbers} />
            <Input name="CSLL" onKeyUp={maskNumbers} />
            <Input name="COFINS" onKeyUp={maskNumbers} />
            <Input name="INSS" onKeyUp={maskNumbers} />
            <Input name="PIS" onKeyUp={maskNumbers} />
          </section>
          )}
          <Checkbox name="Retenção Técnica" type="checkbox" checked={checkboxRetencaoTecnica} onClick={retencaoClickTecnica} />
          { checkboxRetencaoTecnica
          && (
            <section>
              <label>Dados da Retenção Técnica</label>
              <Input name="Valor da Retenção Tecnica" value={dataRetencaoValor} />
              <Input name="Percentual" value={contrato.percentual_retencao_tecnica} />
            </section>
          )}
          <label>Anexar Nota Fiscal</label>
          <input type="file" onChange={handleFile} />
          {
          files
          && (
            <section>
              {
                files.map((file) => (
                  <article>
                    <span>{file.name}</span>
                    <input type="button" name={file.name} onClick={handleBtnFile} />
                  </article>
                ))
              }
            </section>
          )
        }
          <button type="submit" onClick={handleSubmitPrev}>Anterior</button>
          <button type="submit">Próxima</button>
        </Form>
      </main>
      <Footer />
    </div>
  );
}

export default Notas;
