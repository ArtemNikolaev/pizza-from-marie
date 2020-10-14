const Api = require('claudia-api-builder');
const api = new Api();

const getOrders = require('./handlers/get-orders');
const createOrder = require('./handlers/create-order');
const updateOrder = require('./handlers/update-order');
const deleteOrder = require('./handlers/delete-order');
const updateDeliveryStatus = require('./handlers/update-delivery-status');

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
	{
		success: 200,
		error: 404
	},
);

api.post(
	'/delivery', req => updateDeliveryStatus(req.body),
	{
		success: 200,
		error: 400,
	}
)

module.exports = api;
