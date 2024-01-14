export function fetchAddressByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/address?user=" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function addAddress(address) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/address",
      {
        method: "POST",
        body: JSON.stringify(address),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

//Edit Address
export function editAddress(address) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/address/editAddress/" +
        address._id,
      {
        method: "PATCH",
        body: JSON.stringify(address),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

//Delete Address
export function deleteAddress(addressId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/address/deleteAddress/" +
        addressId,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data: { _id: addressId } });
  });
}
