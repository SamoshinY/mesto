export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showError(inputElement) {
    this._formElement.querySelector(`.${inputElement.id}-error`).textContent =
      inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideError(inputElement) {
    this._formElement.querySelector(`.${inputElement.id}-error`).textContent =
      "";
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkValidity(inputElement) {
    !inputElement.validity.valid
      ? this._showError(inputElement)
      : this._hideError(inputElement);
  }

  _setEventListeners(inputElement) {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkValidity(inputElement);
        const isFormValid = inputList.every(
          (inputElement) => inputElement.validity.valid
        );
        this._setSubmitButtonState(isFormValid);
      });
    });
  }

  _setSubmitButtonState(isFormValid) {
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    if (isFormValid) {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this._inactiveButtonClass);
    }
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._setSubmitButtonState(false);
    });
    this._setEventListeners();
  }
}
