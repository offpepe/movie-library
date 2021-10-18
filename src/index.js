import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/userProvider';
import MovieProvider from './context/movieProvider';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <UserProvider>
    <MovieProvider>
     <BrowserRouter basename={process.env.PUBLIC_URL} >
       <App />
      </BrowserRouter>
    </MovieProvider>
  </UserProvider>,
  document.getElementById('root')
);

reportWebVitals();
