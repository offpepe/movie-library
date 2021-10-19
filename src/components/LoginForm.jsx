import React, { useState } from 'react';
import { Form, FormGroup, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from '../services/apiRequests';

export default function LoginForm ({ setToken, setEmail })  {
  const [err, setErr] = useState({});
  const [showErr, setShowErr] = useState(false);
  
  return (
    <Form className="login-form" onSubmit={ async (ev) => {
      ev.preventDefault();
      const { email, password } = ev.target;
      const log = await login(setToken, email.value, password.value);
      if (log.error) {
        setErr(log);
        setShowErr(true);
      } else {
        setEmail(email);
        window.location.reload();
      }
      } }>
        <FormGroup className="login-form-group" style={ { margin: '10px 0' } } >
        <p className="control has-icons-left has-icons-right">
         <Form.Control className="input" type="email" name="email" placeholder="adalovelance@betrybe.com" />
         <span className="icon is-small is-left">
           <i className="fas fa-envelope"></i>
         </span>
        <p style={ { fontSize: '10px', margin: '3px' } }><Link to="/signIn" style={ { textDecoration: 'none' } }>Não possui conta? Clique aqui! </Link></p>
        </p>
        <p className="control has-icons-left has-icons-right">
         <Form.Control className="input" type="password" name="password" placeholder="Your password" />
         <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
         </span>
         <p style={ { fontSize: '10px', margin: '3px'  } }><Link to="/reset" style={ { textDecoration: 'none' } }> Esqueci minha senha </Link></p>
        </p>
        <span className="form-button-box">
        <Button variant="success" type="submit"> Logar </Button>
        </span>
        <div>
        { showErr && <Alert
        variant="danger"
        onClose={ () => setShowErr(false) }
        style={ { width: '100%',
          textAlign: 'center',
         } }
        dismissible
        >
          <Alert.Heading>{ `Erro ${err.code}` }</Alert.Heading>
          <Alert.Heading>{ err.error }</Alert.Heading>
          <p> { err.message } </p>
        </Alert>}
        </div>
        </FormGroup>
      </Form>
    );
}

LoginForm.propTypes = {

};