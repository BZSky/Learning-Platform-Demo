export function createCourseCard(course) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${course.image}" alt="${course.title}">
    <h3>${course.title}</h3>
    <p><strong>Instructor:</strong> ${course.instructor}</p>
    <p><strong>Level:</strong> ${course.difficulty}</p>
  `;

  card.addEventListener("click", () => openModal(course));

  return card;
}

export function openModal(course) {
  const existingModal = document.getElementById("course-modal");
  if (existingModal) existingModal.remove();

  const modal = document.createElement("div");
  modal.id = "course-modal";
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <img src="${course.image}" alt="${course.title}">
      <h2>${course.title}</h2>
      <p><strong>Instructor:</strong> ${course.instructor}</p>
      <p><strong>Level:</strong> ${course.difficulty}</p>
      <p>${course.description}</p>
      <button class="enroll-btn">Enroll</button>
    </div>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector(".close-btn")
    .addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelector(".enroll-btn").addEventListener("click", () => {
    const params = new URLSearchParams({ course: course.title });
    window.location.href = `contacts.html?${params.toString()}`;
  });
}
