import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;