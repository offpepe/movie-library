import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function LibraryHeader () {
    return (
        <header className="library-header">
            <div className="logo-conteiner" style={ { color: 'yellow', fontSize: '30px' } }>
                <i class="fas fa-play" />
            </div>
            <div style={ { color: 'white' } } >
                <h1> Movie Library </h1>
            </div>
            <ButtonGroup>
              <Button
                variant="light"
              >
                <Link to="/movies/create" style={ { textDecoration: 'none', color: 'black' } } >
                  <h5><i class="fas fa-plus"/></h5>
                </Link>
              </Button>
              <Button
                variant="light"
              >
                <Link to="/users" style={ { textDecoration: 'none', color: 'black' } } >
                 <h5><i class="fas fa-user-circle"/></h5>
                </Link>
              </Button>

            </ButtonGroup>
        </header>
    );
}