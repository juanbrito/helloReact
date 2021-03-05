import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Recipes = {
  all: (term, sortByStars, byStarsAscDesc) =>
    requests.get(`/recipes?term=${term}&byStars=${sortByStars}&byStarsAscDesc=${byStarsAscDesc}`),
  updateStars: (id, stars) =>
    requests.put(`/recipes/${id}/stars`, { stars: stars }),
  get: id =>
    requests.get(`/recipes/${id}`)
};

const RecipeIngredients = {
  forRecipe: (id, dinersCount) =>
    requests.get(`/recipes/${id}/ingredients?dinersCount=${dinersCount}`)
};

const RecipeSteps = {
  forRecipe: id =>
    requests.get(`/recipes/${id}/steps`)
};

export default {
  Recipes,
  Auth,
  RecipeIngredients,
  RecipeSteps,
  setToken: _token => { token = _token; }
};
