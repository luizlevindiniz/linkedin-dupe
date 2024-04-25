import axios from "axios";
import Profile from "./models/Profile";

const baseUrl = "http://localhost:3000";
const loadingModal = document.querySelector(".loading__modal");

console.log("App is online");

axios
  .get(`${baseUrl}/profile/`)
  .then((r) => {
    const { data } = r;
    const { id, name, role, location, profilePhoto, backgroundImage } = data;
    const profile = new Profile(
      id,
      name,
      role,
      location,
      profilePhoto,
      backgroundImage
    );

    const navbarUserPic = document.querySelector(".navbar-profile-picture");
    const username = document.querySelector(".profile-name--name-h1");
    const userRole = document.querySelector(".profile--role");
    const userLocation = document.querySelector(
      ".profile-location-info--paragraph"
    );
    const userProfilePic = document.querySelector(".profile-pic");
    const heroImage = document.querySelector(".cover");

    navbarUserPic.src = profile.getProfilePhoto();
    userProfilePic.src = profile.getProfilePhoto();
    heroImage.src = profile.getBackgroundImage();

    username.innerText = profile.getName();
    userRole.innerText = profile.getRole();
    userLocation.innerText = profile.getLocation();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    loadingModal.classList.add("loading__modal--hidden");
    loadingModal.addEventListener("transitionend", (event) => {
      while (loadingModal.hasChildNodes()) {
        loadingModal.removeChild(loadingModal.firstChild);
      }
    });
  });
