import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._element.querySelector(".form");
    this._button = this._form.querySelector('.form__save');
    this._inputList = Array.from(this._form.querySelectorAll(".form__item"));
  }

  getFormElement() {
    return this._form;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => (this._inputValues[input.name] = input.value));
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const defaultText = this._button.textContent;
      this._button.textContent = 'Сохранение...'
      this._formSubmitHandler(this._getInputValues())
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        this.close();
        this._button.textContent = defaultText;
      });
    });
  }
}
