import { popupImageElement, popupImage, popupCaption } from "./constants.js";

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
    this._setEventListeners();
    this._element.querySelector(".cards__image").src = this._link;
    this._element.querySelector(".cards__title").textContent = this._name;
    return this._element;
  }

  _likeCard() {
    this._element
      .querySelector(".cards__like")
      .classList.toggle("cards__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _zoomImage() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    popupImageElement.classList.add("popup_opened");
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._element
      .querySelector(".cards__delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._zoomImage();
      });
  }
}
