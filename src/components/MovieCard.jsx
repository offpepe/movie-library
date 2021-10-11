import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fs from 'fs';
import { Card } from 'react-bootstrap';
import { getMovieCover } from '../services/apiRequests';

export default function MovieCard({ movie }) {
  const  { _id: id, title, subtitle, description, cover } = movie;
  const [image, setImage] = useState('');
  useEffect(() => {
    getMovieCover(cover, setImage);
    // fs.writeFile(`${process.env.PUBLIC_URL}/moviesCover/cover.jpg`, image);
  }, [setImage]);
  return (
      <Card style={{ width: '18rem' }}>
          { image && <Card.Img variant="top" src={ image.url } style={{ width: '250px' }} fluid /> }
          <Card.Body>
              <Card.Title>{ title }</Card.Title>
              <Card.Subtitle>{ subtitle }</Card.Subtitle>
              <Card.Text>{ description }</Card.Text>
          </Card.Body>
      </Card>
  );
}

MovieCard.propTypes = {
  props: PropTypes.shape({
    movie: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
};