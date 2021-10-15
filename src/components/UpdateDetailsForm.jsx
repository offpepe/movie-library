import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

export default function UpdateDetailsForm ({ submitFormData, setDetails, setAlert, movie: { title, subtitle, genre, releaseDate, rate, description } }) {
  const [movieGenres] = useState(['Animação', 'Comédia', 'Comédia Romântica', 'Documentário', 'Drama', 'Faroeste', 'Ficção Científica', 'Musical', 'Suspense', 'Terror / Horror']);
  const [rating, setRating] = useState(rate);

  const date = new Date().toLocaleDateString("pt-BR");

  return (
    <Container className="update-container" >
      <Form onSubmit={ (ev) => {
        ev.preventDefault();
        const { newTitle, newSubtitle, newGenre, newReleaseDate, newRate, newDescription, newCover } = ev.target;
        const formData = new FormData();
        formData.append('title', newTitle.value);
        formData.append('subtitle', newSubtitle.value);
        formData.append('genre', newGenre.value);
        formData.append('releaseDate', newReleaseDate.value);
        formData.append('rate', (newRate.value ? newRate.value : rate));
        formData.append('description', newDescription.value);
        formData.append('cover', newCover.files[0]);
        formData.append('lastUpdate', date);
        submitFormData(formData);
      } } className="update-form" >
          <Form.Label>
            <h3>Título</h3>
          </Form.Label>
            <Form.Control type="text" name="newTitle" value={ title } size="lg" />
          <Form.Label >
              <h3>Subtítulo</h3>
          </Form.Label>
          <Form.Control type="text" name="newSubtitle" value={ subtitle } size="lg" />
          <Form.Label>
            <h3> Gênero </h3>
          </Form.Label>
          <Form.Select name="newGenre" value={ genre }>
            { movieGenres.map((gen) => <option value={ gen }>{ gen }</option>) }
          </Form.Select>
          <Form.Label>
            <h3> Data de lançamento </h3>
          </Form.Label>
          <Form.Control type="date" name="newReleaseDate" max={ date } min='1888-12-12' />
          <Form.Label>
            <h3>Avaliação</h3>
          </Form.Label>
          <div>
          <StarRatingComponent name="newRate" value={ rating } starCount={ 5 } onStarClick={ setRating } />
          </div>
          <Form.Label>
              <h3>Descrição</h3>
          </Form.Label>
            <Form.Control as="textarea" name="newDescription" style={{ height: '100px' }} value={ description } />
          <Form.Label>
              <h3>Capa</h3>
          </Form.Label>
            <Form.Control type="file" name="newCover" size="lg" />
        <div className="update-btn">
          <Button variant="info" type="submit" size="lg" >
            Confirmar 
          </Button>
          <Button variant="danger" onClick={ () => {
              setDetails('show')
              setAlert(false);
          } } size="lg" >
            Cancelar
          </Button>
        </div>
      </Form>
    </Container>      
  );
}

UpdateDetailsForm.propTypes = {
  props: PropTypes.shape({
    submitFormData: PropTypes.func,
    setDetails: PropTypes.func,
    setAlert: PropTypes.func,
  }).isRequired,
};