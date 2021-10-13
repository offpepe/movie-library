import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getMovieCover } from '../services/apiRequests';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const  { _id: id, title, subtitle, description, cover } = movie;
  const [image, setImage] = useState('');
  useEffect(() => {
    getMovieCover(cover, setImage);
  }, [setImage, cover]);
  return (
    <Link to={`movies/${id}`}>
      <Card style={{ width: '18rem' }}>
        <div className="card-header">
          <p>{ id }</p>
        </div>
          { image && <Card.Img variant="top" src={ image.url } style={{ width: '250px' }} fluid /> }
          <Card.Body>
              <Card.Title>{ title }</Card.Title>
              <Card.Subtitle>{ subtitle }</Card.Subtitle>
              <Card.Text>{ description }</Card.Text>
          </Card.Body>
      </Card>
    </Link>
  );
}

MovieCard.propTypes = {
  props: PropTypes.shape({
    movie: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,    
};