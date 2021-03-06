global.fetch = require('cross-fetch');


export const login = async (setToken, email, password) => {
    const log = await fetch('https://movie-library-api.herokuapp.com/users/login', {
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
    localStorage.setItem('token', login.token);
    localStorage.setItem('email', email);
    return login;
  };

export const createAccount = async (formData) => {
  const create = await fetch('https://movie-library-api.herokuapp.com/users/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  });
  const response = await create.json();
  return response;
};

export const getUserByEmail = async (email) => {
  const rawUser = await fetch(`https://movie-library-api.herokuapp.com/users/${email}`);
  const user = await rawUser.json();
  return user;
};

export const getMovies = async (setter) => {
  const { movies } = await (await fetch('https://movie-library-api.herokuapp.com/movies')).json();
  setter(movies);
};

export const createNewMovie = async (newMovie, token) => {
    const { title, subtitle, genre, releaseDate, rate, description, cover, createdBy, createdAt } = newMovie;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('genre', genre);
    formData.append('releaseDate', releaseDate);
    formData.append('rate', rate);
    formData.append('description', description);
    formData.append('createdAt', createdAt);
    formData.append('createdBy', createdBy);
    formData.append('cover', cover);
    const rawResult = await fetch('https://movie-library-api.herokuapp.com/movies/create', {
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
  const movie = await (await fetch(`https://movie-library-api.herokuapp.com/movies/${id}`)).json();
  setter(movie[0]);
  return movie[0];
};

export const updateMovie = async (id, token, updatedFields) => {
  const rawResponse = await fetch(`https://movie-library-api.herokuapp.com/movies/update/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': token,
    },
    body: updatedFields,
  });
  const response = await rawResponse.json();
  return response;
};

export const deleteMovie = async (id, token) => {
  const rawResponse = await fetch(`https://movie-library-api.herokuapp.com/movies/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token,
    },
  });
  const response = await rawResponse.json();
  return response;
};

export const validateToken = async (token) => {
  const rawResponse = await fetch(`https://movie-library-api.herokuapp.com/users/validate/${token}`);
  const response = rawResponse.json();
  return response;
};