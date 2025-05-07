let products = JSON.parse(localStorage.getItem("products")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderCategoriesInForm() {
  const select = document.getElementById("productCategory");
  select.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function renderProducts(filter = "") {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products
    .filter(p => p.name.includes(filter))
    .forEach((product, index) => {
      const li = document.createElement("li");
      li.innerHTML = `📦 ${product.name} | 💰 ${product.price} | 🏷️ ${product.category} ${product.barcode ? `| 🔢 ${product.barcode}` : ""}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.onclick = () => {
        if (confirm("حذف شود؟")) {
          products.splice(index, 1);
          saveProducts();
          renderProducts();
        }
      };

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
}

document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const barcode = document.getElementById("productBarcode").value.trim();
  const category = document.getElementById("productCategory").value;

  if (name && price && category) {
    products.push({ name, price, barcode, category });
    saveProducts();
    renderProducts();
    e.target.reset();
  }
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  renderProducts(e.target.value.trim());
});

renderCategoriesInForm();
renderProducts();
