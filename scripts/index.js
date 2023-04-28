
// popups
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__input-container');
const popupCloseBtn = popup.querySelector('.popup__close-btn');


//popup 1 (edit profile)

const popupEdit = document.querySelector('.popup__edit');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');


//popup 2 (add elements)

const popupAdd = document.querySelector('.popup__add');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close-btn');
const popupAddOpenBtn = document.querySelector('.profile__add-btn');
const nameInputElement = document.querySelector('#nameAdd');
const linkInput = document.querySelector('#linkAdd');

// profile

const popupOpenPopupBtn = document.querySelector('.profile__edit-btn');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');

// popup 3 (place)
const popupPlace = document.querySelector('.popup__place');
const popupPlaceCloseBtn = document.querySelector('.popup__place-close-btn');
const popupPlaceTitle = document.querySelector('.popup__place_title');

// temlate

import { places } from "./constants.js";

const placeTemplate = document.getElementById('place-template');
const placeList = document.querySelector('.place');

const createPlaceElement = (placeData) => {
  const placeElement = placeTemplate.content.querySelector('.place__list').cloneNode(true);
  const placeImage = placeElement.querySelector('.place__image');
  const placeTitle = placeElement.querySelector('.place__title');
  const placeDeleteBtn = placeElement.querySelector('.place__delete-btn');
  const placeLikeBtn = placeElement.querySelector('.place__like-btn');

  placeTitle.textContent = placeData.name;
  placeImage.src = placeData.link;
  placeImage.alt = placeData.name;



  const handleDelete = () => {
    placeElement.remove();
  };

  const handleLike = (evt) => {
    placeLikeBtn.classList.toggle('place__like-btn_active');
  };

  placeImage.addEventListener('click', () => togglePopup(popupPlace, placeImage));

  placeDeleteBtn.addEventListener('click', handleDelete);
  placeLikeBtn.addEventListener('click', handleLike);

  return placeElement;
}

places.forEach((place) => {
  const element = createPlaceElement(place);
  placeList.append(element);
});

// функция открытия и закрытия попапов

const togglePopup = function (popup, placeImage) {
  popup.classList.toggle('popup_opened')

  if (placeImage) {
    popup.querySelector('.popup__image').src = placeImage.src;
    popupPlaceTitle.textContent = placeImage.alt;
  }
};



// popup 1. заполнение импутов значением



// popup 1. сохранение инпутов

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInputprofile.textContent = nameInput.value;
  jobInfoProfile.textContent = jobInput.value;
  togglePopup(popupEdit);
}

// popup 2. добавления карточки из инпутов

const handleAddPlaceFormSubmit = (evt) => {
  evt.preventDefault();

  const newPlaceData = {
    name: nameInputElement.value,
    link: linkInput.value
  };

  const newPlaceElement = createPlaceElement(newPlaceData);
  placeList.prepend(newPlaceElement);

  nameInputElement.value = '';
  linkInput.value = '';

  togglePopup(popupAdd);
  togglePopup(newPlaceElement.querySelector('.place__image'));
};

// слушатели

popupOpenPopupBtn.addEventListener('click', () => {
  nameInput.value = nameInputprofile.textContent;
  jobInput.value = jobInfoProfile.textContent;
});

formElement.addEventListener('submit', handleFormSubmit);
popupAdd.addEventListener('submit', handleAddPlaceFormSubmit);

popupOpenPopupBtn.addEventListener('click', () => togglePopup(popupEdit));
popupCloseBtn.addEventListener('click', () => togglePopup(popupEdit));
popupAddOpenBtn.addEventListener('click', () => togglePopup(popupAdd));
popupAddCloseBtn.addEventListener('click', () => togglePopup(popupAdd));
popupPlaceCloseBtn.addEventListener('click', () => togglePopup(popupPlace));


// console.log();
