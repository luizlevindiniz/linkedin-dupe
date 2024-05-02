import Profile from "../models/Profile";
import { ProfileRepository } from "../repository/ProfileRepository";
import { loadProfileModal } from "../views/ProfileModal";
class ProfileController {
  #document;
  #url;

  constructor(document, url) {
    this.#document = document;
    this.#url = url;
  }

  async retrieveUserProfile() {
    try {
      loadProfileModal();
      await this.#getProfileData();
    } catch (err) {
      console.log(err);
    }
  }

  async #getProfileData() {
    const data = await ProfileRepository.getProfile(this.#url);

    if (data.message) {
      return { error: message };
    }

    const { id, name, role, location, profilePhoto, backgroundImage } = data;
    const profile = new Profile(
      id,
      name,
      role,
      location,
      profilePhoto,
      backgroundImage
    );

    this.#buildUserProfileHTML(profile);
  }

  #buildUserProfileHTML(profile) {
    const navbarUserPic = this.#document.querySelector(
      "#navbar-profile-picture"
    );
    const username = this.#document.querySelector("#profile-name");
    const userRole = this.#document.querySelector("#profile-role");
    const userLocation = this.#document.querySelector("#profile-location");
    const userProfilePic = this.#document.querySelector("#profile-picture");
    const heroImage = this.#document.querySelector("#profile-cover");

    navbarUserPic.src = profile.getProfilePhoto();
    userProfilePic.src = profile.getProfilePhoto();
    heroImage.src = profile.getBackgroundImage();

    username.innerText = profile.getName();
    userRole.innerText = profile.getRole();
    userLocation.innerText = profile.getLocation();
  }
  catch(err) {
    console.log(err);
  }
}

export { ProfileController };
