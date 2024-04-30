function buildFeedPost(id, description, createdAt, document) {
  const feedString = `
    <div class="card-feed" id='post-id-${id}'>
        <div class="card-feed-head">
          <div class="feed-poster-profile-picture">
            <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?
            q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG
            90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt="feed-poster-profile-picture" />
            <div>
              <h4><a href="#">Ariane Vilen</a></h4>
              <h5>
              CFO at Housing
              </h5>
              <h6>
              ${createdAt}
              </h6>
          </div>
        </div>
        <div class="card-feed-head-icons"  id=${id}>
          <button id="btn__edit-post--modal">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        <button id="btn__delete-post--modal" class="btn__delete-post--modal">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>  
      </div>
      <div class="card-feed-content">
        <p class="card-feed-content-text">
        ${description}
        </p>
        <img
          src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=
          1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wY
          WdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="post"
          class="post-image"
        />
      </div>
    </div>
    `;

  const template = document.createElement("template");
  template.innerHTML = feedString;
  return template.content.firstElementChild;
}

export { buildFeedPost };
