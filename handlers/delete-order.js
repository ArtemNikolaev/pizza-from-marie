const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function deleteOrder(orderId) {
	if (!orderId) {
		throw new Error('To delete order you should bring order id');
	}

	return docClient.delete({
		TableName: 'pizza-orders',
		Key: { orderId },
	}).promise()
		.then(result => {
			console.log(`Order ${orderId} is deleted!`);
			return result;
		})
		.catch(err => {
			console.log('Oops, order is not deleted :(', err);
			throw err;
		})
}

module.exports = deleteOrder;
