import Profile from "../models/Profile";
import { ProfileRepository } from "../repository/ProfileRepository";
class ProfileController {
  static async getProfileData(url) {
    const data = await ProfileRepository.getProfile(url);

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

    return profile;
  }
}

export { ProfileController };
