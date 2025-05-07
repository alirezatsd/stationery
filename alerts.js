const products = JSON.parse(localStorage.getItem("products")) || [];
const alertList = document.getElementById("alertList");

const lowStock = products.filter(p => {
  return parseInt(p.stock) <= parseInt(p.minStock || 0);
});

if (lowStock.length === 0) {
  alertList.innerHTML = "<li>✅ هیچ محصولی با موجودی کم یافت نشد.</li>";
} else {
  lowStock.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `📦 ${p.name} - موجودی: ${p.stock} (حداقل: ${p.minStock})`;
    alertList.appendChild(li);
  });
}
