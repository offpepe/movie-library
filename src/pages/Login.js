import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Alert  } from 'react-bootstrap';
import userContext from '../context/userContext';
import { login } from '../services/apiRequests';
import { Redirect } from 'react-router';

export default function Login () {
    const [userEmail, userSetEmail] = useState('');
    const [userPassword, userSetPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState(<p> atenção: </p>);
    const [redirect, setRedicrect] = useState(false);
    const { setEmail, setToken } = useContext(userContext);

    const logIn = async (e, p) => {
      const log = await login(setToken, e, p);
      if (log.error) {
        setAlert(<Alert variant="danger">
            <h3>Erro: { log.error }</h3>
            <p>Código: { log.code }</p>
            <p>Mensagem: { log.message }</p>
        </Alert>);
        setShowAlert(true);
      }
      if (log.success) {
        setAlert(<Alert variant="success">
          <p> { log.message }</p>
        </Alert>);
        setShowAlert(true);
        setEmail(e);
        setRedicrect(true);
      }
      await setTimeout(() => {
        setShowAlert(false)
      }, 3000);
    }
        return (
            <main>
              <Container>
                  <Col>
                      <h1> Movie Library </h1>
                      <Form>
                          <Form.Group controlId="userLogin">
                              <Form.Label>
                                  E-mail
                              </Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="ada_love_1815@betrybe.com"
                                onChange={ (ev) => userSetEmail(ev.target.value) }
                              />
                              <Form.Label> Password </Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="Senha"
                                onChange={ (ev) => userSetPassword(ev.target.value) }
                                />
                          </Form.Group>
                      </Form>
                  </Col>
                  <Row>
                      <Form.Check type="checkbox" label="Mantenha-me logado" />
                      <Button
                        variant="outline-primary"
                        type="button"
                        onClick={ () => logIn(userEmail, userPassword) }
                      >
                        Login
                      </Button>
                  </Row>                      
              </Container>
              { showAlert && alert }
              { redirect && <Redirect to="/movies" /> }
            </main>
        );
    }

// Login.propTypes = {

// };