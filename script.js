function showSection(id) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
}

// دسته‌بندی‌ها
let categories = [];

document.getElementById("categoryForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("cname").value.trim();
  if (!name) return;

  categories.push(name);
  renderCategories();
  this.reset();
});

function renderCategories() {
  const list = document.getElementById("categoryList");
  list.innerHTML = "";
  categories.forEach((name, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td><button onclick="deleteCategory(${index})">❌</button></td>
    `;
    list.appendChild(row);
  });
}

function deleteCategory(index) {
  categories.splice(index, 1);
  renderCategories();
}

// محصولات
let products = [];

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("pname").value.trim();
  const category = document.getElementById("pcategory").value.trim();
  const price = document.getElementById("pprice").value;
  const stock = document.getElementById("pstock").value;
  const barcode = document.getElementById("pbarcode").value.trim();

  if (!name || !category || !price || !stock) return;

  products.push({ name, category, price, stock, barcode });
  renderProducts();
  this.reset();
});

function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>${product.barcode || "-"}</td>
      <td><button onclick="deleteProduct(${index})">❌</button></td>
    `;
    list.appendChild(row);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  renderProducts();
}

// اسکن بارکد
let scannerStream;
document.getElementById("startScan").addEventListener("click", async function () {
  const video = document.getElementById("scanner");

  try {
    scannerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = scannerStream;
  } catch (err) {
    alert("خطا در دسترسی به دوربین: " + err.message);
  }
});
