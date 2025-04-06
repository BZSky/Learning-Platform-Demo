export function loadCourses(callback) {
  fetch("./courses.json")
    .then((response) => response.json())
    .then((courses) => callback(courses))
    .catch((error) => console.error("Error loading courses:", error));
}
