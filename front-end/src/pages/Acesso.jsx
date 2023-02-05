import React, { useRef, useContext } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import TestContext from '../context/TestContext';
import Input from '../Form/input';
import users from '../data/users';
import logo from '../data/logo.png';
import '../index.css';

function Acesso() {
  const { setCnpj } = useContext(TestContext);
  const formRef = useRef(null);
  const history = useHistory();

  const login = (data) => {
    const resposta = users.find((user) => user.cnpj === data);
    if (!resposta) {
      return formRef.current.setFieldError('CNPJ', 'CNPJ sem contratos ativos');
    }

    return (
      history.push('/contratos'), setCnpj(resposta)
    );
  };

  const handleSubmit = (data) => {
    const regex = /^[\d@#$%^&*(),.?":{}|<>]+$/;
    if (data.CNPJ.length !== 18 || regex.test(data.CNPJ)) {
      return formRef.current.setFieldError('CNPJ', 'CNPJ inválido');
    }
    return login(data.CNPJ);
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
      <nav>
        <img src={logo} alt="logo" />
        <p>Pagamento de Fornecedor</p>
      </nav>
      <main>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="CNPJ" maxLength={18} onKeyUp={maskCnpj} />
          <button type="submit">Acessar</button>
        </Form>
      </main>
    </div>
  );
}

export default Acesso;
