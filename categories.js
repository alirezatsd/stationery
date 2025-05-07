let categories = JSON.parse(localStorage.getItem("categories")) || [];

function saveCategories() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

function renderCategories() {
  const list = document.getElementById("categoryList");
  list.innerHTML = "";

  categories.forEach((cat, index) => {
    const li = document.createElement("li");
    li.textContent = cat;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => {
      const newName = prompt("نام جدید دسته:", cat);
      if (newName) {
        categories[index] = newName;
        saveCategories();
        renderCategories();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      if (confirm("حذف شود؟")) {
        categories.splice(index, 1);
        saveCategories();
        renderCategories();
      }
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

document.getElementById("categoryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("categoryInput");
  const newCategory = input.value.trim();
  if (newCategory && !categories.includes(newCategory)) {
    categories.push(newCategory);
    saveCategories();
    renderCategories();
  }
  input.value = "";
});

renderCategories();

