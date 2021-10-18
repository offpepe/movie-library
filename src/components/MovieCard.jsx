import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';

export default function MovieCard({ movie }) {
  const  { _id: id, title, rate, genre, cover } = movie;
  return (
    <>
    { movie && <div className="card movie-card">
        <img src={ cover } alt={ `cover of ${title}` } />
        <div className="card-content movie-card-content">
      <Link to={ `/movies/${id}` }>
          <div className="movie-card-content-data">
            <h4 className="title" style={ { color: 'rgb(207, 204, 204)' } }>{ title }</h4>
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