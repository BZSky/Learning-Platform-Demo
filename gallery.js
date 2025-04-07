import { loadCourses } from "./loadCourses.js";
import loadHeader from "./loadHeader.js";
import loadFooter from "./loadFooter.js";
import { createCourseCard, openModal } from "./courseCard.js";

document.addEventListener("DOMContentLoaded", () => {
  const coursesContainer = document.getElementById("courses-container");
  const paginationContainer = document.getElementById("pagination");
  const showMoreBtn = document.getElementById("show-more");
  showMoreBtn.style.display = "none";
  const filterSelect = document.getElementById("filter");
  const sortSelect = document.getElementById("sort");
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDifficulty = urlParams.get("difficulty");
  const searchInput = document.getElementById("search");

  const coursesPerPage = 8;
  let currentPage = 1;
  let allCourses = [];
  let filteredCourses = [];
  let loadedCourses = 0;

  Promise.all([
    loadHeader(),
    loadFooter(),
    new Promise((resolve) => {
      loadCourses((courses) => {
        if (!coursesContainer || courses.length === 0) return resolve();

        allCourses = courses;
        selectedDifficulty
          ? (filterSelect.value = selectedDifficulty)
          : (filterSelect.value = "all");
        filteredCourses = selectedDifficulty
          ? allCourses.filter(
              (course) =>
                course.difficulty.toLowerCase() ===
                selectedDifficulty.toLowerCase()
            )
          : [...allCourses];

        loadedCourses = Math.min(coursesPerPage + 2, filteredCourses.length);
        renderCourses();
        setupPagination();
        resolve();
      });
    }),
  ]).then(() => {
    document.body.classList.add("loaded");
  });

  function getFilteredCourses() {
    const selectedFilter = filterSelect.value;
    const selectedSort = sortSelect.value;
    const searchTerm = searchInput?.value?.toLowerCase() || "";

    let result = [...allCourses];

    if (selectedFilter !== "all") {
      result = result.filter(
        (course) =>
          course.difficulty.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    if (searchTerm) {
      result = result.filter((course) =>
        course.title.toLowerCase().includes(searchTerm)
      );
    }

    if (selectedSort === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "difficulty") {
      const order = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      result.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    } else if (selectedSort === "instructor") {
      result.sort((a, b) => a.instructor.localeCompare(b.instructor));
    }

    return result;
  }

  function applyFiltersAndRender() {
    filteredCourses = getFilteredCourses();
    currentPage = 1;
    loadedCourses = Math.min(coursesPerPage, filteredCourses.length);
    renderCourses();
    setupPagination();
  }

  function renderCourses() {
    coursesContainer.innerHTML = "";
    const start = (currentPage - 1) * coursesPerPage;
    const end = Math.min(start + coursesPerPage, loadedCourses);

    for (let i = start; i < end; i++) {
      if (filteredCourses[i]) {
        const courseCard = createCourseCard(filteredCourses[i], openModal);
        coursesContainer.appendChild(courseCard);
      }
    }
  }

  function setupPagination() {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.classList.add("pagination-btn");
      if (i === currentPage) pageBtn.classList.add("active");
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        renderCourses();
        updatePaginationButtons();
      });
      paginationContainer.appendChild(pageBtn);
    }
  }

  function updatePaginationButtons() {
    document.querySelectorAll(".pagination-btn").forEach((btn, index) => {
      btn.classList.toggle("active", index + 1 === currentPage);
    });
    paginationContainer.firstElementChild.classList.contains("active")
      ? (showMoreBtn.style.display = "none")
      : (showMoreBtn.style.display = "block");
  }

  showMoreBtn.addEventListener("click", () => {
    const newLoad = loadedCourses + 10;
    loadedCourses = Math.min(newLoad, filteredCourses.length);
    renderCourses();
    if (loadedCourses >= filteredCourses.length) {
      showMoreBtn.style.display = "none";
    }
  });

  filterSelect.addEventListener("change", () => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set(
      "difficulty",
      filterSelect.value === "all" ? "" : filterSelect.value
    );
    window.history.pushState({}, "", newUrl);

    applyFiltersAndRender();
  });

  function debounce(fn, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  }

  sortSelect.addEventListener("change", applyFiltersAndRender);

  searchInput.addEventListener("input", debounce(applyFiltersAndRender));
});
