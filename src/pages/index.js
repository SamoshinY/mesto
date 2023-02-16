import { elements,
  configFormValidation
} from "../utils/constants.js";
import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

// Обработчики отправки форм

const editProfileSubmitHandler = (values) => {
  return api.editUserProfile(values).then((data) => {
    userInfo.setUserInfo(data);
    popupEdit.close();
  });
};

const addCardSubmitHandler = (values) => {
  return api.addNewCard(values).then((data) => {
    renderCard(data);
    popupAdd.close();
  });
};

const changeAvatarSubmitHandler = (values) => {
  return api.changeUserAvatar(values).then((data) => {
    userInfo.setUserInfo(data);
    popupAvatar.close();
  });
};

// Обработчики кликов карточки

const handleImageClick = (card) => {
  imageZoom.open(card._data);
};

const handleDeleteClick = (card) => {
  popupConfirm.open(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card.deleteCardInFrontOfMe();
        popupConfirm.close();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  });
};

const handleLikeClick = (card) => {
  const likeSetOrRemove = !card.isLike
    ? api.likeSetting(card._id)
    : api.likeRemoving(card._id);
  return likeSetOrRemove;
};

// Валидация

const validate = (formElement) => {
  const formValidator = new FormValidator(configFormValidation, formElement);
  formValidator.enableValidation();
  formValidator.resetInputErrors();
};

// Обработчики кликов кнопок открытия модалок

const editProfile = () => {
  const { name, about } = userInfo.getUserInfo();
  elements.nameElement.value = name;
  elements.aboutElement.value = about;
  popupEdit.open();
  validate(popupEdit._form);
};

const addCard = () => {
  popupAdd.open();
  validate(popupAdd._form);
};

const changeAvatar = () => {
  popupAvatar.open();
  validate(popupAvatar._form);
};

// Рендер карточки и экземпляр Card

const renderCard = (item) => {
  const card = new Card({
    ...item,
    userId: userInfo.id,
    templateSelector: ".cards__card",
    handleImageClick: handleImageClick,
    handleDeleteClick: handleDeleteClick,
    handleLikeClick: handleLikeClick,
  });
  const cardElement = card.generateCard();
  section.addItem(cardElement);
};

// Экземпляры классов

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "d322a368-4724-446c-8427-74524503d98e",
    "Content-Type": "application/json",
  },
});
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__job",
  ".profile__image"
);
const popupEdit = new PopupWithForm(
  ".popup_type_edit",
  editProfileSubmitHandler
);
const popupAdd = new PopupWithForm(".popup_type_add", addCardSubmitHandler);
const popupAvatar = new PopupWithForm(
  ".popup_type_change-avatar",
  changeAvatarSubmitHandler
);
const imageZoom = new PopupWithImage(".popup_type_image");
const popupConfirm = new PopupWithConfirmation(".popup_type_confirm");
const section = new Section(renderCard, ".cards");

// Установка слушателей экземпляров классов

popupEdit.setEventListeners();
popupAdd.setEventListeners();
imageZoom.setEventListeners();
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();

// Слушатели открытия модалок

elements.profileEditButtonElement.addEventListener("click", editProfile);
elements.addCardButtonElement.addEventListener("click", addCard);
elements.avatarImageElement.addEventListener("click", changeAvatar);

// Получение информации о пользователе и отрисовка массива карточек

Promise.all([api.getInfoMe(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    section.renderElements(cardsData.reverse());
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });
