export class Popup {
  constructor(popupElement) {
    this._element = popupElement;
  }

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClickOnCloseButtonOrOverlay = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener("click", this._handleClickOnCloseButtonOrOverlay);
  }
}
