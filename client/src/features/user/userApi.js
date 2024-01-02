export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/orders/?user=" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserInfo(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/v1/users/" + userId);
    const data = response.json();
    resolve({ data });
  });
}
