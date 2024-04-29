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
    this.#addCreateModalListener();
    this.#addDeleteModalListeners();
  }

  #buildFeedHTML(posts) {
    try {
      const feedWrapper = this.#document.querySelector(".feed-wrapper");

      posts.forEach((post) => {
        feedWrapper.appendChild(
          buildFeedPost(
            post.getId(),
            post.getDescription(),
            post.getCreatedAt(),
            this.#document
          )
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  #addCreateModalListener() {
    /* Create */
    const createPostModal = this.#document.querySelector("#create-post--modal");
    const openCreateModalBtn = this.#document.getElementById(
      "btn__create-post--modal"
    );
    const closeCreateModalBtn = this.#document.getElementById(
      "btn__create--modal-close"
    );

    this.#createNewPost(createPostModal);
    this.#openNewPostModal(createPostModal, openCreateModalBtn);
    this.#closeModal(createPostModal, closeCreateModalBtn);
  }

  #createNewPost(modal) {
    const form = this.#document.getElementById("form__create-new-post");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let description = this.#document.getElementById(
        "input__create-post--modal"
      );

      await FeedRepository.createNewPost(this.#url, description.value);
      description.value = "";
      hideModal(modal);
    });
  }

  #openNewPostModal(modal, button) {
    button.addEventListener("click", () => showModal(modal, modalOverlay));
  }

  #addDeleteModalListeners() {
    /* Delete */
    const deletePostModal = this.#document.querySelector("#delete--modal");
    const openDeleteModalBtns = this.#document.querySelectorAll(
      "#btn__delete-post--modal"
    );
    const closeDeleteModalBtn = this.#document.getElementById(
      "btn__delete--modal-close"
    );

    this.#openDeleteModal(deletePostModal, openDeleteModalBtns);
    this.#closeModal(deletePostModal, closeDeleteModalBtn);
  }

  #openDeleteModal(modal, buttons) {
    buttons.forEach((btn) => {
      console.log(btn.parentElement.id);
      btn.addEventListener("click", () => showModal(modal, modalOverlay));
    });
  }

  #closeModal(modal, buttons) {
    buttons.addEventListener("click", () => {
      hideModal(modal, modalOverlay);
    });
  }
}

export { FeedController };
