export default function loadHeader() {
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .then(() => {
      let currentPage = window.location.pathname.split("/").pop();
      if (currentPage === "") {
        currentPage = "index.html";
      }
      document.querySelectorAll("nav a").forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    })
    .catch((error) => console.error("Error loading header:", error));
}
