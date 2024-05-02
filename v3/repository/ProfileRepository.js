import axios from "axios";

class ProfileRepository {
  static async getProfile(url) {
    try {
      const res = await axios.get(`${url}/profile/`);
      if (res.status < 200 || res.status >= 400) {
        return { message: "Unable to get profile. Check request status." };
      }
      return await res.data;
    } catch (err) {
      console.log(err);
      return { message: "Error" };
    }
  }
}

export { ProfileRepository };
