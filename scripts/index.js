import {
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
} from "./constants.js";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";

// Открытие попапов

export const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", closePopupByEsc);
  popup.addEventListener("mousedown", closePopupByOverlayAndCloseButton);
};

// Закрытие попапов

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", closePopupByEsc);
  popup.removeEventListener("mousedown", closePopupByOverlayAndCloseButton);
};

// Закрытие  по Esc

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

// Закрытие по оверлею или кнопке с крестиком

const closePopupByOverlayAndCloseButton = (evt) => {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close")
  ) {
    closePopup(evt.target.closest(".popup"));
  }
};

// Создание карточки

const createCard = (item) => {
  const card = new Card(item, ".cards__card");
  return card;
};

// Добавление карточки в контейнер на странице

const addCard = (container, item) => {
  const card = createCard(item);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
};

// Создание заготовки из полей инпута

const createItem = (item) => {
  item.name = popupTextInputPlaceNameElement.value;
  item.link = popupTextInputLinkElement.value;
};

// Создание и добавление на страницу новой карточки

const addNewCard = (container) => {
  const item = {};
  createItem(item);
  addCard(container, item);
};

// Загрузка карточек на страницу

const renderCards = (arr, container) => {
  arr.forEach((item) => {
    addCard(container, item);
  });
};

// Редактирование профиля

const editProfile = () => {
  profileTextNameElement.textContent = popupTextInputNameElement.value;
  profileTextJobElement.textContent = popupTextInputJobElement.value;
};

// Обработка форм

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  editProfile();
  closePopup(popupEditElement);
};

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  addNewCard(cardsContainer);
  closePopup(popupAddElement);
  evt.target.reset();
};

// Слушатели событий

profileEditButtonElement.addEventListener("click", () => {
  popupTextInputNameElement.value = profileTextNameElement.textContent;
  popupTextInputJobElement.value = profileTextJobElement.textContent;
  openPopup(popupEditElement);
});

addCardButtonElement.addEventListener("click", () => {
  openPopup(popupAddElement);
});

formEditElement.addEventListener("submit", editFormSubmitHandler);
formAddElement.addEventListener("submit", addFormSubmitHandler);

// Вызов функции загрузки карточек

renderCards(initialCards, cardsContainer);

// Вызов валидации

const formEditValidator = new FormValidator(
  configFormValidation,
  formEditElement
);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(
  configFormValidation,
  formAddElement
);
formAddValidator.enableValidation();
