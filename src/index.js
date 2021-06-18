import React, { StrictMode } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import './app/styles/global.scss';
import App from './app/App';

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
