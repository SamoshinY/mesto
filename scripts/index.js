const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.form');
const popupCloseButtonElement = formElement.querySelector('.form__close');
const popupSaveButtonElement = formElement.querySelector('.form__save');
let popupTextInputNameElement = formElement.querySelector('.form__item_text_name');
let popupTextInputJobElement = formElement.querySelector('.form__item_text_job');
const profileElement = document.querySelector('.profile');
const profileEditButtonElement = profileElement.querySelector('.profile__edit');
const profileAddButtonElement = profileElement.querySelector('.profile__add');
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

profileEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  console.log(popupTextInputNameElement.value);
  console.log(popupTextInputJobElement.value);
  profileTextNameElement.textContent = popupTextInputNameElement.value;
  profileTextJobElement.textContent = popupTextInputJobElement.value;
  closePopup(); 
}

formElement.addEventListener('submit', formSubmitHandler);