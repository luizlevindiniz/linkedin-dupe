import { FeedController } from "./controllers/FeedController";
import { ProfileController } from "./controllers/ProfileController";
import { stopLoadingSpinner } from "./views/LoadingSpinner";

const baseUrl = "http://localhost:3000";

const profileController = new ProfileController(document, baseUrl);
const feedController = new FeedController(document, baseUrl);

console.log("App is online");

async function loadUserData() {
  try {
    await profileController.retrieveUserProfile();
    await feedController.retrieveUserFeed();
  } catch (err) {
    console.log(err);
  } finally {
    stopLoadingSpinner(document);
  }
}

loadUserData();
