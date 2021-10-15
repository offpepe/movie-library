import React, { useContext, useState } from 'react';
import { Container, Col as Row, Form, Button, Alert  } from 'react-bootstrap';
import { Redirect } from 'react-router';
import StarRatingComponent from 'react-star-rating-component';
import MovieCardPreview from '../components/MovieCardPreview';
import userContext from '../context/userContext';
import { createNewMovie } from '../services/apiRequests';
import './css/CreateMovie.css';

export default function CreateMovie () {
    let { token, email } = useContext(userContext);
    if (!token || !email) {
      token = localStorage.getItem('token');
      email = localStorage.getItem('email');
    }
    const [newMovie, setNewMovie] = useState({});
    const [dispatchCard, setDispatch] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [alert, setAlert] = useState({});
    const [inputError, setInputError] = useState(false);
    const [rate, setRate] = useState(1);
    const [movieGenres] = useState(['Animação', 'Comédia', 'Comédia Romântica', 'Documentário', 'Drama', 'Faroeste', 'Ficção Científica', 'Musical', 'Suspense', 'Terror / Horror']);
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

    const date = new Date()
    const formated = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    const today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    return (
    <>
      <Container>
          <Row>
            <h1> Adicionar novo filme </h1>
          </Row>
          <Row>
              <Form onSubmit={ (ev) => {
                  ev.preventDefault();
                  const { title, subtitle, description, genre, releaseDate, rate, cover } = ev.target;
                  if (!title.value || !subtitle.value || !genre.value || !releaseDate.value || !rate.value || !description.value || !cover.files[0]) {
                      setInputError(true);
                  } else {
                  setNewMovie({
                      title: title.value,
                      subtitle: subtitle.value,
                      genre: genre.value,
                      releaseDate: releaseDate.value,
                      rate: rate.value,
                      description: description.value,
                      cover: cover.files[0],
                      createdBy: email,
                      createdAt: today,
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
                      Gênero
                  </Form.Label>
                  <Form.Select name="genre">
                    { movieGenres.map((genre) => <option value={ genre }>{ genre }</option>) }
                  </Form.Select>
                  <Form.Label>
                      Ano de Lançamento
                  </Form.Label>
                  <Form.Control type="date" name="releaseDate" max={ formated } min='1888-12-12' />
                  <Form.Label> Avaliação </Form.Label>
                  <Row style={ { fontSize: "30px" } }>
                  <StarRatingComponent name="rate" value={ rate } starCount={ 5 } onStarClick={ setRate } />
                  </Row>
                  <Form.Label>
                      Descrição
                  </Form.Label>
                  <Form.Control as="textarea" name="description" style={{ height: '100px' }} />
                  <Form.Label>
                      Capa
                  </Form.Label>
                  <Form.Control type="file" name="cover" />
                    <Button variant="secondary" type="submit"> Adicionar </Button>
              </Form>
          </Row>
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