import { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import TestProvider from './context/TestProvider';
import Acesso from './pages/Acesso';
import Contratos from './pages/Contratos';
import Notas from './pages/Notas';

function App() {

  return (
    <TestProvider>
    <BrowserRouter>
      <Route exact path="/" component={ Acesso }/>
      <Route exact path="/contratos" component={ Contratos }/>
      <Route exact path="/notas" component={ Notas }/>
    </BrowserRouter>
    </TestProvider>
  )
}

export default App
