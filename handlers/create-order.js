const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid').v4;

function createOrder(order) {
	if (!order || !order.pizza || !order.address) {
		throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');
	}

	return docClient.put({
		TableName: 'pizza-orders',
		Item: {
			orderId: uuid(),
			pizza: order.pizza,
			address: order.address,
			orderStatus: 'pending',
		}
	}).promise()
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
