import React, { useEffect, useState } from 'react';
import { Badge, Card, ListGroup, Button } from 'react-bootstrap';
import { getUserByEmail } from '../services/apiRequests';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';

export default function MovieDetails ({ movie: { 
    title,
    subtitle,
    description,
    rate,
    releaseDate,
    genre,
    createdBy,
    createdAt,
    lastUpdate,
    cover  },
    showConfirmation,
    email,
    handleDelete,
    setConfirmation,
    showDelError,
    errorAlert,
    setDetailStatus
     },) {
      const [user, setUser] = useState({})
      useEffect(() => {
      const fetchUser = async () => {
        const userData = await getUserByEmail(email);
        setUser(userData.result);
      };
      fetchUser()
    },[email])
        return (
            <>
            <Card className="movie-details-info">
            <div style={ { display: 'flex' } }>
              <img src={ cover } alt={ `Cover of movie ${title}` }  />
            <section className="movie-details-movie-data">
              <Card.Title>{ title }</Card.Title>
              <Card.Subtitle>{ subtitle }</Card.Subtitle>
              <Card.Body>
                <Card.Text>{ description }</Card.Text>
              </Card.Body>
              <ListGroup variant="info">
                <ListGroup.Item>{ `Data de lançamento: ${releaseDate}` }</ListGroup.Item>
                <ListGroup.Item><h3><StarRatingComponent starCount={ rate } value={ rate } /></h3></ListGroup.Item>
                <ListGroup.Item>{ lastUpdate ? `Ultima atualização: ${lastUpdate}` : `Postado em: ${createdAt}` }</ListGroup.Item>
                <ListGroup.Item>{ `Criado por: ${createdBy}` }</ListGroup.Item>
                <ListGroup.Item><h4><Badge pill variant="dark">{ genre }</Badge></h4></ListGroup.Item>
                { user && user.username === createdBy && <ListGroup.Item>
                  <Button style={ { margin: '0 5px' } } variant="outline-primary" size="lg" onClick={ () => setDetailStatus('update') }>
                  <i class="far fa-edit"></i>
                  </Button>
                  <Button style={ { margin: '0 5px' } } onClick={ () => setConfirmation(true) } variant="outline-danger" size="lg">
                  <i class="far fa-trash-alt"></i>
                  </Button>
                </ListGroup.Item>
                }
              </ListGroup>
              { showConfirmation &&
                <section className="delete-box" >
                  <Card className="delete-card" >
                  <Card.Header className="delete-card-header">
                  <Card.Title> Está certo em deletar este filme? </Card.Title>
                  </Card.Header>
                  <Card.Body>
                  <Card.Subtitle> Esta operação é irreversível! </Card.Subtitle>
                  </Card.Body>
                  { <Card.Footer className="delete-card-footer">
                    <Button onClick={ () => handleDelete() } variant="danger"> Sim </Button>
                    <Button onClick={ () => setConfirmation(false) }  variant="info"> Não </Button>
                  </Card.Footer>}
                  { showDelError && errorAlert }
              </Card> 
            </section>}
            </section>
            </div>
            </Card>
            </>
        );
}

MovieDetails.propTypes = {
  props: PropTypes.shape({
    movie: PropTypes.objectOf(PropTypes.string),
    cover: PropTypes.object,
    showConfirmation: PropTypes.func,
    email: PropTypes.string,
    handleDelete: PropTypes.func,
    setConfirmation: PropTypes.func,
    showDelError: PropTypes.func,
    errorAlert: PropTypes.func,
    setDetailStatus: PropTypes.func,
    }).isRequired,    
};
