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
    const resposta = users.find((element) => element.cnpj === data);
    if (!resposta) {
      return formRef.current.setFieldError('cnpj', 'CNPJ sem contratos ativos');
    }

    return (
      history.push('/contratos'), setCnpj(resposta)
    );
  };

  const handleSubmit = (data) => {
    if (data.cnpj.length !== 14 || !(/^\d+$/.test(data.cnpj))) {
      return formRef.current.setFieldError('cnpj', 'CNPJ inválido');
    }
    return login(data.cnpj);
  };

  return (
    <div>
      <img src={logo} width="100" alt="logo" />
      <h3>Pagamento de Fornecedor</h3>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputAcesso maxLength={14} name="cnpj" />
        <button type="submit">Acessar</button>
      </Form>
    </div>
  );
}

export default Acesso;
