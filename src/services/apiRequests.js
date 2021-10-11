global.fetch = require('cross-fetch');

export const getMovies = async (setter) => {
    const { movies } = await (await fetch('http://localhost:3000/movies')).json();
    if (movies) {
      setter(movies);
      return true
    } else {
      return false;
    };
}

export const login = async (setToken, email, password) => {
    const log = await fetch('localhost:3000/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
    });
    const login = await log.json();
    if(login.success) {
      setToken(login.token);
      return true;
    } else {
      return false;
    };
};