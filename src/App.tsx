import React, { ReactElement } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import CurrencyConverter from './pages/CurrencyConverter';
import HistoricalViewer from './pages/HistoricalViewer';
import Home from './pages/Home';

const App = () : ReactElement => {
  return (
    <BrowserRouter>
      <Header>
        <Link to="/">Home</Link>
        <Link to="/converter">Currency Converter</Link>
        <Link to="/historical">Historical Data</Link>
      </Header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/converter">
          <CurrencyConverter />
        </Route>
        <Route path="/historical">
          <HistoricalViewer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;