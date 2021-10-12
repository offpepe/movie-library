import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row } from 'react-bootstrap';
export default function MovieCard({ movie, setDispatch, submitNewMovie }) {
  const  { _id: id, title, subtitle, description, cover } = movie;
  return (
      <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={ window.URL.createObjectURL(cover) } fluid />
          <Card.Body>
              <Card.Title>{ title }</Card.Title>
              <Card.Subtitle>{ subtitle }</Card.Subtitle>
              <Card.Text>{ description }</Card.Text>
          </Card.Body>
          <Card.Footer fluid="md" className="card-preview-footer">
            <Button variant='success' onClick={ () => submitNewMovie() } > Adicionar </Button>
            <Button variant='danger' onClick={ () => setDispatch(false) } > Cancelar </Button>
          </Card.Footer>
      </Card>
  );
}

MovieCard.propTypes = {
  props: PropTypes.shape({
    movie: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,    
};