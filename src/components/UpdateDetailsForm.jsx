import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container } from 'react-bootstrap';

export default function UpdateDetailsForm ({ submitFormData, setDetails, setAlert }) {
  return (
    <Container className="update-container" >
      <Form onSubmit={ (ev) => {
        ev.preventDefault();
        const { title, subtitle, description, cover } = ev.target;
        if (!title.value || !subtitle.value || !description.value || !cover.files[0]) {
            alert('Todo os campos precisam ser preenchidos');
        } else {
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('subtitle', subtitle.value);
        formData.append('description', description.value);
        formData.append('cover', cover.files[0]);
        submitFormData(formData);
        }
      } } className="update-form" >
          <Form.Label>
            <h3>Título</h3>
          </Form.Label>
            <Form.Control type="text" name="title" size="lg" />
          <Form.Label >
              <h3>Subtítulo</h3>
          </Form.Label>
          <Form.Control type="text" name="subtitle" size="lg" />
          <Form.Label>
              <h3>Descrição</h3>
          </Form.Label>
            <Form.Control type="text" name="description" size="lg" />
          <Form.Label>
              <h3>Capa</h3>
          </Form.Label>
            <Form.Control type="file" name="cover" size="lg" />
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