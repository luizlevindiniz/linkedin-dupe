import { FeedController } from "./controllers/FeedController";
import { ProfileController } from "./controllers/ProfileController";

const baseUrl = "http://localhost:3000";
const loadingModal = document.querySelector(".loading__modal");

console.log("App is online");

function stopLoadingSpinner() {
  loadingModal.classList.add("loading__modal--hidden");
  loadingModal.addEventListener("transitionend", () => {
    while (loadingModal.hasChildNodes()) {
      loadingModal.removeChild(loadingModal.firstChild);
    }
  });
}

function buildFeedPost(description, createdAt) {
  const feedString = `
  <div class="card-feed">
      <div class="card-feed-head">
        <div class="feed-poster-profile-picture">
          <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?
          q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG
          90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt="feed-poster-profile-picture" />
          <div>
            <h4><a href="#">Ariane Vilen</a></h4>
            <h5>
            CFO at Housing
            </h5>
            <h6>
            ${createdAt}
            </h6>
        </div>
      </div>
      <div class="card-feed-head-icons">
        <button>
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      <button>
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>  
    </div>
    <div class="card-feed-content">
      <p class="card-feed-content-text">
      ${description}
      </p>
      <img
        src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=
        1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wY
        WdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="post"
        class="post-image"
      />
    </div>
  </div>
  `;

  const template = document.createElement("template");
  template.innerHTML = feedString;
  return template.content.firstElementChild;
}

async function retrieveUserProfile() {
  try {
    const profile = await ProfileController.getProfileData(baseUrl);

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
  } catch (err) {
    console.log(err);
  }
}

async function retrieveUserFeed() {
  try {
    const feedWrapper = document.querySelector(".feed-wrapper");

    const feed = await FeedController.getFeedData(baseUrl);
    feed.forEach((post) => {
      feedWrapper.appendChild(
        buildFeedPost(post.getDescription(), post.getCreatedAt())
      );
    });
  } catch (err) {
    console.log(err);
  } finally {
    stopLoadingSpinner();
  }
}

retrieveUserProfile();
retrieveUserFeed();
