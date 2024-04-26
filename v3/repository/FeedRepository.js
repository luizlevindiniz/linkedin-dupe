import axios from "axios";

class FeedRepository {
  static async getFeed(url) {
    try {
      const res = await axios.get(`${url}/feed/`);
      if (res.status < 200 || res.status >= 400) {
        return { message: "Unable to get feed. Check request status." };
      }
      return await res.data;
    } catch (err) {
      console.log(err);
      return { message: "Error" };
    }
  }
}

export { FeedRepository };
