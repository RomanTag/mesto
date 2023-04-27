
// popups
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__input-container');
const popupCloseBtn = popup.querySelector('.popup__close-btn');


//popup 1 (edit profile)

// const popupEdit = document.querySelector('.popup__edit');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');


//popup 2 (edit add elements)

const popupAdd = document.querySelector('.popup__add');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close-btn');
const popupAddOpenBtn = document.querySelector('.profile__add-btn');
const nameInputElement = document.querySelector('#nameAdd');
const linkInput = document.querySelector('#linkAdd');
console.log(nameInputElement);


// profile

const popupOpenPopupBtn = document.querySelector('.profile__edit-btn');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');

// place

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

  placeDeleteBtn.addEventListener('click', handleDelete);
  placeLikeBtn.addEventListener('click', handleLike);


  return placeElement;
}

places.forEach((place) => {
  const element = createPlaceElement(place);
  placeList.append(element);
});

// добавления карточки из инпутов

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

  closePopup(popupAdd);
};

popupAdd.addEventListener('submit', handleAddPlaceFormSubmit);


// открытие/закрытие попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function handleFormSubmit (evt) {
    evt.preventDefault();
    nameInputprofile.textContent = nameInput.value;
    jobInfoProfile.textContent = jobInput.value;
    closePopup(popup);
}


popupOpenPopupBtn.addEventListener('click', () => {
  openPopup(popup);
  nameInput.value = nameInputprofile.textContent;
  jobInput.value = jobInfoProfile.textContent;

});

popupCloseBtn.addEventListener('click', () => closePopup(popup));

formElement.addEventListener('submit', handleFormSubmit);

popupAddOpenBtn.addEventListener('click', () => openPopup(popupAdd));
popupAddCloseBtn.addEventListener('click', () => closePopup(popupAdd));

console.log();
