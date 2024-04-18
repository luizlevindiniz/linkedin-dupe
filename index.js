const addProfileBtn = document.querySelector(".profile-update-menu-add-btn");
const modal = document.querySelector(".add-profile-section-modal");

addProfileBtn.addEventListener("click", () => {
  const display = getComputedStyle(modal).display;

  if (display === "none") {
    modal.style.display = "block";
  }
});

const closeProfileBtn = document.querySelector(".close");

closeProfileBtn.addEventListener("click", () => {
  const display = getComputedStyle(modal).display;

  if (display !== "none") {
    modal.style.display = "none";
  }
});
