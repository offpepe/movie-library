import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import movieContext from '../context/movieContext';
import { getMovies } from '../services/apiRequests';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';

export default function Library () {
    const { movieList, setMovieList } = useContext(movieContext);
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
          <Row style={ { width: '200px' } }>
            <Button
              variant="info"
            >
              <Link to="/movies/create">
                Adicionar novo filme
              </Link>
            </Button>
          </Row>
        </Container>
    );
}
