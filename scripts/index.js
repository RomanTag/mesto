// Подключаю модули

import { cards } from "./rm_constants.js";

import { Card } from "./card.js"

import { FormValidator } from "./FormValidator.js"

// объявляю переменные

// profile

const popupNameOpenBtn = document.querySelector('.profile__edit-btn');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');

//popup

const popupList = Array.from(document.querySelectorAll('.popup'));

//popup 1 (edit profile)

const formNameElement = document.getElementById('popupEditForm');
const popupName = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const formNameDataElement = document.forms.popupEditForm;

//popup 2 (add elements)

const formAddElement = document.getElementById('popupAddForm');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddOpenBtn = document.querySelector('.profile__add-btn');
const nameInputElement = document.querySelector('#place');
const linkInput = document.querySelector('#link');
const formCardDataElement = document.forms.popupAddForm;

// popup 3 (place)

const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceTitle = document.querySelector('.popup__place-title');
const popupImage = popupPlace.querySelector('.popup__image');

// card

const selectorTemplate = '#card-template';
const cardList = document.querySelector('.card');


// template

function addCard(cardData) {
  const newCardElement = createNewCard(cardData);
  cardList.prepend(newCardElement);
}

// функция для создания элемента

function createNewCard(element) {
  const card = new Card(element, selectorTemplate, handleCardImageClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardImageClick(cardData) {
  popupPlaceTitle.textContent = cardData.name;
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  openPopup(popupPlace);
};

// вставляем контент на страницу

cards.forEach(element => {
  addCard(element);
});

// валидирую

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_invalid',
  inputErrorClass: 'popup__input-container_invalid',
  inputContainerSelector: '.popup__input-container',
  errorClass: 'popup__error-message'
};

const formNameDataValidator = new FormValidator(validationConfig, formNameDataElement);
formNameDataValidator.enableValidation()

const formCardDataValidator = new FormValidator(validationConfig, formCardDataElement);
formCardDataValidator.enableValidation()

// попапы

// открываю попапы

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('click', handlePopupClose);
  document.addEventListener('keydown', handleEscClose);
};

// закрываю попапы

const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('click', handlePopupClose);
  document.removeEventListener('keydown', handleEscClose);
};

// закрываю попапы через оверлей и escape

const handlePopupClose = (evt) => {
  const isOverlay = evt.target.classList.contains('popup');
  const isCloseBtn = evt.target.classList.contains('popup__close-btn');

  if (isOverlay || isCloseBtn) {
    popupList.forEach(closePopup);
  }
};

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    popupList.forEach(closePopup);
  }
};

// popup 1. сохраненяем инпуты

const handleNameFormSubmit = (evt) => {
  evt.preventDefault();
  nameInputprofile.textContent = nameInput.value;
  jobInfoProfile.textContent = jobInput.value;
  closePopup(popupName);
};

// заполняем инпуты значением из страницы

popupNameOpenBtn.addEventListener('click', () => {
  formNameDataValidator.resetValidation();
  openPopup(popupName);
  nameInput.value = nameInputprofile.textContent;
  jobInput.value = jobInfoProfile.textContent;
});

popupAddOpenBtn.addEventListener('click', () => {
  formCardDataValidator.resetValidation();
  formAddElement.reset();
  openPopup(popupAdd);
});

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: nameInputElement.value,
    link: linkInput.value
  };

  // добавляем новую карточку на страницу

  addCard(newCardData);

  // отчищаем инпуты

  formAddElement.reset();

  //закрываем попап

  closePopup(popupAdd);

};

// слушатели

formNameElement.addEventListener('submit', handleNameFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);
