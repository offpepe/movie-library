import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import movieContext from '../context/movieContext';
import { getMovies } from '../services/apiRequests';
import MovieCard from '../components/MovieCard';
import './css/Library.css';
import LibraryHeader from '../components/LibraryHeader';

export default function Library () {
    const { movieList, setMovieList } = useContext(movieContext);
    useEffect(() => {
      getMovies(setMovieList);
    },[setMovieList])
    return (
      <>
        <LibraryHeader />
        <Container>
          <div className="movie-card-group">
            { movieList && movieList.map((movie) => <MovieCard movie={ movie } />) }
          </div>
        </Container>
      </>
      );
}
