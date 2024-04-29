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

  static async createNewPost(url, post) {
    let payload = {
      description: post,
    };
    try {
      const res = await axios.post(`${url}/feed/`, payload);
      if (res.status < 200 || res.status >= 400) {
        return { message: "Unable to create post. Check request status." };
      }
      return await res.data;
    } catch (err) {
      console.log(err);
      return { message: "Error" };
    }
  }

  static async deletePost(url, postId) {
    try {
      const res = await axios.delete(`${url}/feed/${postId}`);
      if (res.status < 200 || res.status >= 400) {
        return { message: "Unable to delete post. Check request status." };
      }
      return res.status;
    } catch (err) {
      console.log(err);
      return { message: "Error" };
    }
  }
}

export { FeedRepository };
