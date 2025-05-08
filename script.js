let products = [];

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("pname").value.trim();
  const price = parseFloat(document.getElementById("pprice").value);
  const stock = parseInt(document.getElementById("pstock").value);
  const barcode = document.getElementById("pbarcode").value.trim();

  if (!name || isNaN(price) || isNaN(stock)) {
    alert("لطفاً تمام فیلدها را به‌درستی پر کنید.");
    return;
  }

  const product = { name, price, stock, barcode };
  products.push(product);
  renderProductList();
  this.reset();
});

function renderProductList() {
  const tbody = document.querySelector("#productList tbody");
  tbody.innerHTML = "";
  products.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>${p.stock}</td>
      <td>${p.barcode || "-"}</td>
    `;
    tbody.appendChild(row);
  });
}

function navigateTo(sectionId) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}

// بارکد اسکنر
let scanner = null;

function startScanner() {
  const scannerDiv = document.getElementById("scanner");
  scannerDiv.classList.remove("hidden");
  if (!scanner) {
    scanner = new Html5Qrcode("scanner");
  }

  Html5Qrcode.getCameras()
    .then(cameras => {
      if (cameras && cameras.length) {
        const cameraId = cameras[0].id;
        scanner.start(
          cameraId,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            document.getElementById("pbarcode").value = decodedText;
            scanner.stop().then(() => {
              scanner.clear();
              scannerDiv.classList.add("hidden");
            });
          },
          error => {
            // Ignore scan errors
          }
        );
      }
    })
    .catch(err => {
      alert("خطا در دسترسی به دوربین: " + err);
    });
}
