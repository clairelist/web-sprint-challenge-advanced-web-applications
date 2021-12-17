import React from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';

import Header from './Header';
import BloomHeader from './BloomHeader';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Logout from './Logout';
import View from './View';

const App = () => {
  return (
    <AppContainer>
      <BloomHeader/>
      <Header/>
      <RouteContainer>
      <PrivateRoute exact path='/view' component={View} />
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path='/logout' component={Logout} />
        <Route path='/login' component={Login} />
          
      </RouteContainer>
    </AppContainer>
  )
}

export default App;

//Task List
//1. Create and import PrivateRoute component. X
//2. Create a Route for Login pointing to '/login.' X
//3. Create a PrivateRoute for View component point to '/view.' X
//4. Create a PrivateRoute for Logout component pointing to '/logout.' X


const AppContainer = styled.div`
  height: 100%;
`
const RouteContainer = styled.div`
  display: flex;
  height: 85%;
  align-items: center;
  flex-direction: column;
`
