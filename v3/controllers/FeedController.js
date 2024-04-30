import Feed from "../models/Feed";
import { FeedRepository } from "../repository/FeedRepository";
import { buildFeedPost } from "../views/FeedPost";
import { showModal, hideModal, thisObjectIsIterable } from "../utils/const";
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
    this.#listenNewPostModal();
    this.#listenDeletePostModal();
  }

  #buildFeedHTML(posts) {
    try {
      console.log(posts);
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

  /* Modals Functionality  */

  /* -- Common Functionality -- */
  #closeModal(modal, buttons) {
    buttons.addEventListener("click", () => {
      hideModal(modal);
    });
  }

  /* -- New Post Modal -- */
  #listenNewPostModal() {
    const newPostModal = this.#document.querySelector("#create-post--modal");
    const openNewPostModal = this.#document.getElementById(
      "btn__create-post--modal"
    );
    const closeNewPostModal = this.#document.getElementById(
      "btn__create--modal-close"
    );

    this.#createNewPost(newPostModal);
    this.#openNewPostModal(newPostModal, openNewPostModal);
    this.#closeModal(newPostModal, closeNewPostModal);
  }

  #createNewPost(modal) {
    const form = this.#document.getElementById("form__create-new-post");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let description = this.#document.getElementById(
        "input__create-post--modal"
      ).value;

      const newPost = await FeedRepository.createNewPost(
        this.#url,
        description
      );

      if (newPost) {
        const htmlToAppend = buildFeedPost(
          newPost.id,
          newPost.description,
          newPost.created_at,
          this.#document
        );
        const feedWrapper = this.#document.querySelector(".feed-wrapper");
        feedWrapper.appendChild(htmlToAppend);
        this.#addDeleteModalToNewPost(feedWrapper);
      }
      description.value = "";
      hideModal(modal);
    });
  }

  #openNewPostModal(modal, button) {
    button.addEventListener("click", () => showModal(modal));
  }

  /* -- Delete Post Modal -- */
  #listenDeletePostModal() {
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
    if (thisObjectIsIterable(buttons)) {
      buttons.forEach((btn) => {
        const id = btn.parentElement.id;
        btn.addEventListener("click", () => this.#deleteBtnFunc(modal, id));
        btn.addEventListener("click", () => showModal(modal));
      });
    } else {
      const id = buttons.parentElement.id;
      buttons.addEventListener("click", () => this.#deleteBtnFunc(modal, id));
      buttons.addEventListener("click", () => showModal(modal));
    }
  }

  async #deletePost(modal, postId) {
    await FeedRepository.deletePost(this.#url, postId);
    hideModal(modal);
  }

  #deleteBtnFunc(modal, id) {
    const submitBtn = modal.querySelector("#btn__delete--modal-submit");
    submitBtn.addEventListener(
      "click",
      async () => await this.#deletePost(modal, id)
    );
  }

  #addDeleteModalToNewPost(feedWrapper) {
    const openDeleteModalBtn = feedWrapper.lastChild.getElementsByClassName(
      "btn__delete-post--modal"
    )[0];
    const deletePostModal = this.#document.querySelector("#delete--modal");
    this.#openDeleteModal(deletePostModal, openDeleteModalBtn);
  }

  /* Update */
}

export { FeedController };
