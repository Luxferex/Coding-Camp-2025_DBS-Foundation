function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}

// TODO: buatlah variabel yang menampung data orders
let orders = [];

// TODO: selesaikan fungsi addOrder
function addOrder(customerName, items) {
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  const newOrder = {
    id: generateUniqueId(),
    customerName: customerName,
    items: items,
    totalPrice: totalPrice,
    status: 'Menunggu',
  };

  orders.push(newOrder);

  return newOrder;
}

// TODO: selesaikan fungsi updateOrderStatus
function updateOrderStatus(orderId, status) {
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id === orderId) {
      orders[i].status = status;
      return orders[i];
    }
  }

  return null;
}

// TODO: selesaikan fungsi calculateTotalRevenue dari order yang berstatus Selesai
function calculateTotalRevenue() {
  let totalRevenue = 0;

  for (const order of orders) {
    if (order.status === 'Selesai') {
      totalRevenue += order.totalPrice;
    }
  }

  return totalRevenue;
}

// TODO: selesaikan fungsi deleteOrder
function deleteOrder(id) {
  let orderIndex = -1;

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id === id) {
      orderIndex = i;
      break;
    }
  }

  if (orderIndex !== -1) {
    const removedOrder = orders[orderIndex];
    orders.splice(orderIndex, 1);
    return removedOrder;
  }

  return null;
}

export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
