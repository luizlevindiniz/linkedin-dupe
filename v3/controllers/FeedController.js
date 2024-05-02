import Feed from "../models/Feed";
import { FeedRepository } from "../repository/FeedRepository";
import { buildFeedPost } from "../views/FeedPost";
import { buildUpdateModal } from "../views/UpdateModal";
import { showModal, hideModal } from "../utils/const";
class FeedController {
  #document;
  #url;

  constructor(document, url) {
    this.#document = document;
    this.#url = url;
  }

  async retrieveUserFeed() {
    try {
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
      this.#listenUpdatePostModal();
      this.#listenDeletePostModal();
    } catch (err) {
      console.log(err);
    }
  }

  #buildFeedHTML(posts) {
    const feedWrapper = this.#document.querySelector("#feed-wrapper");
    const updateModalWrapper = this.#document.querySelector(
      "#update-modal-wrappers"
    );

    posts.forEach((post) => {
      const feedPostHTML = buildFeedPost(
        post.getId(),
        post.getDescription(),
        post.getCreatedAt(),
        this.#document
      );
      const updateModalHTML = buildUpdateModal(post.getId());

      feedWrapper.appendChild(feedPostHTML);
      updateModalWrapper.appendChild(updateModalHTML);
    });
  }

  /* Modals Functionality  */

  /* -- New Post Modal -- */
  #listenNewPostModal() {
    const newPostModal = this.#document.querySelector("#create-post--modal");
    const openNewPostModal = this.#document.getElementById(
      "btn__create-post--modal"
    );
    const closeNewPostModal = this.#document.getElementById(
      "btn__create--modal-close"
    );

    openNewPostModal.addEventListener("click", () => showModal(newPostModal));
    closeNewPostModal.addEventListener("click", () => hideModal(newPostModal));

    const form = this.#document.getElementById("form__create-new-post");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const description = this.#document.getElementById(
        "input__create-post--modal"
      );

      const newPost = await FeedRepository.createNewPost(
        this.#url,
        description.value
      );

      if (newPost) {
        const htmlToAppend = buildFeedPost(
          newPost.id,
          newPost.description,
          newPost.created_at,
          this.#document
        );
        const feedWrapper = document.querySelector("#feed-wrapper");
        await feedWrapper.appendChild(htmlToAppend);
        this.#addDeleteFunctionToNewPost(feedWrapper);
        this.#addUpdateFunctionToNewPost(feedWrapper);
      }
      description.value = "";
      hideModal(newPostModal);
    });
  }

  /* -- Delete Post Modal -- */

  #listenDeletePostModal() {
    const deletePostModal = this.#document.querySelector("#delete--modal");
    const closeDeleteModalBtn = this.#document.getElementById(
      "btn__delete--modal-close"
    );

    closeDeleteModalBtn.addEventListener("click", () => {
      deletePostModal.dataset.id = "none";
      hideModal(deletePostModal);
    });

    const submitBtn = deletePostModal.querySelector(
      "#btn__delete--modal-submit"
    );

    submitBtn.addEventListener("click", async () => {
      const id = deletePostModal.dataset.id;

      if (id !== "none") {
        await FeedRepository.deletePost(this.#url, id);
        const postToDelete = this.#document.getElementById(`post-id-${id}`);
        await postToDelete.remove();
        deletePostModal.dataset.id = "none";
        hideModal(deletePostModal);
      }
    });

    const cardFeeds = this.#document.querySelectorAll(".card-feed");

    cardFeeds.forEach((post) => {
      const postId = post.dataset.id;
      this.#deletePost(deletePostModal, postId);
    });
  }

  #deletePost(deletePostModal, postId) {
    const deleteBtn = this.#document.querySelector(
      `#btn__delete-post--modal-${postId}`
    );
    deleteBtn.addEventListener("click", () => {
      showModal(deletePostModal);
      deletePostModal.dataset.id = postId;
    });
  }

  #addDeleteFunctionToNewPost(feedWrapper) {
    const deleteBtn = feedWrapper.lastChild.getElementsByClassName(
      "btn__delete-post--modal"
    )[0];

    const postId = deleteBtn.parentElement.id;
    const deletePostModal = this.#document.querySelector("#delete--modal");

    deleteBtn.addEventListener("click", () => {
      showModal(deletePostModal);
      deletePostModal.dataset.id = postId;
    });
  }

  /* Update */

  #listenUpdatePostModal() {
    const updateModalsList = document.querySelectorAll(".edit-post--modal");
    updateModalsList.forEach((modal) => {
      const id = modal.dataset.id;
      this.#applyUpdateListeners(modal, id);
    });
  }

  #applyUpdateListeners(modal, id) {
    const openBtn = document.querySelector(`#btn__edit-post--modal-${id}`);
    const closeBtn = document.querySelector(`#btn__edit--modal-close-${id}`);
    const form = document.querySelector(`#form__edit-post-${id}`);

    openBtn.addEventListener("click", () => showModal(modal));
    closeBtn.addEventListener("click", () => hideModal(modal));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let postDescription = this.#document.getElementById(
        `input__edit-post--modal-${id}`
      );

      const updatePost = await FeedRepository.updatePost(
        this.#url,
        postDescription.value,
        id
      );

      if (updatePost) {
        const originalPost = this.#document.querySelector(`#post-id-${id}`);
        const paragraph = originalPost.getElementsByClassName(
          "card-feed-content-text"
        )[0];
        paragraph.innerText = postDescription.value;
      }
      postDescription.value = "";
      hideModal(modal);
    });
  }

  async #addUpdateFunctionToNewPost(feedWrapper) {
    const id = feedWrapper.lastChild.dataset.id;

    const updateModalWrapper = this.#document.querySelector(
      "#update-modal-wrappers"
    );
    const htmlToAppend = buildUpdateModal(id);
    await updateModalWrapper.appendChild(htmlToAppend);

    const modal = updateModalWrapper.lastChild;

    this.#applyUpdateListeners(modal, id);
  }
}

export { FeedController };
