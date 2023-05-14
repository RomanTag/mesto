
// подключаю код

import { places } from "./rm_constants.js";

import enableValidation from "./validate.js"

import { disableBtn } from "./validate.js"

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

// place

const placeTemplate = document.getElementById('place-template');
const placeList = document.querySelector('.place');

// temlate

// функция для создания элемента

const createPlaceElement = (placeData) => {

  // объявляю переменные

  const placeElement = placeTemplate.content.querySelector('.place__list').cloneNode(true);
  const placeImage = placeElement.querySelector('.place__image');
  const placeTitle = placeElement.querySelector('.place__title');
  const placeDeleteBtn = placeElement.querySelector('.place__delete-btn');
  const placeLikeBtn = placeElement.querySelector('.place__like-btn');

  // присваиваю значения

  placeTitle.textContent = placeData.name;
  placeImage.src = placeData.link;
  placeImage.alt = placeData.name;

  // функция удаления карточки

  const handleDelete = () => {
    placeElement.remove();
  };

  // функция лайка

  const handleLike = (evt) => {
    placeLikeBtn.classList.toggle('place__like-btn_active');
  };

  // вешаю слушатели

  placeDeleteBtn.addEventListener('click', handleDelete);
  placeLikeBtn.addEventListener('click', handleLike);

  // popup 3 слушатель открытия фотографий

  placeImage.addEventListener('click', () => {
    popupPlaceTitle.textContent = placeTitle.textContent;
    popupImage.src = placeImage.src;
    popupImage.alt = placeImage.alt;
    openPopup(popupPlace, placeImage);
  });

  // возвращаю готовый элемент

  return placeElement;
}

// вставляем контент на страницу

places.forEach((place) => {
  const element = createPlaceElement(place);
  placeList.append(element);
});

// попапы

// функция открытия и закрытия попапов

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

  const newPlaceData = {
    name: nameInputElement.value,
    link: linkInput.value
  };

  // вставляем контент на страницу

  const newPlaceElement = createPlaceElement(newPlaceData);
  placeList.prepend(newPlaceElement);

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
  errorClass: 'popup__error-message'
};

enableValidation(validationConfig);

// слушатели


formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);
// popupEditCloseBtn.addEventListener('click', () => closePopup(popupEdit));
// popupAddOpenBtn.addEventListener('click', () => openPopup(popupAdd));
popupAddOpenBtn.addEventListener('click', () => {
  formAddElement.reset();
  disableBtn(submitPlace, { inactiveButtonClass: 'popup__btn_invalid' });
  openPopup(popupAdd);

});

// popupAddCloseBtn.addEventListener('click', () => closePopup(popupAdd));
popupPlaceCloseBtn.addEventListener('click', () => closePopup(popupPlace));
