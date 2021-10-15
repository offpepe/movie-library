import React from 'react';
import { Badge, Card, ListGroup, Button } from 'react-bootstrap';
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
    lastUpdate },
    cover,
    showConfirmation,
    email,
    handleDelete,
    setConfirmation,
    showDelError,
    errorAlert,
    setDetailStatus
     },) {
        const splittedRelease = releaseDate.split('-');
        const formattedReleaseDate = `${splittedRelease[2]}/${splittedRelease[1]}/${splittedRelease[0]}`;

        return (
            <>
            <Card className="movie-details-info">
            <div style={ { display: 'flex' } }>
            <section className="movie-details-figure">
              <img src={ cover.url } alt={ `Cover of movie ${title}` }  />
            </section>
            <section className="movie-details-movie-data">
              <Card.Title>{ title }</Card.Title>
              <Card.Subtitle>{ subtitle }</Card.Subtitle>
              <Card.Body>
                <Card.Text>{ description }</Card.Text>
              </Card.Body>
              <ListGroup variant="info">
                <ListGroup.Item>{ `Data de lançamento: ${formattedReleaseDate}` }</ListGroup.Item>
                <ListGroup.Item><h3><StarRatingComponent starCount={ rate } value={ rate } /></h3></ListGroup.Item>
                <ListGroup.Item>{ lastUpdate ? `Ultima atualização: ${lastUpdate}` : `Postado em: ${createdAt}` }</ListGroup.Item>
                <ListGroup.Item>{ `Criado por: ${createdBy}` }</ListGroup.Item>
                <ListGroup.Item><h4><Badge pill variant="dark">{ genre }</Badge></h4></ListGroup.Item>
                { email === createdBy && <ListGroup.Item>
                  <Button variant="primary" size="lg" onClick={ () => setDetailStatus('update') }>
                    Editar
                  </Button>
                  <Button onClick={ () => setConfirmation(true) } variant="danger" size="lg">
                    Deletar
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
      movie: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,    
};