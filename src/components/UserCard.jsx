import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default function UserCard ({ user, loggout }) {
    return (
    
          <div className="card user-card">
              <figure className="image is-128x128">
                  <img src={ `https://www.gravatar.com/avatar/${user.emailHash}` } title="avatar provided by Gravatar" alt="From Gravatar" />
              </figure>
            <div className="card-content" >
             <h3 className="title is-5" >{ user.username }</h3>
             <p  className="title is-6">{ user.email }</p>
            </div>
          <footer className="card-footer">
            <Button onClick={ () => loggout() } className="card-footer-item" variant="danger"> Sair </Button>
          </footer>
          </div>
    );
  }

UserCard.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};