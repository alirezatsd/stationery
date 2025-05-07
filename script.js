let products = JSON.parse(localStorage.getItem('products')) || [];

function addProduct() {
  const name = document.getElementById('productName').value.trim();
  const price = document.getElementById('productPrice').value.trim();
  const category = document.getElementById('productCategory').value.trim();
  const barcode = document.getElementById('productBarcode').value.trim();

  if (!name || !price || !category) {
    alert('لطفاً تمام فیلدها را پر کنید');
    return;
  }

  products.push({ name, price, category, barcode });
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();

  // پاک کردن فیلدها
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productCategory').value = '';
  document.getElementById('productBarcode').value = '';
}

function renderProducts() {
  const list = document.getElementById('productList');
  list.innerHTML = '';

  products.forEach((product, index) => {
    const item = document.createElement('li');
    item.textContent = `📦 ${product.name} | 💰 ${product.price} | 🗂️ ${product.category} | بارکد: ${product.barcode || '---'}`;
    list.appendChild(item);
  });
}

// فعال کردن اسکن بارکد
function startScanner() {
  const video = document.getElementById('scanner');
  video.style.display = 'block';

  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: video,
      constraints: {
        facingMode: "environment"
      }
    },
    decoder: {
      readers: ["ean_reader", "code_128_reader", "upc_reader"]
    }
  }, function (err) {
    if (err) {
      console.error(err);
      alert("خطا در راه‌اندازی دوربین");
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected(function (data) {
    const code = data.codeResult.code;
    document.getElementById("productBarcode").value = code;
    Quagga.stop();
    video.style.display = 'none';
  });
}

// نمایش محصولات در شروع
renderProducts();
