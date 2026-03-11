const orders = [
  { orderId: 1, customer: 'John', item: 'Laptop', price: 1000 },
  { orderId: 1, customer: 'John', item: 'Mouse', price: 50 },
  { orderId: 2, customer: 'Jane', item: 'Monitor', price: 500 },
  { orderId: 2, customer: 'Jane', item: 'Keyboard', price: 100 }
];

const result = orders.reduce((acc, order) => {
  const { orderId, customer, item, price } = order;

  if (!acc[orderId]) {
    acc[orderId] = {
      customer: customer,
      items: [],
      total: 0
    };
  }

  acc[orderId].items.push(item);
  acc[orderId].total += price;

  return acc;
}, {});

console.log(result);