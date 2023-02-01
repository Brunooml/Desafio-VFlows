import React, { useRef, useContext } from 'react';
import TestContext from '../context/TestContext';
import { Form } from '@unform/web';
import InputAcesso from '../Form/inputAcesso';
import users from '../data/users';
import { useHistory } from 'react-router-dom';
import logo from '../data/logo.png'

function Acesso() {
  const { cnpj, setCnpj } = useContext(TestContext);
  const formRef = useRef(null);
  const history = useHistory(); 

  function login(data){

    const resposta = users.find((element) => element.cnpj == data)
    if(resposta === undefined) {
     return formRef.current.setFieldError('cnpj', 'CNPJ sem contratos ativos')
    } 
    
    history.push("/contratos")
    setCnpj(resposta)
  }

  function handleSubmit(data) {

    if(data.cnpj.length !== 14 || !(/^\d+$/.test(data.cnpj))){
      return formRef.current.setFieldError('cnpj', 'CNPJ inválido')
    } 
    login(data.cnpj);
  }

  return (
    <div>
      <img src={ logo } width="100"/>
      <h3>Pagamento de Fornecedor</h3>
      <Form ref={ formRef } onSubmit={ handleSubmit }>
        <InputAcesso maxLength={ 14 } name="cnpj" />
        <button type="submit">Acessar</button>
      </Form>
    </div>
  )
}

export default Acesso