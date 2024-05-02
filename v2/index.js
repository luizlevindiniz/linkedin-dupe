const openModalBtn = document.querySelector(".profile-update-menu-add-btn");
const modal = document.querySelector(".add-profile-sec--modal");
const overlay = document.querySelector(".add-profile-sec--modal--overlay");
const closeModalBtn = document.querySelector(
  ".add-profile-sec--modal-close-btn"
);

openModalBtn.addEventListener("click", () => {
  const display = getComputedStyle(modal).display;

  if (display === "none") {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
});

closeModalBtn.addEventListener("click", () => {
  const display = getComputedStyle(modal).display;

  if (display !== "none") {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

/* Toggle Modal */

function toggleModalSection(section) {
  const toggleBtn = section.getElementsByClassName("modal__li--expand").item(0);

  toggleBtn.addEventListener("click", () => {
    const chevronDown = toggleBtn
      .getElementsByClassName("fa-chevron-down")
      .item(0);
    const chevronUp = toggleBtn.getElementsByClassName("fa-chevron-up").item(0);

    const expandableContent = section
      .getElementsByClassName("modal--expandable-content")
      .item(0);

    console.log(section);

    if (chevronDown.classList.contains("hidden")) {
      chevronDown.classList.remove("hidden");
      chevronUp.classList.add("hidden");
      expandableContent.classList.add("hidden");
    } else {
      chevronDown.classList.add("hidden");
      chevronUp.classList.remove("hidden");
      expandableContent.classList.remove("hidden");
    }
  });
}

const coreSection = document.querySelector(".expand-core");
const recommendedSection = document.querySelector(".expand-recommended");
const additionalSection = document.querySelector(".expand-additional");

toggleModalSection(coreSection);
toggleModalSection(recommendedSection);
toggleModalSection(additionalSection);
