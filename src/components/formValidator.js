export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._buttonElement = this._formElement.querySelector(
      config.submitButtonSelector
    );
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

  resetInputErrors() {
    this._inputList.forEach(input => {this._hideError(input)});
  }

  _switchErrorVisibility(inputElement) {
    !this._checkValidity(inputElement)
      ? this._showError(inputElement)
      : this._hideError(inputElement);
  }

  _checkValidity(inputElement) {
    return inputElement.validity.valid;
  }

  _setEventListeners() {
    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._switchErrorVisibility(inputElement);
        const isFormValid = this._inputList.every((inputElement) =>
          this._checkValidity(inputElement)
        );
        this._setSubmitButtonState(isFormValid);
      });
    });
  }

  _setSubmitButtonState(isFormValid) {
    isFormValid
      ? (this._buttonElement.removeAttribute("disabled"),
        this._buttonElement.classList.remove(this._inactiveButtonClass))
      : (this._buttonElement.setAttribute("disabled", true),
        this._buttonElement.classList.add(this._inactiveButtonClass));
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._setSubmitButtonState(false);
    });
    this._setEventListeners();
  }
}
