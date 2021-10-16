import React, { useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { createAccount } from '../services/apiRequests';
import './css/SignIn.css';

export default function SignIn () {
    const [redirect, setRedirect] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errAlert, setErrAlert] = useState(<></>);

    const setAlert = (response, code, message) => (
        <Alert variant="danger" onClose={ () => setShowAlert(false) } dismissible>
          <Alert.Heading as="h3">{ `${code} -> ${response}` }</Alert.Heading>
          <p>
            { message }
          </p>
        </Alert>
      );
        return (
            <main className="sign-in-main">
                <Container className="sign-in-conteiner" style={ { paddingTop: "20px" } }>
                  <h1 style={ { textAlign: "center" } }> Criar usuário </h1>
                  <Form onSubmit={ async (ev) => {
                      ev.preventDefault();
                      const { email, username, type, password } = ev.target;
                      if (!email.value || !username.value || !type.value || !password.value) {
                          alert('todos os campos precisam ser preenchidos');
                      } else {
                          const formData = {
                            email: email.value,
                            username: username.value,
                            type: type.value,
                            password: password.value,
                          };
                          const response = await createAccount(formData);
                          if (response.error) {
                            setErrAlert(setAlert(response.error, response.code, response.message));
                            setShowAlert(true);
                          } else {
                            setErrAlert(
                            <Alert variant="success" onClose={ () => setShowAlert(false) }>
                             <Alert.Heading>
                                { response.success }
                             </Alert.Heading>
                             { `Id de criação: ${response.insertedId}` }
                            </Alert>);
                            setShowAlert(true);
                            setTimeout(() => setRedirect(true), 500);
                          }
                      }
                  } }>
                      <Form.Label> <h5>E-mail</h5> </Form.Label>
                      <Form.Control type="email" name="email" placeholder="linus_torvalds@windowsucks.gnu.com"  />
                      <Form.Label> <h5>Nome de usuário</h5> </Form.Label>
                      <Form.Control type="text" name="username" placeholder="linus_gate_killer_69" />
                      <Form.Label> <h5>Tipo</h5> </Form.Label>
                      <Form.Select name="type">
                      <option value="reader"> Leitor </option>
                      <option value="creator"> Criador </option>
                      <option value="admin"> Administrador </option>
                      </Form.Select>
                      <Form.Label> <h5>Senha</h5> </Form.Label>
                      <Form.Control type="password" name="password" />
                      <div className="sign-in-buttonGroup">
                      <Button type="submit" variant="success"> Concluir </Button>
                      <Button type="button" onClick={ () => setRedirect(true) }> Voltar </Button>
                      </div>
                  </Form>
                 { showAlert && errAlert  }
                </Container>
                { redirect && <Redirect to="/movies" /> }
            </main>
        );
}