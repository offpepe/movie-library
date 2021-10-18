import React from 'react';
import './css/Credits.css';

export default function Credits () {
        return (
            <main className="credits">
              <h1> Movie Library </h1>
              <section className="credits-article">
                  <h5> Obrigado por testar minha aplicação ❤</h5>
                  <article>
                      Aplicação completamente feita por Alan Albuquerque Ferreira Lopes. Esta aplicação faz parte de um projeto com intuíto didático, chama-se Trybe NW+!
                      Resumidamente, Trybe NW+ é onde farei todos os projetos da Trybe desde o Módulo de Front-End.
                  </article>
              </section>
              <nav className="credits-contact">
                  <span><a href="https://www.linkedin.com/in/alanalbuquerq/" target="_blank" rel="noreferrer">
                      <i className="fab fa-linkedin-in" />
                    </a></span>
                  <span><a href="http://github.com/offpepe/" target="_blank" rel="noreferrer">
                      <i className="fab fa-github" />
                  </a></span>
              </nav>
            </main>
        );
}

 