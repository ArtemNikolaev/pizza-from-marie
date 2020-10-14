const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid').v4;
const rp = require('minimal-request-promise');

function createOrder(order) {
	if (!order || !order.pizza || !order.address) {
		throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');
	}

	return rp.post(
		'https://some-like-it-hot.effortless-serverless.com/delivery',
		{
			headers: {
				"Authorizaton": "aunt-marias-pizzeria-1234567890",
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				pickupTime: '15.34pm',
				pickupAddress: 'Aunt Maria Pizzeria',
				deliveryAddress: request.address,
				webhookUrl: 'https://whpcvzntil.execute-api.eu-central-1.amazonaws.com/chapter4_1/delivery',
			}),
		}
	)
		.then(rawResponse => JSON.parse(rawResponse.body))
		.then(response =>
			docClient.put({
				TableName: 'pizza-orders',
				Item: {
					orderId: uuid(),
					pizza: response.pizza,
					address: response.address,
					orderStatus: 'pending',
				}
			}).promise()
		)
		.then(res => {
			console.log('Order is saved!', res);
			return res;
		})
		.catch(err => {
			console.log('Oops, order is not saved :(', err);
			throw err;
		});
}

module.exports = createOrder;
