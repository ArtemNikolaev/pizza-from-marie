const Api = require('claudia-api-builder');
const api = new Api();

const getOrders = require('./handlers/get-orders');
const createOrder = require('./handlers/create-order');

api.get('/', () => 'Welcome to Pizza API!');

api.get('/orders', () => getOrders());
api.get(
  '/orders/{id}',
  (req) => getOrders(req.pathParams.id),
  { error: 404 },
);
api.post(
	'/orders',
	request => createOrder(request.body),
	{
		success: 201,
		error: 400,
	},
);

module.exports = api;
