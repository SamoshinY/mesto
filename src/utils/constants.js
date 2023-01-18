export {
  initialCards,
  configFormValidation,
  formEditElement,
  popupTextInputNameElement,
  popupTextInputJobElement,
  formAddElement,
  profileEditButtonElement,
  addCardButtonElement,
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
