function buildUpdateModal(id) {
  const modalString = `      
    <div class="modal hidden edit-post--modal" id="edit-post--modal-${id}" data-id=${id}>
        <div class="modal-content">
            <div class="modal-head">
                <h2>Edit</h2>
                <button id="btn__edit--modal-close-${id}">
                <i class="fa-solid fa-x modal-close-btn"></i>
                </button>
            </div>
            <div class="edit-post--modal-body">
                <form 
                method="dialog"
                id="form__edit-post-${id}"
                class="form__edit"
                
                >
                    <label for="input__edit-post--modal-${id}">Description:</label>
                    <textarea
                    name="description"
                    type="text"
                    id="input__edit-post--modal-${id}"
                    placeholder="Your post here..."
                    required
                    ></textarea>
                    <button id="btn__edit--modal-submit" type="submit">
                        Update
                    </button>
                </form>
            </div>
        </div>
    </div>`;

  const template = document.createElement("template");
  template.innerHTML = modalString;
  return template.content.firstElementChild;
}

export { buildUpdateModal };
