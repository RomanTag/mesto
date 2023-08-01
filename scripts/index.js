
// подключаю код

import { cards } from "./rm_constants.js";

import enableValidation from "./validate.js"

import { disableBtn } from "./validate.js"

import { Card } from "./card.js"

// объявляю переменные

// profile

const popupEditOpenBtn = document.querySelector('.profile__edit-btn');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');

//popup

const popupList = Array.from(document.querySelectorAll('.popup'));

//popup 1 (edit profile)

const formEditElement = document.getElementById('popupEditForm');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditCloseBtn = document.querySelector('.popup__edit-close-btn');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');

//popup 2 (add elements)

const formAddElement = document.getElementById('popupAddForm');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseBtn = popupAdd.querySelector('.popup__add-close-btn');
const popupAddOpenBtn = document.querySelector('.profile__add-btn');
const nameInputElement = document.querySelector('#place');
const linkInput = document.querySelector('#link');

// popup 3 (place)

const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceCloseBtn = document.querySelector('.popup__place-close-btn');
const popupPlaceTitle = document.querySelector('.popup__place-title');
const popupImage = popupPlace.querySelector('.popup__image');

// card

const selectorTemplate = '#card-template';
console.log(selectorTemplate);
const cardList = document.querySelector('.card');


// temlate

function addCard(cardData) {
  const newCardElement = createNewCard(cardData);
  cardList.prepend(newCardElement);
}

// функция для создания элемента

function createNewCard(element) {
  const card = new Card(element, selectorTemplate, handleCardImageClick);
  console.log(card)
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


// class formValidator {
//   constructor(config, form) {
//     this._formSelector = config.formSelector;
//     this._inputSelector = config.inputSelector;
//     this._submitButtonSelector = config.submitButtonSelector;
//     this._inactiveButtonClass = config.inactiveButtonClass;
//     this._inputErrorClass = config.inputErrorClass;
//     this._inputErrorClass = config.inputErrorClass;
//     this._inputContainerSelector = config.inputContainerSelector
//     this._errorClass = config.errorClass;
//     this._form = form;
//   }
// }

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
    // formAddElement.reset();
  }
};

// popup 1. сохраненяем инпуты

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  nameInputprofile.textContent = nameInput.value;
  jobInfoProfile.textContent = jobInput.value;
  closePopup(popupEdit);
};


// заполняем инпуты значением из страницы

popupEditOpenBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = nameInputprofile.textContent;
  jobInput.value = jobInfoProfile.textContent;
});

// popup 2. добавляем карточки через инпуты

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

enableValidation(validationConfig);

// слушатели


formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);
popupAddOpenBtn.addEventListener('click', () => {
  formAddElement.reset();
  disableBtn(submitPlace, { inactiveButtonClass: 'popup__btn_invalid' });
  openPopup(popupAdd);

});

