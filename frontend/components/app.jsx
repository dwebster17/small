import React from 'react';
import { Route } from 'react-router-dom';

import GreetingContainer from './greeting_container';
import SessionFormContainer from './session_form_container';
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
      <h1>small</h1>
      <nav>
        <Route path="/" component={GreetingContainer}/>
      </nav>
    </header>
  </div>
);

export default App;

let temp = (
  <div>
    <AuthRoute path="/login" component={ SessionFormContainer } />
    <AuthRoute path="/signup" component={ SessionFormContainer } />
  </div>
);
