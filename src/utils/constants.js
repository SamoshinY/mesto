const configFormValidation = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error",
};
const formEditElement = document.querySelector(".form_type_edit");
const profileElement = document.querySelector(".profile");
const elements = {
  nameElement: formEditElement.querySelector(".form__item_text_name"),
  aboutElement: formEditElement.querySelector(".form__item_text_job"),
  profileEditButtonElement: profileElement.querySelector(".profile__edit"),
  addCardButtonElement: profileElement.querySelector(".profile__add"),
  avatarImageElement: profileElement.querySelector(".profile__image")
};

export { elements, configFormValidation };
