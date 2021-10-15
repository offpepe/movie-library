import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMovieCover } from '../services/apiRequests';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

export default function MovieCard({ movie }) {
  const  { _id: id, title, rate, genre, cover } = movie;
  const [image, setImage] = useState('');
  useEffect(() => {
    getMovieCover(cover, setImage);
  }, [setImage, cover]);
  return (
    <>
    { image && <div className="card movie-card">
        <img src={ image.url } alt={ `cover of ${title}` } />
        <div className="card-content movie-card-content">
      <Link to={ `/movies/${id}` }>
          <div className="movie-card-content-data">
            <h4 className="title">{ title }</h4>
            <h6>{ genre }</h6>
            <div>
              <StarRatingComponent starCount={ rate } value={ rate } />
            </div>
          </div>
      </Link>
        </div>
      </div> }
    </>
  );
}

MovieCard.propTypes = {
  props: PropTypes.shape({
    movie: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,    
};