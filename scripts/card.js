import { popupImageElement, popupImage, popupCaption } from "./constants.js";
import { openPopup } from "./index.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._setEventListeners();
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".cards__title").textContent = this._name;
    return this._element;
  }

  _likeCard() {
    this._like.classList.toggle("cards__like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _zoomImage() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupImageElement);
  }

  _setEventListeners() {
    this._like.addEventListener("click", () => {
        this._likeCard();
      });
    this._element
      .querySelector(".cards__delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
      this._image.addEventListener("click", () => {
        this._zoomImage();
      });
  }
}
