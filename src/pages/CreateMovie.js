import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert  } from 'react-bootstrap';
import MovieCardPreview from '../components/MovieCardPreview';
import userContext from '../context/userContext';
import { createNewMovie } from '../services/apiRequests';
import './css/CreateMovie.css';

export default function CreateMovie () {
    const { token } = useContext(userContext);
    const [newMovie, setNewMovie] = useState({});
    const [dispatchCard, setDispatch] = useState(false);
    const [alert, setAlert] = useState({});
    const submitNewMovie = async () => {
        const operation = await createNewMovie(newMovie, token);
        setAlert(operation);
    }

    return (
    <>
      <Container>
          <Col>
            <h1> Adicionar novo filme </h1>
          </Col>
          <Col>
              <Form onSubmit={ (ev) => {
                  ev.preventDefault();
                  setNewMovie({
                      title: ev.target.title.value,
                      subtitle: ev.target.subtitle.value,
                      description: ev.target.description.value,
                      cover: ev.target.cover.files[0],
                  });
                  setDispatch(true);
              } }>
                  <Form.Label>
                    Título
                  </Form.Label>
                  <Form.Control type="text" name="title"/>
                  <Form.Label>
                      Subtítulo
                  </Form.Label>
                  <Form.Control type="text" name="subtitle" />
                  <Form.Label>
                      Descrição
                  </Form.Label>
                  <Form.Control type="textarea" name="description" />
                  <Form.Label>
                      Capa
                  </Form.Label>
                  <Form.Control type="file" name="cover" />
                  <Button variant="secondary" type="submit"> Adicionar </Button>
              </Form>
          </Col>
      </Container>
      { dispatchCard &&
      <section className="card-preview-box">
         <MovieCardPreview
           movie={ newMovie }
           className="card-preview"
           setDispatch={ setDispatch }
           submitNewMovie={ submitNewMovie }
        />
      </section>
      }
    </> 
    );
}