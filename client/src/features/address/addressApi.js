export function fetchAddressByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/v1/address?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function addAddress(address) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/v1/address", {
      method: "POST",
      body: JSON.stringify(address),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
