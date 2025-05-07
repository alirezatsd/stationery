const form = document.getElementById("productForm");
const list = document.getElementById("productList");

let products = JSON.parse(localStorage.getItem("products")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    category: document.getElementById("category").value,
    stock: document.getElementById("stock").value,
    minStock: document.getElementById("minStock").value,
    barcode: document.getElementById("barcode").value,
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  form.reset();
  renderProducts();
});

function renderProducts() {
  list.innerHTML = "";  // Clear the current list

  products.forEach((product) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price} تومان</td>
      <td>${product.category}</td>
      <td>${product.stock}</td>
      <td>${product.barcode}</td>
    `;

    list.appendChild(tr);
  });
}

renderProducts();
