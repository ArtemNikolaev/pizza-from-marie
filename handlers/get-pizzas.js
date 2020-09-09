const pizzas = require('../data/pizzas.json');

function getPizzas(id) {
  if (!id) { return pizzas; }

  const result = pizzas.find(pizza => pizza.id == id);

  if (result) { return result; }

  throw new Error('The pizza you requested was not found!');
}

module.exports = getPizzas;
