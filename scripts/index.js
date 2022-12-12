import { initialCards } from "./arr.js";

// Глобальные переменные
const popupEditElement = document.querySelector(".popup_type_edit");
const formEditElement = popupEditElement.querySelector(".form_type_edit");
// const popupEditCloseButtonElement =
//   popupEditElement.querySelector(".popup__close");
const popupTextInputNameElement = formEditElement.querySelector(
  ".form__item_text_name"
);
const popupTextInputJobElement = formEditElement.querySelector(
  ".form__item_text_job"
);

const popupAddElement = document.querySelector(".popup_type_add");
const formAddElement = popupAddElement.querySelector(".form_type_add");
// const popupAddCloseButtonElement =
//   popupAddElement.querySelector(".popup__close");
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
const cardTemplate = document.querySelector("#card-template").content;
const addCardButtonElement = profileElement.querySelector(".profile__add");

const popupImageElement = document.querySelector(".popup_type_image");
// const popupCloseImageElement = popupImageElement.querySelector(".popup__close");
const popupImage = popupImageElement.querySelector(".popup__image");
const popupCaption = popupImageElement.querySelector(".popup__caption");

// Открытие попапов

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", closePopupByEsc);
  popup.addEventListener("mousedown", closePopupByOverlay);
};

// Закрытие попапов

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", closePopupByEsc);
  popup.removeEventListener("click", closePopupByOverlay);
};

// Закрытие  по Esc

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

// Закрытие по оверлею

const closePopupByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target.closest(".popup"));
  }
};

// Лайк карточки

const likeCard = (evt) => evt.target.classList.toggle("cards__like_active");

// Удаление карточки

const deleteCard = (evt) => evt.target.closest(".cards__card").remove();

// Создание карточки

const createCard = (item) => {
  const cardElement = cardTemplate
    .querySelector(".cards__card")
    .cloneNode(true);
  const itemName = cardElement.querySelector(".cards__title");
  const itemLink = cardElement.querySelector(".cards__image");
  itemName.textContent = item.name;
  itemLink.src = item.link;
  itemLink.alt = item.name;
  cardElement.querySelector(".cards__like").addEventListener("click", likeCard);
  cardElement
    .querySelector(".cards__delete")
    .addEventListener("click", deleteCard);
  cardElement.querySelector(".cards__image").addEventListener("click", () => {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupCaption.textContent = item.name;
    openPopup(popupImageElement);
  });
  return cardElement;
};

// Добавление карточки в контейнер на странице

const addCard = (container, item) => container.prepend(createCard(item));

// Создание заготовки из полей инпута

const createItem = (item) => {
  item.name = popupTextInputPlaceNameElement.value;
  item.link = popupTextInputLinkElement.value;
}

// Создание и добавление на страницу новой карточки

const addNewCard = (container) => {
  const item = {};
  createItem(item);
  addCard(container, item);
};

// Загрузка карточек на страницу

const renderCards = (arr, container) => {
  arr.map((item) => {
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

// Закрытие модалок вариант 1 три слушателя событий

// popupEditCloseButtonElement.addEventListener("click", () => {
//   closePopup(popupEditElement);
// });

// popupAddCloseButtonElement.addEventListener("click", () => {
//   closePopup(popupAddElement);
// });

// popupCloseImageElement.addEventListener("click", (evt) => {
//   closePopup(evt.target.closest(".popup_type_image"));
// });

// Вариант 2 один слушатель, цикл. Можно удалить переменные, которые выбирают каждый крестик

const buttonsClosePopup = document.querySelectorAll(".popup__close");//
for (const button of buttonsClosePopup) {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
}

// Вариант 3 один слушатель, делегирование событий. Можно удалить переменные, которые выбирают каждый крестик

// document.addEventListener('click', evt => {
//       if (evt.target.className === "popup__close") {
//          closePopup(evt.target.closest(".popup"));
//       }
//     });

formEditElement.addEventListener("submit", editFormSubmitHandler);
formAddElement.addEventListener("submit", addFormSubmitHandler);

// Вызов функции занрузки карточек

renderCards(initialCards, cardsContainer);
