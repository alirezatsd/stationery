document.addEventListener("DOMContentLoaded", () => {
  showSection("dashboard");

  const categoryForm = document.getElementById("categoryForm");
  const categoryTable = document.getElementById("categoryTable");

  categoryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const desc = document.getElementById("desc").value.trim();

    if (name === "") return;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${name}</td>
      <td>${desc}</td>
      <td><button onclick="this.parentElement.parentElement.remove()">❌ حذف</button></td>
    `;

    categoryTable.appendChild(row);

    categoryForm.reset();
  });
});

function showSection(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => {
    section.classList.add("hidden");
  });

  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}
