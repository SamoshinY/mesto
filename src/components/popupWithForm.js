import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this.form = this._element.querySelector(".form");
    this._button = this.form.querySelector(".form__save");
    this._inputList = Array.from(this.form.querySelectorAll(".form__item"));
  }

  close() {
    super.close();
    this.form.reset();
  }

  _getInputValues() {
    return this._inputList.reduce((inputValues, input) => {
      inputValues[input.name] = input.value;
      return inputValues;
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const defaultText = this._button.textContent;
      this._button.textContent = "Сохранение...";
      this._formSubmitHandler(this._getInputValues())
        .catch((err) => console.error(err))
        .finally(() => {
          this.close();
          this._button.textContent = defaultText;
        });
    });
  }
}
