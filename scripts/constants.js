export {
  initialCards,
  configFormValidation,
  popupEditElement,
  formEditElement,
  popupTextInputNameElement,
  popupTextInputJobElement,
  popupAddElement,
  formAddElement,
  popupTextInputPlaceNameElement,
  popupTextInputLinkElement,
  profileElement,
  profileEditButtonElement,
  profileTextNameElement,
  profileTextJobElement,
  cardsContainer,
  addCardButtonElement,
  popupImageElement,
  popupImage,
  popupCaption,
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

const popupEditElement = document.querySelector(".popup_type_edit");
const formEditElement = popupEditElement.querySelector(".form_type_edit");
const popupTextInputNameElement = formEditElement.querySelector(
  ".form__item_text_name"
);
const popupTextInputJobElement = formEditElement.querySelector(
  ".form__item_text_job"
);
const popupAddElement = document.querySelector(".popup_type_add");
const formAddElement = popupAddElement.querySelector(".form_type_add");
const popupTextInputPlaceNameElement = formAddElement.querySelector(
  ".form__item_type_name"
);
const popupTextInputLinkElement = formAddElement.querySelector(
  ".form__item_type_link"
);
const profileElement = document.querySelector(".profile");
const profileEditButtonElement = profileElement.querySelector(".profile__edit");
const profileTextNameElement = profileElement.querySelector(".profile__name");
const profileTextJobElement = profileElement.querySelector(".profile__job");
const cardsContainer = document.querySelector(".cards");
const addCardButtonElement = profileElement.querySelector(".profile__add");
const popupImageElement = document.querySelector(".popup_type_image");
const popupImage = popupImageElement.querySelector(".popup__image");
const popupCaption = popupImageElement.querySelector(".popup__caption");
