const Api = require('claudia-api-builder');
const api = new Api();

const getPizzas = require('./handlers/get-pizzas');

api.get('/', () => 'Welcome to Pizza API!');
api.get('/pizzas', () => getPizzas());
api.get(
  '/pizzas/{id}',
  (req) => getPizzas(req.pathParams.id),
  { error: 404 },
);

module.exports = api;
