global.fetch = require('cross-fetch');


export const login = async (setToken, email, password) => {
    const log = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        }),
      });
    const login = await log.json();
    setToken(login.token);  
    return login;
  };

export const getMovies = async (setter) => {
  const { movies } = await (await fetch('http://localhost:3000/movies')).json();
  setter(movies);
}

export const getMovieCover = async (filename, setter) => {
  const rawImage = await fetch(`http://localhost:3000/movies/img/${filename}`, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="picture.png"'
    }
  });
  setter(rawImage);
}

export const createNewMovie = async (newMovie, token) => {
    const { title, subtitle, description, cover } = newMovie;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('description', description);
    formData.append('cover', cover);
    const rawResult = await fetch('http://localhost:3000/movies/create', {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
      body: formData,
    });
    const result = await rawResult.json();
    return result;
};

export const getMovieById = async (id, setter) => {
  const movie = await (await fetch(`http://localhost:3000/movies/${id}`)).json();
  setter(movie[0]);
  return movie[0];
} 