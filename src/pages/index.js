import {
  configFormValidation,
  formEditElement,
  formAddElement,
  popupTextInputNameElement,
  popupTextInputJobElement,
  profileEditButtonElement,
  addCardButtonElement,
  avatarImage,
  formAvatarElement,
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

// Рендер карточек

const renderCard = (item) => {
  const handleImageClick = (name, link) => {
    imageZoom.open(name, link);
  };

  const handleDeleteClick = (id) => {
    popupConfirm.open(() => {
      api
        .deleteCard(id)
        .then(() => {
          card.deleteCardInFrontOfMe();
          popupConfirm.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    });
  };

  const handleLikeClick = (id, selector, counterElement) => {
    !selector
      ? api
          .likeSetting(id)
          .then((data) => {
            counterElement.textContent = data.likes.length;
            card.toggleLike();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      : api
          .likeRemoving(id)
          .then((data) => {
            counterElement.textContent = data.likes.length;
            card.toggleLike();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
  };

  const card = new Card(
    item,
    myId,
    ".cards__card",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
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
const popupEdit = new PopupWithForm(".popup_type_edit", () => {
  popupEdit.setButtonText("Сохранение...");
  api
    .editUserProfile(popupEdit.getInputValues())
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(popupEdit.setButtonText("Сохранить"));
});
popupEdit.setEventListeners();

profileEditButtonElement.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  popupTextInputNameElement.value = name;
  popupTextInputJobElement.value = about;
  popupEdit.open();
});

// Добавление карточки

const popupAdd = new PopupWithForm(".popup_type_add", () => {
  popupAdd.setButtonText("Сохранение...");
  api
    .addNewCard(popupAdd.getInputValues())
    .then((data) => {
      renderCard(data);
      popupAdd.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAdd.setButtonText("Создать");
    });
});

popupAdd.setEventListeners();

addCardButtonElement.addEventListener("click", () => {
  popupAdd.open();
});

// Замена аватара

const popupAvatar = new PopupWithForm(".popup_type_change-avatar", () => {
  popupAvatar.setButtonText("Сохранение...");
  const inputValues = popupAvatar.getInputValues();
  api
    .changeUserAvatar(inputValues)
    .then((data) => {
      userInfo.setAvatar(data);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(popupAvatar.setButtonText("Сохранить"));
});
popupAvatar.setEventListeners();

avatarImage.addEventListener("click", () => {
  popupAvatar.open();
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

const formAvatarValidator = new FormValidator(
  configFormValidation,
  formAvatarElement
);
formAvatarValidator.enableValidation();
