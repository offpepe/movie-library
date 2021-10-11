import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Container, Row } from 'react-bootstrap';
import movieContext from '../context/movieContext';
import { getMovies } from '../services/apiRequests';
import MovieCard from '../components/MovieCard';

export default function Library () {
    const { movieList, setMovieList } = useContext(movieContext);
    const [movies, setMovies] = useState([]);
    useEffect(async () => {
      await getMovies(setMovieList);
    },[])
    return (
        <Container>
          <Col>
            <h1> Movie Library </h1>
            <p> Galeria de filmes </p>
          </Col>
          <Row xs={1} md={2} className="g-4">
            { movieList && movieList.map((movie) => <MovieCard movie={ movie } />) }
          </Row>
        </Container>
    );
}

// Library.propTypes = {

// };

