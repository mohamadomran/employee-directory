import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { EmployeeForm } from './Pages/EmployeeForm';
import { LandingPage } from './Pages/LandingPage';

import { NavBar } from 'Components';
import { theme } from 'Theme';

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact={true} path="/" component={LandingPage} />
        <Route exact={true} path="/add-employee" component={EmployeeForm} />
        <Route
          exact={true}
          path="/edit-employee/:id"
          component={EmployeeForm}
        />
      </Switch>
    </BrowserRouter>
  </ChakraProvider>
);
