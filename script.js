import { loadCourses } from "./loadCourses.js";
import loadHeader from "./loadHeader.js";
import loadFooter from "./loadFooter.js";
import { createCourseCard, openModal } from "./courseCard.js";

document.addEventListener("DOMContentLoaded", () => {
  const coursesContainer = document.getElementById("courses-container");
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let index = 0;
  const totalSlides = slides.length;
  const slideInterval = 5000;
  let autoSlide;

  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
  ) {
    document.body.classList.add("home-page");
  }

  function updateSlide() {
    slider.style.transform = `translateX(-${index * 100}%)`;
    updateCourseCard(index);
  }

  function nextSlide() {
    index = (index + 1) % totalSlides;
    updateSlide();
    resetTimer();
  }

  function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlide();
    resetTimer();
  }

  function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, slideInterval);
  }

  function updateCourseCard(slideIndex) {
    if (!coursesContainer || coursesContainer.children.length === 0) return;

    const allCourses = [...coursesContainer.children];

    const selectedCourse = allCourses[slideIndex % allCourses.length];

    allCourses.forEach((course) => (course.style.display = "none"));

    selectedCourse.style.display = "block";
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  autoSlide = setInterval(nextSlide, slideInterval);

  Promise.all([
    loadHeader(),
    loadFooter(),
    new Promise((resolve) => {
      loadCourses((courses) => {
        if (!coursesContainer || courses.length === 0) return resolve();

        const selectedCourses = getRandomCourses(courses, 3);
        renderCourses(selectedCourses, coursesContainer);
        updateCourseCard(index);
        resolve();
      });
    }),
  ]).then(() => {
    document.body.classList.add("loaded");
  });

  function getRandomCourses(courses, count) {
    return courses.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  function renderCourses(courses, container) {
    container.innerHTML = "";
    courses.forEach((course) => {
      const courseCard = createCourseCard(course, openModal);
      container.appendChild(courseCard);
    });
  }
});
