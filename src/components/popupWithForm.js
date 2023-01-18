import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._element.querySelector(".form");
    this._inputList = Array.from(this._form.querySelectorAll(".form__item"));
  }

  close() {
    super.close();
    this._form.reset();
  }

  getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(
      (input) => (this._inputValues[input.name] = input.value)
    );
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this.getInputValues());
      this.close();
    });
  }
}
