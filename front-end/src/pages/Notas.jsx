import React, { useRef, useContext } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../data/logo.png';
import trash from '../data/trash.png';
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

  const handleSubmitPrev = () => (history.push('/contratos'), setCheck(''), setFiles(''), setDataRetencaoValor(''), setCheckboxRetencaoImpostos(''), setCheckboxRetencaoTecnica(''));

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
    return (history.push('/'), setCheck(''), setCnpj(''), setContratosCnpj(''), setDataRetencaoValor(''), setFiles(''), setCheckboxRetencaoImpostos(''), setCheckboxRetencaoTecnica(''));
  };

  const handleSubmit = (ref) => {
    const transformedObj = {};

    formRef.current.setFieldError('Número da Nota', '');
    formRef.current.setFieldError('Data de Emissão', '');
    formRef.current.setFieldError('Data de Vencimento', '');
    formRef.current.setFieldError('Valor', '');
    formRef.current.setFieldError('ISSQN', '');
    formRef.current.setFieldError('IRRF', '');
    formRef.current.setFieldError('CSLL', '');
    formRef.current.setFieldError('COFINS', '');
    formRef.current.setFieldError('INSS', '');
    formRef.current.setFieldError('PIS', '');

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
    <div className="bg-lime-50 min-h-screen flex items-center justify-center">
      <div className="border-solid border border-lime-200 bg-white rounded-sm">
        <nav className="flex p-4 items-center space-x-32 m-1">
          <img src={logo} alt="logo" className="w-24 h-10" />
          <p className="text-3xl">Pagamento de Fornecedor</p>
        </nav>
        <Header />
        <section className="border-solid border border-lime-200 flex items-center justify-center m-1 p-1">
          <p>Dados da Nota Fiscal</p>
        </section>
        <main className="border-solid border border-lime-200 m-1">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex p-2 space-x-28">
              <span className="flex">
                <p className="font-semibold">Código do Contrato:</p>
                <p className="italic">{contrato.codigo_contrato}</p>
              </span>
              <span>
                <p className="italic">{contrato.nome_contrato}</p>
              </span>
            </div>
            <div className="flex p-1 space-x-5">
              <Input name="Número da Nota" onKeyUp={maskNumbers} className="bg-white border border-stone-200 rounded pl-px w-40" />
              <Input name="Data de Emissão" type="date" className="bg-white border border-stone-200 rounded w-40" />
              <Input name="Data de Vencimento" type="date" className="bg-white border border-stone-200 rounded w-40" />
              <span className="text-base items-end relative left-11 top-3.5">R$</span>
              <Input name="Valor" nonKeyUp={maskNumbers} onBlur={handleBlur} className="bg-white border border-stone-200 rounded static pl-6 w-40" />
            </div>
            <Checkbox name="Retenção de Impostos" type="checkbox" checked={checkboxRetencaoImpostos} onClick={retencaoClickImpostos} className="flex mx-1 my-0.5" />
            { checkboxRetencaoImpostos
          && (
          <section className="flex m-1">
            <span className="text-base items-end relative left-7 top-3.5">R$</span>
            <Input name="ISSQN" className="bg-white border border-stone-200 rounded static w-28 mx-1 pl-6" onKeyUp={maskNumbers} />
            <span className="text-base items-end relative left-7 top-3.5">R$</span>
            <Input name="IRRF" className="bg-white border border-stone-200 rounded static w-28 mx-1 pl-6" onKeyUp={maskNumbers} />
            <span className="text-base items-end relative left-7 top-3.5">R$</span>
            <Input name="CSLL" className="bg-white border border-stone-200 rounded static w-28 mx-1 pl-6" onKeyUp={maskNumbers} />
            <span className="text-base items-end relative left-7 top-3.5">R$</span>
            <Input name="COFINS" className="bg-white border border-stone-200 rounded static w-28 mx-1 pl-6" onKeyUp={maskNumbers} />
            <span className="text-base items-end relative left-7 top-3.5">R$</span>
            <Input name="INSS" className="bg-white border border-stone-200 rounded static w-28 mx-1 pl-6" onKeyUp={maskNumbers} />
            <span className="text-base items-end relative left-7 top-3.5">R$</span>
            <Input name="PIS" className="bg-white border border-stone-200 rounded static w-28 mx-1 pl-6" onKeyUp={maskNumbers} />
          </section>
          )}
            <Checkbox name="Retenção Técnica" type="checkbox" checked={checkboxRetencaoTecnica} onClick={retencaoClickTecnica} className="flex mx-1 my-0.5" />
            { checkboxRetencaoTecnica
          && (
            <section>
              <span className="text-base flex items-end relative left-px top-10">R$</span>
              <Input name="Valor da Retenção Técnica" value={dataRetencaoValor} className="bg-stone-300 border border-stone-200 rounded flex w-32 h-6 pl-5" />
              <Input name="Percentual" value={contrato.percentual_retencao_tecnica} className="bg-stone-300 border border-stone-200 rounded flex w-32 h-6 pl-1" />
            </section>
          )}
            <div>
              <label htmlFor="arquivo" className="bg-stone-600 max-h-5 w-36 p-px m-1 mt-3 text-white flex items-center justify-center">Anexar Nota Fiscal</label>
              <input type="file" id="arquivo" onChange={handleFile} className="hidden" />
              {
          files
          && (
            <section>
              {
                files.map((file) => (
                  <article className="flex items-baseline m-1">
                    <span>{file.name}</span>
                    <img src={trash} alt="trash" className="w-4 pl-1" name={file.name} onClick={handleBtnFile} />
                  </article>
                ))
              }
            </section>
          )
        }
            </div>
            <button type="submit" onClick={handleSubmitPrev} className="bg-yellow-500 w-36 p-px m-1 text-white">Anterior</button>
            <button type="submit" className="bg-green-700 w-36 p-px m-1 text-white">Próximo</button>
          </Form>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Notas;
