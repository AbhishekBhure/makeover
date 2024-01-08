export function fetchLoggedInUserOrders(userId, pagination) {
  let queryStr = "";
  for (let key in pagination) {
    queryStr += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch(
      "/api/v1/order/user/" + userId + "?" + queryStr
    );
    const data = await response.json();
    // const totalOrders = await response.headers.get("X-Total-Count");
    // resolve({ data: { userOrders: data, totalOrders: +totalOrders } });
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

// export function updateLoggedInUser(update) {
//   return new Promise(async (resolve) => {
//     const userId = update.user._id;
//     console.log("userId", userId);
//     const response = await fetch("/api/v1/users/update/" + userId, {
//       method: "PATCH",
//       body: JSON.stringify(update),
//       headers: { "content-type": "application/json" },
//     });
//     const data = response.json();
//     resolve({ data });
//   });
// }
