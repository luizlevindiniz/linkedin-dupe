import Feed from "../models/Feed";
import { FeedRepository } from "../repository/FeedRepository";
class FeedController {
  static async getFeedData(url) {
    const data = await FeedRepository.getFeed(url);
    if (data.message) {
      return { error: message };
    }

    return data.map((feed) => {
      const { id, description, created_at } = feed;
      return new Feed(id, description, created_at);
    });
  }
}

export { FeedController };
