import React, { useContext, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import movieContext from '../context/movieContext';
import { getMovies, validateToken } from '../services/apiRequests';
import MovieCard from '../components/MovieCard';
import './css/Library.css';
import LibraryHeader from '../components/LibraryHeader';
import userContext from '../context/userContext';

export default function Library () {
    const { setToken, setEmail } = useContext(userContext);
    const { movieList, setMovieList } = useContext(movieContext);
    useEffect(() => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      const loggout = () => {
        setToken();
        setEmail();
        localStorage.clear();
        window.location.reload();
      };
      const checkToken = async () => {
       const response = await validateToken(token);
       if(!response.success) {
        loggout();
       } else {
         setToken(token);
         setEmail(email);
       }
      }
      if(token) {
        checkToken();
      }
      getMovies(setMovieList);
    },[setEmail, setMovieList, setToken]);
    return (
      <>
        <LibraryHeader />
        <Container>
          { movieList.length > 0 ? <div className="movie-card-group">
             { movieList.map((movie) => <MovieCard movie={ movie } />)}
          </div>
        :  <div className="spinner-box" > <Spinner style={ { width: '8rem', height: '8rem' } } variant="danger" animation="border" /> </div> } 
        </Container>
      </>
      );
}
