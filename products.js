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
  list.innerHTML = "";
  products.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `📦 ${p.name} (${p.category}) - 💰 ${p.price} تومان - موجودی: ${p.stock} - بارکد: ${p.barcode}`;
    list.appendChild(li);
  });
}

renderProducts();
