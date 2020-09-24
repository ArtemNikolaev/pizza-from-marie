const Api = require('claudia-api-builder');
const api = new Api();

const getOrders = require('./handlers/get-orders');
const createOrder = require('./handlers/create-order');
const updateOrder = require('./handlers/update-order');
const deleteOrder = require('./handlers/delete-order');

api.get('/', () => 'Welcome to Pizza API!');

api.get('/orders', () => getOrders());

api.get(
  '/orders/{id}',
  (request) => getOrders(request.pathParams.id),
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

api.put(
	'/orders/{id}',
	request => updateOrder(request.pathParams.id, request.body),
	{
		success: 201,
		error: 400,
	},
);

api.delete(
	'/orders/{id}',
	(request) => deleteOrder(request.pathParams.id),
	{ error: 404 },
);

module.exports = api;
