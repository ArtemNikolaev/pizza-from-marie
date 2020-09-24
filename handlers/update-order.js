const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function updateOrder(orderId, options) {
	if (!options || !options.pizza || !options.address) {
		throw new Error('To order pizza please provide pizza type and address where pizza should be delivered');
	}

	return docClient.update({
		TableName: 'pizza-orders',
		Key: { orderId },
		UpdateExpression: 'set pizza = :p, address= :a',
		ExpressionAttributeValues: {
			':p': options.pizza,
			':a': options.address,
		},
		ReturnValues: 'ALL_NEW',
	}).promise()
		.then(result => {
			console.log(`Order ${orderId} updated!`, result);
			return result.Attributes;
		})
		.catch(err => console.log('Oops, order is not updated :(', err));
}

module.exports = updateOrder;
