import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/userProvider';
import MovieProvider from './context/movieProvider';
import Routes from './services/routes';

export default function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MovieProvider>
    </UserProvider>
  );
}

