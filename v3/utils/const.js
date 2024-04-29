const modalOverlay = document.querySelector("#modal--overlay");

const showModal = (modal) => {
  const display = getComputedStyle(modal).display;
  if (display === "none") {
    modal.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
  }
};

const hideModal = (modal) => {
  const display = getComputedStyle(modal).display;

  if (display !== "none") {
    modal.classList.add("hidden");
    modalOverlay.classList.add("hidden");
  }
};

export { showModal, hideModal };