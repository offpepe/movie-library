import React, { useContext, useEffect, useState } from 'react';
import { Container, Col as Row, Form, Button, Alert  } from 'react-bootstrap';
import { Redirect } from 'react-router';
import StarRatingComponent from 'react-star-rating-component';
import MovieCardPreview from '../components/MovieCardPreview';
import userContext from '../context/userContext';
import { createNewMovie, getUserByEmail } from '../services/apiRequests';
import './css/CreateMovie.css';

export default function CreateMovie () {
    let { token, email } = useContext(userContext);
    if (!token || !email) {
      token = localStorage.getItem('token');
      email = localStorage.getItem('email');
    }
    const [user, getUser] = useState({});
    const [newMovie, setNewMovie] = useState({});
    const [dispatchCard, setDispatch] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [alert, setAlert] = useState({});
    const [inputError, setInputError] = useState(false);
    const [rate, setRate] = useState(1);
    const [movieGenres] = useState(['Animação', 'Comédia', 'Comédia Romântica', 'Ação', 'Policial', 'Documentário', 'Drama', 'Faroeste', 'Ficção Científica', 'Musical', 'Suspense', 'Terror / Horror']);
    
    useEffect(() => {
      const fetchUser = async () => {
        const userData = await getUserByEmail(email);
        getUser(userData.result);
      }
      fetchUser();
    },[email])
    
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

    const date = new Date().toLocaleDateString("pt-BR");

    return (
    <>
      <Container className="create-movie-main">
        <div style={ { padding: '30px 0' } }>
          <Row style={ { textAlign: 'center' } }>
            <h1> Adicionar novo filme </h1>
          </Row>
          <Row className="create-movie-form">
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
                      createdBy: user.username,
                      createdAt: date,
                  });       
                  setDispatch(true);
                  }
              } }>
                  <Form.Label>
                    <h4>Título</h4>
                  </Form.Label>
                  <Form.Control type="text" name="title"/>
                  <Form.Label>
                      <h4>Subtítulo</h4>
                  </Form.Label>
                  <Form.Control type="text" name="subtitle" />
                  <Form.Label>
                      <h4>Gênero</h4>
                  </Form.Label>
                  <Form.Select name="genre">
                    { movieGenres.map((genre) => <option value={ genre }>{ genre }</option>) }
                  </Form.Select>
                  <Form.Label>
                      <h4>Data de lançamento</h4>
                  </Form.Label>
                  <Form.Control type="date" name="releaseDate" max={ date } min='1888-12-12' />
                  <Form.Label> <h4>Avaliação</h4> </Form.Label>
                  <Row style={ { fontSize: "30px" } }>
                  <StarRatingComponent name="rate" value={ rate } starCount={ 5 } onStarClick={ setRate } />
                  </Row>
                  <Form.Label>
                  <h4>Descrição</h4>
                  </Form.Label>
                  <Form.Control as="textarea" name="description" style={{ height: '100px' }} />
                  <Form.Label>
                  <h4>Capa</h4>
                  </Form.Label>
                  <Form.Control type="file" name="cover" />
                    <Button variant="secondary" type="submit"> Adicionar </Button>
              </Form>
          </Row>
          { inputError  && <Alert variant="warning" onClose={ () => setInputError   (false) } dismissible >
              <Alert.Heading> Todos os campos precisam ser preenchidos </Alert.Heading>
              </Alert>}
        </div>
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
      { redirect && <Redirect to="/" /> }
    </> 
    );
}