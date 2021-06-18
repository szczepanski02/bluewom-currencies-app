import React, { useState } from 'react'
import { UsersContext, defaultObject } from './context/UsersContext';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import theme from './constants/theme';

import HomePage from './shared/pages/homePage/HomePage.jsx';
import LoginPage from './shared/pages/loginPage/LoginPage.jsx'
import UserCurrenciesList from './shared/pages/userCurrenciesList/UserCurrenciesList';

const App = () => {

  const [isUserLogged, setIsUserLogged] = useState(defaultObject.isUserLogged);
  const toggleLoggedState = () => setIsUserLogged(!isUserLogged);
  const [username, setUsername] = useState(defaultObject.username);
  const [favoriteCurrencies, setFavoriteCurrencies] = useState(defaultObject.favoriteCurrencies);

  return (
    <ThemeProvider theme={theme}>
      <UsersContext.Provider value={{ isUserLogged, toggleLoggedState, username, setUsername, favoriteCurrencies, setFavoriteCurrencies }}>
        <Router>
          <Switch>
            <Route exact path="/">
              {isUserLogged ? <Redirect to="/homePage" /> : <Redirect to="/login" />}
            </Route>
            <Route path="/homePage">
              {isUserLogged ? <HomePage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login" component={LoginPage} />
            <Route path="/userCurrenciesList">
              {isUserLogged ? <UserCurrenciesList /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      </UsersContext.Provider>
    </ThemeProvider>
  );
}
export default App;