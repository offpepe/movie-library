import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getMovieById, getMovieCover } from '../services/apiRequests';
import './css/MovieDetails.css';

export default function MovieDetails () {
    const [movie, getMovie] = useState({});
    const [image, setImage] = useState();
    const { id }= useParams();
    useEffect(() => {
      const fetchApi = async () => {
        const movie = await getMovieById(id, getMovie); 
        await getMovieCover(movie.cover, setImage);
      }
      fetchApi();
    },[]);
    const { title, subtitle, description } = movie;
    return (
            <main className="movie-details">
                <section className="movie-details-img">
                { image && <img src={ image.url } alt={` imagem do filme ${title}`} />}
                </section>
                <section className="movie-details-info">
                <div>
                <div className="title-box">
                <h3>{ title }</h3>
                </div>
                <div className="subtitle-box">
                <h4>{ subtitle }</h4>
                </div>
                <div className="description-box">
                <p>{ description }</p>
                </div>
                </div>
                </section>
            </main>
        );
}
