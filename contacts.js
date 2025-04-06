import loadHeader from "./loadHeader.js";
import loadFooter from "./loadFooter.js";
import { loadMap } from "./loadMap.js";
import { loadCourses } from "./loadCourses.js";

document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("map-container");
  const courseSelect = document.getElementById("course");
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCourse = urlParams.get("course");

  Promise.all([
    loadHeader(),
    loadFooter(),
    new Promise((resolve) => {
      if (!mapContainer) return resolve();
      loadMap(mapContainer, resolve);
    }),
    new Promise((resolve) => {
      if (!courseSelect) return resolve();
      loadCourses((courses) => {
        courses.forEach((course) => {
          const option = document.createElement("option");
          option.value = course.title;
          option.textContent = course.title;
          if (course.title === selectedCourse) option.selected = true;
          courseSelect.appendChild(option);
        });
        resolve();
      });
    }),
  ]).then(() => {
    document.body.classList.add("loaded");
  });
});
