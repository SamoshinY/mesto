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
  popupImageElement,
  popupImage,
  popupCaption,
} from "../utils/constants.js";
import '../pages/index.css';
import { Card } from "../components/card.js";
import { FormValidator } from "../components/formValidator.js";
import { Section } from "../components/section.js";
import { PopupWithImage } from "../components/popupWithImage.js";
import { PopupWithForm } from "../components/popupWithForm.js";
import { UserInfo } from "../components/userInfo.js";

// Экземпляр для модалки с картинкой

const imageZoom = new PopupWithImage(
  popupImageElement,
  popupImage,
  popupCaption
);
imageZoom.setEventListeners();

// Рендер карточек

const renderCard = (item) => {
  const handleImageClick = (name, link) => {
    imageZoom.open(name, link);
  };
  const card = new Card(item, ".cards__card", handleImageClick);
  const cardElement = card.generateCard();
  section.addItem(cardElement);
};

const section = new Section([initialCards, renderCard], cardsContainer);
section.renderElements();

// Редактирование профиля

const userInfo = new UserInfo(profileTextNameElement, profileTextJobElement);

const popupEdit = new PopupWithForm(popupEditElement, () => {
  userInfo.setUserInfo(popupTextInputNameElement, popupTextInputJobElement);
});
popupEdit.setEventListeners();

profileEditButtonElement.addEventListener("click", () => {
  popupTextInputNameElement.value = userInfo.getUserInfo().name;
  popupTextInputJobElement.value = userInfo.getUserInfo().info;
  popupEdit.open();
});

// Добавление карточки

const popupAdd = new PopupWithForm(popupAddElement, (item) => {
  item.name = popupTextInputPlaceNameElement.value;
  item.link = popupTextInputLinkElement.value;
  renderCard(item);
});
popupAdd.setEventListeners();

addCardButtonElement.addEventListener("click", () => {
  popupAdd.open();
});

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
