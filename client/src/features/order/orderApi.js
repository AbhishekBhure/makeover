export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/order",
      {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryStr = "";

  for (let key in sort) {
    queryStr += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryStr += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/order?" + queryStr
    );
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

export function updateOrderStatus(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/order/" + order.id,
      {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
