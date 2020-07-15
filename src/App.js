import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import validate from 'validate.js';
import { Chart } from 'react-chartjs-2';
import 'react-toastify/dist/ReactToastify.css';

import history from './services/history';
import { ThemeProvider } from '@material-ui/styles';
import AuthProvider from './context/Auth';
import UserProvider from './context/User';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './routes';

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <UserProvider>
            <Router history={history}>
              <Routes />
              <ToastContainer autoClose={5000} />
            </Router>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}
