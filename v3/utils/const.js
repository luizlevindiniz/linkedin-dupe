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

const removeFeedPosts = () => {
  const feedWrapper = document.querySelector(".feed-wrapper");
  while (feedWrapper.firstChild) {
    console.log(feedWrapper.firstChild);
    feedWrapper.removeChild(feedWrapper.firstChild);
  }
};

const thisObjectIsIterable = (obj) => {
  return typeof obj[Symbol.iterator] === "function";
};

export { showModal, hideModal, removeFeedPosts, thisObjectIsIterable };
