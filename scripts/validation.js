// Валидация форм

const showError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
};

const checkValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidity(formElement, inputElement, config);
      const isFormValid = inputList.every(
        (inputElement) => inputElement.validity.valid
      );
      setSubmitButtonState(formElement, isFormValid, config);
    });
  });
};

const setSubmitButtonState = (formElement, isFormValid, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (isFormValid) {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(config.inactiveButtonClass);
  } else {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(config.inactiveButtonClass);
  }
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      setSubmitButtonState(formElement, false, config);
    });
    setEventListeners(formElement, config);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error",
});
