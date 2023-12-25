export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TO-DO we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter) {
  //filter obj filter = {"category":"smartphone"}
  //TO-DO: on server we will support multi values
  let queryStr = "";
  for (let key in filter) {
    queryStr += `${key}=${filter[key]}&`;
  }
  return new Promise(async (resolve) => {
    //TO-DO we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products?" + queryStr);
    const data = await response.json();
    resolve({ data });
  });
}
