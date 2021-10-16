import React from 'react';
import './css/NotFound.css'

export default function NotFound () {
    return (
        <main className="not-found-main">
            <h1><i class="fas fa-times-circle"></i></h1>
            <h2> Caminho não encontrado :\ </h2>
            <h4> Isto ocorre normalmente quando está perdido, mas pode ser falha do programador! </h4>
            <h6> Caso acredite que seja uma falha, <a href="https://www.linkedin.com/in/alanalbuquerq/" target="_blank" rel="noreferrer" >dê o feedback aqui!</a> </h6>
        </main>
    );
}