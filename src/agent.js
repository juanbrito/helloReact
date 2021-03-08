import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000/api';

const responseBody = res => res.body;

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody)
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
  RecipeIngredients,
  RecipeSteps
};
