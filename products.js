const form = document.getElementById("productForm");
const list = document.getElementById("productList");

// گرفتن اطلاعات محصولات از localStorage یا استفاده از آرایه خالی
let products = JSON.parse(localStorage.getItem("products")) || [];

// ارسال فرم و ذخیره محصول جدید در localStorage
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // گرفتن مقادیر از فیلدهای فرم
  const newProduct = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    category: document.getElementById("category").value,
    stock: document.getElementById("stock").value,
    minStock: document.getElementById("minStock").value,
    barcode: document.getElementById("barcode").value,
  };

  // اضافه کردن محصول به آرایه و ذخیره آن در localStorage
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  // پاک کردن فرم
  form.reset();

  // نمایش مجدد محصولات
  renderProducts();
});

// نمایش محصولات
function renderProducts() {
  list.innerHTML = ""; // پاک کردن لیست محصولات قبلی

  // ایجاد ردیف برای هر محصول
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

// نمایش اولیه محصولات
renderProducts();
