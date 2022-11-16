const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.form');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
let popupTextInputNameElement = formElement.querySelector('.form__item_text_name');
let popupTextInputJobElement = formElement.querySelector('.form__item_text_job');
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit');
let profileTextNameElement = profileElement.querySelector('.profile__name');
let profileTextJobElement = profileElement.querySelector('.profile__job');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  popupTextInputNameElement.value = profileTextNameElement.textContent;
  popupTextInputJobElement.value = profileTextJobElement.textContent;
}
const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTextNameElement.textContent = popupTextInputNameElement.value;
  profileTextJobElement.textContent = popupTextInputJobElement.value;
  closePopup();
}

profileEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
