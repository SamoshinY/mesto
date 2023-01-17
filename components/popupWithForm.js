import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(popupElement, formSubmitHandler) {
    super(popupElement);
    this._formSubmitHandler = formSubmitHandler;
  }

  close() {
    super.close();
    this._element.querySelector(".form").reset();
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".form__item");
    this._data = [...this._inputList].map((input) => {
      const { name, value } = input;
      return { name, value };
    });
    return this._data;
  }

  _handler = (evt) => {
    evt.preventDefault();
    this._formSubmitHandler(this._getInputValues());
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", this._handler);
  }
}
