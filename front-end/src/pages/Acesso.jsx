import React, { useRef, useContext } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import TestContext from '../context/TestContext';
import InputAcesso from '../Form/inputAcesso';
import users from '../data/users';
import logo from '../data/logo.png';

function Acesso() {
  const { setCnpj } = useContext(TestContext);
  const formRef = useRef(null);
  const history = useHistory();

  const login = (data) => {
    const resposta = users.find((user) => user.cnpj === data);
    if (!resposta) {
      return formRef.current.setFieldError('cnpj', 'CNPJ sem contratos ativos');
    }

    return (
      history.push('/contratos'), setCnpj(resposta)
    );
  };

  const handleSubmit = (data) => {
    const regex = /^[\d@#$%^&*(),.?":{}|<>]+$/;
    if (data.cnpj.length !== 18 || regex.test(data.cnpj)) {
      return formRef.current.setFieldError('cnpj', 'CNPJ inválido');
    }
    return login(data.cnpj);
  };

  const maskCnpj = (e) => {
    let cnpj = e.target.value;
    cnpj = cnpj.replace(/\D/g, '');
    cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    e.target.value = cnpj;
  };

  return (
    <div>
      <img src={logo} width="100" alt="logo" />
      <h3>Pagamento de Fornecedor</h3>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputAcesso name="cnpj" onKeyUp={maskCnpj} />
        <button type="submit">Acessar</button>
      </Form>
    </div>
  );
}

export default Acesso;
