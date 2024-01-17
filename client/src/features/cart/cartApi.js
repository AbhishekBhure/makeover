export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/cart",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCartItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/cart?user=" + userId
    );
    const data = response.json();
    resolve({ data });
  });
}

export function updateItems(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/cart/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemsFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/cart/" + itemId,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchCartItemsByUserId(userId);
    const items = await response.data;
    for (let item of items) {
      await deleteItemsFromCart(item.id);
    }
    resolve({ status: "success" });
  });
}
