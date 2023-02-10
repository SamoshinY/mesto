import {
  configFormValidation,
  popupTextInputNameElement,
  popupTextInputJobElement,
  profileEditButtonElement,
  addCardButtonElement,
  avatarImage,
} from "../utils/constants.js";
import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

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
    userInfo.setAvatar(data);
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
        console.log(`Ошибка: ${err}`);
      });
  });
};

const handleLikeClick = (card) => {
  !card.isLike
    ? api
        .likeSetting(card._id)
        .then((data) => {
          card._likeQuantity.textContent = data.likes.length;
          card.toggleLike();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    : api
        .likeRemoving(card._id)
        .then((data) => {
          card._likeQuantity.textContent = data.likes.length;
          card.toggleLike();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
};

// Вызов валидации

const validate = (formElement) => {
  const formValidator = new FormValidator(configFormValidation, formElement);
  formValidator.enableValidation();
  formValidator.resetInputErrors();
};

// Экземпляр класса Api

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "d322a368-4724-446c-8427-74524503d98e",
    "Content-Type": "application/json",
  },
});

let myId;

Promise.all([api.getInfoMe(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    myId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    section.renderElements(cardsData.reverse());
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// Экземпляр для модалки с картинкой

const imageZoom = new PopupWithImage(".popup_type_image");
imageZoom.setEventListeners();

// Экземпляр для модалки подтверждения удаления карточки

const popupConfirm = new PopupWithConfirmation(".popup_type_confirm");
popupConfirm.setEventListeners();

const popupEdit = new PopupWithForm(
  ".popup_type_edit",
  editProfileSubmitHandler
);
popupEdit.setEventListeners();

// Рендер карточек

const renderCard = (item) => {
  const card = new Card({
    ...item,
    userId: myId,
    templateSelector: ".cards__card",
    handleImageClick: handleImageClick,
    handleDeleteClick: handleDeleteClick,
    handleLikeClick: handleLikeClick,
  });
  const cardElement = card.generateCard();
  section.addItem(cardElement);
};
const section = new Section(renderCard, ".cards");

// Редактирование профиля

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__job",
  ".profile__image"
);

profileEditButtonElement.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  popupTextInputNameElement.value = name;
  popupTextInputJobElement.value = about;
  popupEdit.open();
  validate(popupEdit.getFormElement());
});

// Добавление карточки

const popupAdd = new PopupWithForm(".popup_type_add", addCardSubmitHandler);
popupAdd.setEventListeners();

addCardButtonElement.addEventListener("click", () => {
  popupAdd.open();
  validate(popupAdd.getFormElement());
});

// Замена аватара

const popupAvatar = new PopupWithForm(
  ".popup_type_change-avatar",
  changeAvatarSubmitHandler
);
popupAvatar.setEventListeners();

avatarImage.addEventListener("click", () => {
  popupAvatar.open();
  validate(popupAvatar.getFormElement());
});
