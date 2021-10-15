import React, { useContext, useEffect, useState } from 'react';
import { Button, Alert, Card } from 'react-bootstrap'; 
import { useParams, Redirect } from 'react-router-dom'
import UpdateDetailsForm from '../components/UpdateDetailsForm';
import userContext from '../context/userContext';
import { deleteMovie, getMovieById, getMovieCover, updateMovie } from '../services/apiRequests';
import './css/MovieDetails.css';

export default function MovieDetails () {
    let { token } = useContext(userContext);
    if (!token) {
      token = localStorage.getItem('token');
    }
    const [movie, getMovie] = useState({});
    const [image, setImage] = useState();
    const [detailStatus, setDetailStatus] = useState('show')
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmation, setConfirmation] = useState(false)
    const [errorAlert, setErrorAlert] = useState(<></>);
    const [showDelError, setShowDelErr] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { id }= useParams();
    useEffect(() => {
      const fetchApi = async () => {
        const movie = await getMovieById(id, getMovie); 
        await getMovieCover(movie.cover, setImage);
      }
      fetchApi();
    },[id]);
    const { title, subtitle, description } = movie;
    const setAlert = (response, code, message) => (
        <Alert variant="danger" onClose={ () => setShowAlert(false) } dismissible>
          <Alert.Heading as="h3">{ `${code} -> ${response}` }</Alert.Heading>
          <p>
            { message }
          </p>
        </Alert>
      );

      const setDelAlert = (response, code, message) => (
        <Alert variant="danger" onClose={ () => setShowDelErr(false) } dismissible>
          <Alert.Heading as="h3">{ `${code} -> ${response}` }</Alert.Heading>
          <p>
            { message }
          </p>
        </Alert>
      );
      
    const submitFormData = async (form) => {
      const updated = await updateMovie(id, token, form);
      if(updated.success) {
        getMovie(updated.result);
        setDetailStatus('show');
      }
      if(updated.error) {
        setErrorAlert(setAlert(updated.error, updated.code, updated.message));
          setShowAlert(true);
      }
    }

    const handleDelete = async () => {
      const operation = await deleteMovie(id, token);
      if (operation.error) {
        setErrorAlert(setDelAlert(operation.error, operation.code, operation.message));
        setShowDelErr(true);
      } else {
        setErrorAlert(<Alert variant="success">{ operation.success }</Alert>)
        setShowDelErr(true);
        setTimeout(() => setRedirect(true), 400);
      }
    }

    return (
        <>
        { detailStatus === 'show' ? <>
          <main className="movie-details">
            <section className="movie-details-img">
              { image && <img src={ image.url } alt={` imagem do filme ${title}`} />}
            </section>
            <section className="movie-details-info">
            <div className="title-box">
              <h3>{ title }</h3>
            </div>
            <div className="subtitle-box">
              <h4>{ subtitle }</h4>
            </div>
            <div className="description-box">
              <p>{ description }</p>
            </div>
            </section>
            </main>
            <section className="action-buttons">
                  <Button variant="primary" size="lg" onClick={ () => setDetailStatus('update') }>
                    Editar
                  </Button>
                  <Button onClick={ () => setConfirmation(true) } variant="danger" size="lg">
                    Deletar
                  </Button>
              </section>
            </>: <UpdateDetailsForm
              submitFormData={ submitFormData }
              setDetails={ setDetailStatus }
              setAlert={ setShowAlert }
              setError={ setErrorAlert }
              /> }
            { showAlert && errorAlert }
            { showConfirmation && 
            <section className="delete-box" >
              <Card className="delete-card" >
                  <Card.Header className="delete-card-header">
                  <Card.Title> Está certo em deletar este filme? </Card.Title>
                  </Card.Header>
                  <Card.Body>
                  <Card.Subtitle> Esta operação é irreversível! </Card.Subtitle>
                  </Card.Body>
                  <Card.Footer className="delete-card-footer">
                    <Button onClick={ () => handleDelete() } variant="danger"> Sim </Button>
                    <Button onClick={ () => setConfirmation(false) }  variant="info"> Não </Button>
                  </Card.Footer>
                  { showDelError && errorAlert }
              </Card> 
            </section>}
            { redirect && <Redirect to="/movies" /> }
        </>
        );
}
