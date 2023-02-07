export class Card {
  constructor(data, userId, templateSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
    this._data = data;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likesCounter = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const card = document
      .querySelector("#card-template")
      .content.querySelector(this._templateSelector)
      .cloneNode(true);
    return card;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".cards__image");
    this._like = this._element.querySelector(".cards__like");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".cards__title").textContent = this._name;
    this._likeQuantity = this._element.querySelector(".cards__likes-counter");
    this._likeQuantity.textContent = this._likesCounter;
    this._delete = this._element.querySelector('.cards__delete');

    if (this._ownerId !== this._userId) {
      this._delete.classList.add('cards__delete_hidden')
    }

    this.isLike = this._likes.some((like) => like._id === this._userId);
    if (this.isLike) {
      this.toggleLike()
      this.isLike = !this.isLike;
    }

    this._setEventListeners();

    return this._element;
  }

  toggleLike() {
    this._like.classList.toggle("cards__like_active");
    this.isLike = !this.isLike;
  }

  deleteCardInFrontOfMe() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._like.addEventListener("click", () => {
      this._handleLikeClick(this._id, this.isLike, this._likeQuantity);
    });
    this._element
      .querySelector(".cards__delete")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id)}
      );
    this._image.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }
}
