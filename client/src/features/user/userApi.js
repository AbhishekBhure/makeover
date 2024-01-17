export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/order/user/" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserInfo(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/users/" + userId
    );
    const data = response.json();
    resolve({ data });
  });
}
