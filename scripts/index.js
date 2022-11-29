import { initialCards } from "./arr.js";

// Переменные
const popupEditElement = document.querySelector(".popup_type_edit");
const formEditElement = popupEditElement.querySelector(".form_type_edit");
const popupEditCloseButtonElement =
  popupEditElement.querySelector(".popup__close");
let popupTextInputNameElement = formEditElement.querySelector(
  ".form__item_text_name"
);
let popupTextInputJobElement = formEditElement.querySelector(
  ".form__item_text_job"
);

const popupAddElement = document.querySelector(".popup_type_add");
const formAddElement = popupAddElement.querySelector(".form_type_add");
const popupAddCloseButtonElement =
  popupAddElement.querySelector(".popup__close");
let popupTextInputPlaceNameElement = formAddElement.querySelector(
  ".form__item_type_name");
let popupTextInputLinkElement = formAddElement.querySelector(
  ".form__item_type_link");

const profileElement = document.querySelector(".profile");
const profileEditButtonElement = profileElement.querySelector(".profile__edit");
let profileTextNameElement = profileElement.querySelector(".profile__name");
let profileTextJobElement = profileElement.querySelector(".profile__job");

const cardsContainer = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;
const addCardButtonElement = profileElement.querySelector(".profile__add");

const popupImageElement = document.querySelector(".popup_type_image");
const popupCloseImageElement = popupImageElement.querySelector(".popup__close");
const popupImage = popupImageElement.querySelector(".popup__image");
const popupCaption = popupImageElement.querySelector(".popup__caption");

// Открытие и закрытие попапов

const openPopupEditProfile = () => {
  popupEditElement.classList.add("popup_opened");
  popupTextInputNameElement.value = profileTextNameElement.textContent;
  popupTextInputJobElement.value = profileTextJobElement.textContent;
};

profileEditButtonElement.addEventListener("click", openPopupEditProfile);

const openPopupAddCard = () => {
  popupAddElement.classList.add("popup_opened");
};

addCardButtonElement.addEventListener("click", openPopupAddCard);

const openPopupViewImage = (evt) => {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target
    .closest(".cards__card")
    .querySelector(".cards__title").textContent;
  popupCaption.textContent = evt.target
    .closest(".cards__card")
    .querySelector(".cards__title").textContent;
  popupImageElement.classList.add("popup_opened");
};

const closeEditPopup = () => {
  popupEditElement.classList.remove("popup_opened");
};

const closeAddPopup = () => {
  popupAddElement.classList.remove("popup_opened");
};

const closeImagePopup = (evt) => {
  evt.target.closest(".popup_type_image").classList.remove("popup_opened");
};

popupEditCloseButtonElement.addEventListener("click", closeEditPopup);
popupAddCloseButtonElement.addEventListener("click", closeAddPopup);
popupCloseImageElement.addEventListener("click", closeImagePopup);

// Создание карточки

const createCard = (item) => {
  const cardElement = cardTemplate
    .querySelector(".cards__card")
    .cloneNode(true);

  const likeCard = (evt) => evt.target.classList.toggle("cards__like_active");
  const deleteCard = (evt) => evt.target.closest(".cards__card").remove();

  cardElement.querySelector(".cards__like").addEventListener("click", likeCard);
  cardElement
    .querySelector(".cards__delete")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".cards__image")
    .addEventListener("click", openPopupViewImage);

  cardElement.querySelector(".cards__title").textContent = item.name;
  cardElement.querySelector(".cards__image").src = item.link;
  cardElement.querySelector(".cards__image").alt = item.name;

  return cardElement;
};

// Загрузка карточек на страницу

const renderCards = (arr, container) => {
  arr.map(function (item) {
    const element = createCard(item);
    container.prepend(element);
  });
};
renderCards(initialCards, cardsContainer);

// Добавление новой карточки

const addCard = () => {
  const newArr = [
    {
      name: popupTextInputPlaceNameElement.value,
      link: popupTextInputLinkElement.value,
    },
  ];
  renderCards(newArr, cardsContainer);
};

// Редактирование профиля

const editProfile = () => {
  profileTextNameElement.textContent = popupTextInputNameElement.value;
  profileTextJobElement.textContent = popupTextInputJobElement.value;
};

// Обработка форм

const formEditSubmitHandler = (evt) => {
  evt.preventDefault();
  editProfile();
  closeEditPopup();
};

formEditElement.addEventListener("submit", formEditSubmitHandler);

const formAddSubmitHandler = (evt) => {
  evt.preventDefault();
  addCard();
  closeAddPopup();
  evt.target.reset();
};

formAddElement.addEventListener("submit", formAddSubmitHandler);
