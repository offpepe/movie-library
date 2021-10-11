import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button  } from 'react-bootstrap';

export default function Login () {
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
                              <Form.Control type="email" placeholder="ada_love_1815@betrybe.com"/>
                              <Form.Label> Password </Form.Label>
                              <Form.Control type="password" placeholder="Senha"/>
                          </Form.Group>
                      </Form>
                  </Col>
                  <Row>
                      <Form.Check type="checkbox" label="Mantenha-me logado" />
                      <Button variant="success" type="button" />
                  </Row>
              </Container>
            </main>
        );
    }

// Login.propTypes = {

// };