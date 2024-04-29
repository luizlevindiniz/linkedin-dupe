import { hideModal, showModal } from "../utils/const";

function loadProfileModal() {
  /* Add Profile Section Modal */

  const addProfileSecModal = document.querySelector("#add-profile-sec--modal");
  const addProfileSecBtn = document.querySelector(
    "#btn__add-profile-sec--modal-open"
  );
  const closeProfileSecBtn = document.querySelector(
    "#btn__add-profile-sec--modal-close"
  );

  addProfileSecBtn.addEventListener("click", () =>
    showModal(addProfileSecModal)
  );

  closeProfileSecBtn.addEventListener("click", () =>
    hideModal(addProfileSecModal)
  );

  /*---- Toggle Profile Section Function ----*/
  const coreSection = document.querySelector(".expand-core");
  const recommendedSection = document.querySelector(".expand-recommended");
  const additionalSection = document.querySelector(".expand-additional");

  const toggleProfileSection = (section) => {
    const toggleBtn = section
      .getElementsByClassName("add-profile-sec--modal__li--expand")
      .item(0);

    toggleBtn.addEventListener("click", () => {
      const chevronDown = toggleBtn
        .getElementsByClassName("fa-chevron-down")
        .item(0);
      const chevronUp = toggleBtn
        .getElementsByClassName("fa-chevron-up")
        .item(0);

      const expandableContent = section
        .getElementsByClassName("modal--expandable-content")
        .item(0);

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
  };

  toggleProfileSection(coreSection);
  toggleProfileSection(recommendedSection);
  toggleProfileSection(additionalSection);
}

export { loadProfileModal };
