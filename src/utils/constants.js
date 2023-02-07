export {
  configFormValidation,
  formEditElement,
  popupTextInputNameElement,
  popupTextInputJobElement,
  formAddElement,
  profileEditButtonElement,
  addCardButtonElement,
  avatarImage,
  formAvatarElement
};

const configFormValidation = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error",
};

const formEditElement = document.querySelector(".form_type_edit");
const popupTextInputNameElement = formEditElement.querySelector(
  ".form__item_text_name"
);
const popupTextInputJobElement = formEditElement.querySelector(
  ".form__item_text_job"
);
const formAddElement = document.querySelector(".form_type_add");
const profileElement = document.querySelector(".profile");
const profileEditButtonElement = profileElement.querySelector(".profile__edit");
const addCardButtonElement = profileElement.querySelector(".profile__add");
const formAvatarElement = document.querySelector(".form_type_change-avatar");
const avatarImage = document.querySelector(".profile__image");
