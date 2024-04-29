import Feed from "../models/Feed";
import { FeedRepository } from "../repository/FeedRepository";
import { buildFeedPost } from "../views/FeedPost";
import { showModal, hideModal, modalOverlay } from "../utils/const";
class FeedController {
  #document;
  #url;

  constructor(document, url) {
    this.#document = document;
    this.#url = url;
  }

  async retrieveUserFeed() {
    try {
      await this.#getFeedData();
    } catch (err) {
      console.log(err);
    }
  }

  async #getFeedData() {
    const data = await FeedRepository.getFeed(this.#url);

    if (data.message) {
      return { error: message };
    }

    const posts = data.map((feed) => {
      const { id, description, created_at } = feed;
      return new Feed(id, description, created_at);
    });

    this.#buildFeedHTML(posts);
  }

  #buildFeedHTML(posts) {
    try {
      const feedWrapper = this.#document.querySelector(".feed-wrapper");
      posts.forEach((post) => {
        feedWrapper.appendChild(
          buildFeedPost(
            post.getDescription(),
            post.getCreatedAt(),
            this.#document
          )
        );
      });

      const deletePostModal = this.#document.querySelector("#delete--modal");

      this.#openModalListener(deletePostModal);
      this.#closeModalListener(deletePostModal);
    } catch (err) {
      console.log(err);
    }
  }

  #openModalListener(deletePostModal) {
    const deletePostBtns = this.#document.querySelectorAll(
      "#btn__delete-post--modal"
    );

    deletePostBtns.forEach((btn) => {
      btn.addEventListener("click", () =>
        showModal(deletePostModal, modalOverlay)
      );
    });
  }

  #closeModalListener(deletePostModal) {
    const closeDeleteModalBtn = this.#document.getElementById(
      "btn__delete--modal-close"
    );

    closeDeleteModalBtn.addEventListener("click", () => {
      hideModal(deletePostModal, modalOverlay);
    });
  }
}

export { FeedController };
