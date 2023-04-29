
// объявляю переменные

// profile

const popupOpenPopupBtn = document.querySelector('.profile__edit-btn');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');

// popups
const popup = document.querySelector('.popup');


//popup 1 (edit profile)

const formEditElement = document.getElementById('popupEditForm');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditCloseBtn = popup.querySelector('.popup__edit-close-btn');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');

//popup 2 (add elements)

const formAddElement = document.getElementById('popupAddForm');
const popupAdd = document.querySelector('.popup_type_add');
const popupAddCloseBtn = popupAdd.querySelector('.popup__add-close-btn');
const popupAddOpenBtn = document.querySelector('.profile__add-btn');
const nameInputElement = document.querySelector('#nameAdd');
const linkInput = document.querySelector('#linkAdd');

// popup 3 (place)
const popupPlace = document.querySelector('.popup_type_place');
const popupPlaceCloseBtn = document.querySelector('.popup__place-close-btn');
const popupPlaceTitle = document.querySelector('.popup__place-title');
const popupImage = popupPlace.querySelector('.popup__image');

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

  // слушатель открытия фотографий

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

// const togglePopup = function (popup, placeImage) {
//   popup.classList.toggle('popup_opened')

//   // реализовываем открытие фотографий

//   if (placeImage) {
//     popup.querySelector('.popup__image').src = placeImage.src;
//     popupPlaceTitle.textContent = placeImage.alt;
//   }
// };

const openPopup = (popup) => {
  popup.classList.add('popup_opened')
}

function closePopupEditByClick(evt) {
  let isOverlay = evt.target.classList.contains("popup_type_edit");
  let isCloseBtn = evt.target.classList.contains("popup__edit-close-btn");
  if (isOverlay || isCloseBtn) {
    closePopup(popupEdit);
  }
};

function closePopupAddByClick(evt) {
  let isOverlay = evt.target.classList.contains("popup_type_add");
  let isCloseBtn = evt.target.classList.contains("popup__add-close-btn");
  if (isOverlay || isCloseBtn) {
    closePopup(popupAdd);
  }
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}


// popup 1. сохраненяем инпуты

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameInputprofile.textContent = nameInput.value;
  jobInfoProfile.textContent = jobInput.value;
  closePopup(popupEdit);
}

// заполняем инпуты значением из страницы

popupOpenPopupBtn.addEventListener('click', () => {
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

//popup 3

function closePopupPlaceByClick(evt) {
  let isOverlay = evt.target.classList.contains("popup_type_place");
  let isCloseBtn = evt.target.classList.contains("popup__place-close-btn");
  if (isOverlay || isCloseBtn) {
    closePopup(popupPlace);
  }
};

// слушатели

formEditElement.addEventListener('submit', handleEditFormSubmit);
formAddElement.addEventListener('submit', handleAddFormSubmit);
// popupAdd.addEventListener('submit', handleAddPlaceFormSubmit);
popupOpenPopupBtn.addEventListener('click', () => openPopup(popupEdit));
popupEdit.addEventListener('click', closePopupEditByClick);
popupEditCloseBtn.addEventListener('click', () => closePopup(popupEdit));
popupAddOpenBtn.addEventListener('click', () => openPopup(popupAdd));
popupAdd.addEventListener('click', closePopupAddByClick);
popupAddCloseBtn.addEventListener('click', () => closePopup(popupAdd));
popupPlaceCloseBtn.addEventListener('click', () => closePopup(popupPlace));
popupPlace.addEventListener('click', closePopupPlaceByClick);
// popupImage.addEventListener('click', () => closePopup(popupPlace));


// console.log();
