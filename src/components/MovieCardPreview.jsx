import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Popover, OverlayTrigger } from 'react-bootstrap';


export default function MovieCard({ movie, setDispatch, submitNewMovie, alert }) {
  const [popOver, setPopOver] = useState();
  const  { title, subtitle, description, cover } = movie;
  const setAlert = (response, code, message) => (
    <Card bg='danger'>
      <Card.Subtitle as="h3">{ `${code} -> ${response}` }</Card.Subtitle>
      <Card.Text>
        { message }
      </Card.Text>
    </Card>
  );
  useEffect(() => {
    if(alert) {
        if (alert.error) {
          setPopOver(setAlert(alert.error, alert.code, alert.message));
        } else if (alert.success) {
          setPopOver(setAlert(alert.success, alert.code, alert.message));
        }
      }
  }, [setPopOver, setAlert])
  const dispatchNewMovie = async () => {
    setPopOver('Loading...');
    await submitNewMovie();
  };


  return (
      <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={ window.URL.createObjectURL(cover) } fluid />
          <Card.Body>
              <Card.Title>{ title }</Card.Title>
              <Card.Subtitle>{ subtitle }</Card.Subtitle>
              <Card.Text>{ description }</Card.Text>
          </Card.Body>
          <Card.Footer fluid="md" className="card-preview-footer">
            <Button variant='success' onClick={ () => dispatchNewMovie() } > Adicionar </Button>
            <Button variant='danger' onClick={ () => setDispatch() } > Cancelar </Button>
          </Card.Footer>
          { alert && popOver }
      </Card>
  );
}

MovieCard.propTypes = {
  props: PropTypes.shape({
    movie: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,    
};