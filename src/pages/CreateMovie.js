import React, { useContext, useState } from 'react';
import { Container, Col, Form, Button, Alert  } from 'react-bootstrap';
import { Redirect } from 'react-router';
import MovieCardPreview from '../components/MovieCardPreview';
import userContext from '../context/userContext';
import { createNewMovie } from '../services/apiRequests';
import './css/CreateMovie.css';

export default function CreateMovie () {
    const { token } = useContext(userContext);
    const [newMovie, setNewMovie] = useState({});
    const [dispatchCard, setDispatch] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [alert, setAlert] = useState({});
    const [inputError, setInputError] = useState(false);
    const submitNewMovie = async () => {
        const operation = await createNewMovie(newMovie, token);
        setAlert(operation);
        if(operation.success) {
          setTimeout(() => setRedirect(true), 1000);
        }
    }

    const closePreview = () => {
        setDispatch(false);
        setAlert({});
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
                  const { title, subtitle, description, cover } = ev.target;
                  if (!title.value || !subtitle.value || !description.value || !cover.files[0]) {
                      setInputError(true);
                  } else {
                  setNewMovie({
                      title: title.value,
                      subtitle: subtitle.value,
                      description: description.value,
                      cover: cover.files[0],
                  });
                  setDispatch(true);
                  }
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
          { inputError  && <Alert variant="warning" onClose={ () => setInputError   (false) } dismissible >
              <Alert.Heading> Todos os campos precisam ser preenchidos </Alert.Heading>
              </Alert>}
      </Container>
      { dispatchCard &&
      <section className="card-preview-box">
         <MovieCardPreview
           movie={ newMovie }
           setDispatch={ closePreview }
           submitNewMovie={ submitNewMovie }
           alert={ alert } 
           />
      </section>
      }
      { redirect && <Redirect to="/movies" /> }
    </> 
    );
}