import React, { useContext, useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap'; 
import { useParams, Redirect } from 'react-router-dom'
import UpdateDetailsForm from '../components/UpdateDetailsForm';
import userContext from '../context/userContext';
import MovieDetailsComponent from '../components/MovieDetails';
import { deleteMovie, getMovieById, updateMovie } from '../services/apiRequests';
import './css/MovieDetails.css';

export default function MovieDetails () {
    let { token, email } = useContext(userContext);
    if (!token) {
      token = localStorage.getItem('token');
      email = localStorage.getItem('email');
    }
    const [movie, getMovie] = useState({});
    const [detailStatus, setDetailStatus] = useState('show')
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmation, setConfirmation] = useState(false)
    const [errorAlert, setErrorAlert] = useState(<></>);
    const [showDelError, setShowDelErr] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { id }= useParams();
    useEffect(() => {
      const fetchApi = async () => await getMovieById(id, getMovie); 
      fetchApi();
    },[id]);
    const setAlert = (response, code, message) => (
      <div className="error-popup">
        <Alert variant="danger" onClose={ () => setShowAlert(false) } dismissible>
          <Alert.Heading as="h3">{ `${code} -> ${response}` }</Alert.Heading>
          <p>
            { message }
          </p>
        </Alert>
      </div>
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
      { movie ?  
        <main className="details-main">
        { detailStatus === 'show' ? <>
          <main className="movie-details">
            <MovieDetailsComponent
              movie={ movie }
              showConfirmation={ showConfirmation }
              email={ email }
              handleDelete={ handleDelete }
              setConfirmation={ setConfirmation }
              showDelError={ showDelError }
              errorAlert={ errorAlert }
              setDetailStatus={ setDetailStatus }
              />
          </main>
            </>: <UpdateDetailsForm
              submitFormData={ submitFormData }
              setDetails={ setDetailStatus }
              setAlert={ setShowAlert }
              setError={ setErrorAlert }
              movie={ movie }
              /> }
            { showAlert && errorAlert }
            { redirect && <Redirect to="/" /> }
        </main> :  <div className="spinner-box" > <Spinner style={ { width: '8rem', height: '8rem' } } variant="danger" animation="border" /> </div> }
      </>
        );
}
