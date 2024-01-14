export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TO-DO we will not hard-code server URL here
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/products"
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    //TO-DO we will not hard-code server URL here
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/products",
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(
  filter,
  sort,
  pagination,
  admin,
  searchTerm
) {
  //filter obj filter = {"category":["face","eyes",'lips' ]}
  //sort = {_sort="price", _order="desc"}
  //pagination = {_page=1, _limit=10}
  //TO-DO: on server we will support multi values
  //TODO: Server will filter deleted Products in case of non-admin

  let queryStr = "";

  if (searchTerm) {
    queryStr += `searchTerm=${searchTerm}&`;
  }

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryStr += `${key}=${categoryValues}&`;
    }
  }

  for (let key in sort) {
    queryStr += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryStr += `${key}=${pagination[key]}&`;
  }

  if (admin) {
    queryStr += "admin=true";
  }

  return new Promise(async (resolve) => {
    //TO-DO we will not hard-code server URL here
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/products?" + queryStr
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/categories"
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/brands"
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://makeover-backend.onrender.com/api/v1/products/" + id
    );
    const data = await response.json();
    resolve({ data });
  });
}
