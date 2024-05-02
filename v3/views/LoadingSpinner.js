function stopLoadingSpinner(document) {
  const loadingModal = document.querySelector(".load-spinner--modal");

  loadingModal.classList.add("load-spinner--modal--hidden");
  loadingModal.addEventListener("transitionend", () => {
    while (loadingModal.hasChildNodes()) {
      loadingModal.removeChild(loadingModal.firstChild);
    }
  });
}

export { stopLoadingSpinner };
