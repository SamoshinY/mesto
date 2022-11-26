const popupElement = document.querySelector(".popup");
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

const cardsContainer = document.querySelector(".cards");

const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.querySelector(".cards__card");

initialCards.forEach(function (item) {
  const elem = createCard(item);
  cardsContainer.append(elem);
});

function createCard(item) {
  cardElement.querySelector(".cards__title").textContent = item.name;
  cardElement.querySelector(".cards__image").src = item.link;
  const card = cardElement.cloneNode(true);
  return card;
}

const openPopup = function () {
  popupElement.classList.add("popup_opened");
  popupTextInputNameElement.value = profileTextNameElement.textContent;
  popupTextInputJobElement.value = profileTextJobElement.textContent;
};
const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTextNameElement.textContent = popupTextInputNameElement.value;
  profileTextJobElement.textContent = popupTextInputJobElement.value;
  closePopup();
}

profileEditButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
