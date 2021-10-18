import React, { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userContext from '../context/userContext';
import { getUserByEmail } from '../services/apiRequests';
import LoginForm from './LoginForm';
import UserCard from './UserCard';

export default function LibraryHeader () {
  let { email, setToken, setEmail } = useContext(userContext);
  const [user, setUser] = useState({});
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
                { email && <Link to="/movies/create" style={ { textDecoration: 'none' } } >
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
                  <Link to="/credits" style={ { textDecoration: 'none' } } >
                  <h5 style={ { color: 'white', fontSize: '40px' } }><i className="fas fa-info-circle"></i></h5>
                </Link> 
            </nav>
        </header>
    );
}