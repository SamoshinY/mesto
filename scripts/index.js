import { initialCards } from "./arr.js";

// Переменные
const popupElement = document.querySelector(".popup_type_form");
const formElement = popupElement.querySelector(".form");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
let popupTextInputNameElement = formElement.querySelector(
  ".form__item_text_name"
);
let popupTextInputJobElement = formElement.querySelector(
  ".form__item_text_job"
);
const profileElement = document.querySelector(".profile");
const profileEditButtonElement = profileElement.querySelector(".profile__edit");
let profileTextNameElement = profileElement.querySelector(".profile__name");
let profileTextJobElement = profileElement.querySelector(".profile__job");
const popupTitle = popupElement.querySelector(".popup__heading");
const formButton = formElement.querySelector(".form__save");
const cardsContainer = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;
const addCardButtonElement = profileElement.querySelector(".profile__add");
const popupImageElement = document.querySelector(".popup_type_image");
const popupCloseImageElement = popupImageElement.querySelector(".popup__close");
const popupImage = popupImageElement.querySelector(".popup__image");
const popupCaption = popupImageElement.querySelector(".popup__caption");

// Открытие и закрытие попапов

const openPopupEditProfile = () => {
  popupElement.classList.add("popup_opened");
  popupTitle.textContent = "Редактировать профиль";
  popupTextInputNameElement.value = profileTextNameElement.textContent;
  popupTextInputJobElement.value = profileTextJobElement.textContent;
  popupTextInputNameElement.placeholder = "Введите имя";
  popupTextInputJobElement.placeholder = "Введите информацию о себе";
  formButton.textContent = "Сохранить";
};

profileEditButtonElement.addEventListener("click", openPopupEditProfile);

const openPopupAddCard = () => {
  popupElement.classList.add("popup_opened");
  popupTitle.textContent = "Новое место";
  popupTextInputNameElement.value = "";
  popupTextInputJobElement.value = "";
  popupTextInputNameElement.placeholder = "Название";
  popupTextInputJobElement.placeholder = "Ссылка на картинку";
  formButton.textContent = "Создать";
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

const closePopup = () => {
  popupElement.classList.remove("popup_opened");
};

const closeImagePopup = (evt) => {
  evt.target.closest(".popup_type_image").classList.remove("popup_opened");
};

popupCloseButtonElement.addEventListener("click", closePopup);
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
      name: popupTextInputNameElement.value,
      link: popupTextInputJobElement.value,
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

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  if (formButton.textContent === "Сохранить") {
    editProfile();
    closePopup();
  } else if (formButton.textContent === "Создать") {
    addCard();
    closePopup();
  }
};

formElement.addEventListener("submit", formSubmitHandler);
