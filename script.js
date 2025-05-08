function showPage(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => section.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
