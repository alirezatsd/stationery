let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];

function renderCart() {
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("totalPrice");
  list.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += parseInt(item.price);
    const li = document.createElement("li");
    li.textContent = `🛒 ${item.name} - ${item.price} تومان`;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
      cart.splice(index, 1);
      renderCart();
    };

    li.appendChild(btn);
    list.appendChild(li);
  });

  totalEl.textContent = total;
}

function addByBarcode() {
  const input = document.getElementById("barcodeInput");
  const barcode = input.value.trim();
  input.value = "";

  if (!barcode) return;

  const found = products.find(p => p.barcode === barcode);
  if (found) {
    cart.push(found);
    renderCart();
  } else {
    alert("محصولی با این بارکد پیدا نشد!");
  }
}

function submitInvoice() {
  if (cart.length === 0) {
    alert("سبد خرید خالی است!");
    return;
  }

  const invoice = {
    date: new Date().toLocaleString(),
    items: cart,
    total: cart.reduce((sum, i) => sum + parseInt(i.price), 0)
  };

  console.log("فاکتور ثبت شد:", invoice);
  alert("✅ فاکتور ثبت شد!");
  cart = [];
  renderCart();
}
