import React, { useRef, useContext } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import TestContext from '../context/TestContext';
import Input from '../Form/input';
import users from '../data/users';
import logo from '../data/logo.png';

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
    <div className="bg-lime-50 min-h-screen flex items-center justify-center">
      <div className="border-solid border border-lime-300 bg-white px-10 py-10 rounded-2xl shadow-2xl">
        <nav className="mx-8">
          <img src={logo} alt="logo" className="w-32 ml-8" />
          <p className="font-sans mt-3 mb-1">Pagamento de Fornecedor</p>
        </nav>
        <main className="bg-stone-50 pb-8 px-5 pt-2">
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input className="bg-white mt-1 mb-5 border p-1 border-stone-200 rounded" name="CNPJ" maxLength={18} onKeyUp={maskCnpj} />
            <button className="bg-green-600 p-1 w-full mt-4 pb-2 text-white" type="submit">Acessar</button>
          </Form>
        </main>
      </div>
    </div>
  );
}

export default Acesso;
