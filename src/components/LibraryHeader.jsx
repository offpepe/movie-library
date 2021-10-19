import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userContext from '../context/userContext';
import { getUserByEmail } from '../services/apiRequests';
import LoginForm from './LoginForm';
import UserCard from './UserCard';

export default function LibraryHeader () {
  let { email, setToken, setEmail } = useContext(userContext);
  const [user, setUser] = useState({});
  const [showCredits, handleShow] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserByEmail(email);
      setUser(userData.result);
    }
    fetchUser();
  },[email]);
  const loggout = () => {
    setToken('');
    setEmail('');
    localStorage.clear();
  };

    return (
        <header className="library-header">
            <div className="logo-conteiner" style={ { color: 'yellow', fontSize: '30px' } }>
                <i className="fas fa-play" />
            </div>
            <div style={ { color: 'white' } } >
                <h1> Movie Library </h1>
            </div>
            <nav className="button-group">
                { email && <Link to="/create" style={ { textDecoration: 'none' } } >
                  <h5 style={ { color: 'white' } }><i class="fas fa-plus"/></h5>
                </Link> }
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    <h5 style={ { color: 'white' } }><i className="fas fa-user-circle"/></h5>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="userMenu">
                { email && user ? <UserCard user={ user } loggout={ loggout } /> : <LoginForm setToken={ setToken } setEmail={ setEmail } /> }
                  </Dropdown.Menu>
                  </Dropdown> 
                  <h5 onClick={ () => handleShow(true) } style={ { color: 'white', fontSize: '40px' } }><i className="fas fa-info-circle"></i></h5>

                  <Offcanvas variant="danger" className="credit-canva" show={ showCredits } placement="end" onHide={ handleShow } >
                    <Offcanvas.Header closeButton >
                      <Offcanvas.Title> Creditos </Offcanvas.Title>
                      </Offcanvas.Header>
                    <Offcanvas.Body>
                    <h5 style={ { margin: '30px 0' } }> Obrigado por testar minha aplicação ❤ </h5>
                    <p style={ { textAlign: 'justify' } } >
                      Aplicação completamente feita por Alan Albuquerque Ferreira Lopes. Esta aplicação faz parte de um projeto com intuíto didático, chama-se Trybe NW+!<br/>
                      Resumidamente, Trybe NW+ é onde farei todos os projetos da Trybe desde o Módulo de Front-End.</p>
                      <nav className="credits-footer">
                        <span><a href="https://www.linkedin.com/in/alanalbuquerq/" target="_blank" rel="noreferrer">
                          <i className="fab fa-linkedin-in" />
                          </a></span>
                          <span><a href="http://github.com/offpepe/" target="_blank" rel="noreferrer">
                              <i className="fab fa-github" />
                          </a></span>
                      </nav>
                    </Offcanvas.Body>
                  </Offcanvas>
            </nav>
        </header>
    );
}