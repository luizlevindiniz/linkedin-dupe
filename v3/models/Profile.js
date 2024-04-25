export default class Profile {
  #id;
  #name;
  #role;
  #location;
  #profilePhoto;
  #backgroundImage;

  constructor(id, name, role, location, profilePhoto, backgroundImage) {
    this.#id = id;
    this.#name = name;
    this.#role = role;
    this.#location = location;
    this.#profilePhoto = profilePhoto;
    this.#backgroundImage = backgroundImage;
  }

  getName() {
    return this.#name;
  }

  getRole() {
    return this.#role;
  }

  getLocation() {
    return this.#location;
  }

  getProfilePhoto() {
    return this.#profilePhoto;
  }

  getBackgroundImage() {
    return this.#backgroundImage;
  }

  toString() {
    return `${this.#id} - ${this.#name}`;
  }
}
