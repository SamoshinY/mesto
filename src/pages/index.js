import {
  initialCards,
  configFormValidation,
  formEditElement,
  formAddElement,
  popupTextInputNameElement,
  popupTextInputJobElement,
  profileEditButtonElement,
  addCardButtonElement,
} from "../utils/constants.js";
import '../pages/index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

// Экземпляр для модалки с картинкой

const imageZoom = new PopupWithImage('.popup_type_image');
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
const section = new Section([initialCards, renderCard], '.cards');
section.renderElements();

// Редактирование профиля

const userInfo = new UserInfo('.profile__name', '.profile__job');
const popupEdit = new PopupWithForm('.popup_type_edit', () => {
  userInfo.setUserInfo(popupEdit.getInputValues());
});
popupEdit.setEventListeners();

profileEditButtonElement.addEventListener("click", () => {
  const { name, info } = userInfo.getUserInfo();
  popupTextInputNameElement.value = name;
  popupTextInputJobElement.value = info;
  popupEdit.open();
});

// Добавление карточки

const popupAdd = new PopupWithForm('.popup_type_add', () => {
  const inputValues = popupAdd.getInputValues();
  renderCard(inputValues);
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
