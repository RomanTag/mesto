
// объявляю переменные

// profile

const popupOpenPopupBtn = document.querySelector('.profile__edit-btn');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');

// popups
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');

//popup 1 (edit profile)

const formEditElement = document.getElementById('popupEditForm');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');

//popup 2 (add elements)

const formAddElement = document.getElementById('popupAddForm');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close-btn');
const popupAddOpenBtn = document.querySelector('.profile__add-btn');
const nameInputElement = document.querySelector('#nameAdd');
const linkInput = document.querySelector('#linkAdd');

// popup 3 (place)
const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceCloseBtn = document.querySelector('.popup__place-close-btn');
const popupPlaceTitle = document.querySelector('.popup__place-title');

// place

const placeTemplate = document.getElementById('place-template');
const placeList = document.querySelector('.place');

// temlate

// импортирую контент который будет загружаться со страницей

import { places } from "./constants.js";

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

  // слушатель открытия фотографии

  placeImage.addEventListener('click', () => togglePopup(popupPlace, placeImage));

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

const togglePopup = function (popup, placeImage) {
  popup.classList.toggle('popup_opened')

  // реализовываем открытие фотографий

  if (placeImage) {
    popup.querySelector('.popup__image').src = placeImage.src;
    popupPlaceTitle.textContent = placeImage.alt;
  }
};

// popup 1. сохраненяем инпуты

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInputprofile.textContent = nameInput.value;
  jobInfoProfile.textContent = jobInput.value;
  togglePopup(popupEdit);
}

// заполняем инпуты значением из страницы

popupOpenPopupBtn.addEventListener('click', () => {
  nameInput.value = nameInputprofile.textContent;
  jobInput.value = jobInfoProfile.textContent;
});

// popup 2. добавляем карточки через инпуты

const handleAddPlaceFormSubmit = (evt) => {
  evt.preventDefault();

  const newPlaceData = {
    name: nameInputElement.value,
    link: linkInput.value
  };

  // вставляем контент на страницу

  const newPlaceElement = createPlaceElement(newPlaceData);
  placeList.prepend(newPlaceElement);

  // отчищаем инпуты

  nameInputElement.value = '';
  linkInput.value = '';

  //закрываем попап

  togglePopup(popupAdd);
};

// слушатели

formEditElement.addEventListener('submit', handleFormSubmit);
formAddElement.addEventListener('submit', handleFormSubmit);

popupAdd.addEventListener('submit', handleAddPlaceFormSubmit);

popupOpenPopupBtn.addEventListener('click', () => togglePopup(popupEdit));
popupCloseBtn.addEventListener('click', () => togglePopup(popupEdit));
popupAddOpenBtn.addEventListener('click', () => togglePopup(popupAdd));
popupAddCloseBtn.addEventListener('click', () => togglePopup(popupAdd));
popupPlaceCloseBtn.addEventListener('click', () => togglePopup(popupPlace));

// console.log();
