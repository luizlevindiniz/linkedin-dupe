export default class Feed {
  #id;
  #description;
  #created_at;

  constructor(id, description, created_at) {
    this.#id = id;
    this.#description = description;
    this.#created_at = created_at;
  }

  getId() {
    return this.#id;
  }

  getDescription() {
    return this.#description;
  }

  getCreatedAt() {
    return this.#created_at;
  }
}
