import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
  constructor(popupElement, image, caption) {
    super(popupElement);
    this._image = image;
    this._caption = caption;
  }

  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  };
}
