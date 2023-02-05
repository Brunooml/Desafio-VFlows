import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TestProvider from './context/TestProvider';
import Acesso from './pages/Acesso';
import Contratos from './pages/Contratos';
import Notas from './pages/Notas';
import GlobalStyle from './styles/globalStyle';

function App() {
  return (
    <BrowserRouter>
      <TestProvider>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={Acesso} />
          <Route exact path="/contratos" component={Contratos} />
          <Route exact path="/notas" component={Notas} />
        </Switch>
      </TestProvider>
    </BrowserRouter>
  );
}

export default App;
