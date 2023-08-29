// объявляю переменные

export const cards = [
  {
    name: 'Газорпазорп',
    link: 'https://leonardo.osnova.io/c837b2f0-29e1-d74a-c0d5-e20e1d5ac867/'
  },
  {
    name: 'Мир разумных собак',
    link: 'https://leonardo.osnova.io/832c4a60-c17e-cd36-abb9-a84a480a15c3/'
  },
  {
    name: 'Планета Судной ночи',
    link: 'https://leonardo.osnova.io/98af3522-1e7c-ae9f-c687-d0a0ae0cd4b5/'
  },
  {
    name: 'Альфабетриум',
    link: 'https://leonardo.osnova.io/ef688956-21dc-c001-6642-c275c736df36/'
  },
  {
    name: 'Плутон',
    link: 'https://leonardo.osnova.io/cf4086a0-0c2c-4d2d-afa2-af81fc259daf/'
  },
  {
    name: 'Мир снов',
    link: 'https://leonardo.osnova.io/05ee0baf-1600-056e-ec97-31da81f3aae3/'
  }
];

// validationConfig

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_invalid',
  inputErrorClass: 'popup__input-container_invalid',
  inputContainerSelector: '.popup__input-container',
  errorClass: 'popup__error-message'
};

// profile

export const popupNameOpenBtn = document.querySelector('.profile__edit-btn');
export const nameInputProfile = '.profile__name';
export const jobInfoProfile = '.profile__data';

//popup

export const popupList = Array.from(document.querySelectorAll('.popup'));

//popup 1 (edit profile)

export const formNameElement = document.getElementById('popupEditForm');
export const popupName = document.querySelector('.popup_type_edit');
export const popupNameSelector = '.popup_type_edit';
export const nameInput = document.querySelector('#name');
export const infoInput = document.querySelector('#info');
export const formNameDataElement = document.forms.popupEditForm;

//popup 2 (add elements)

export const formAddElement = document.getElementById('popupAddForm');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupAddSelector = '.popup_type_add';
export const popupAddOpenBtn = document.querySelector('.profile__add-btn');
export const nameInputElement = document.querySelector('#place');
export const linkInput = document.querySelector('#link');
export const formCardDataElement = document.forms.popupAddForm;

// popup 3 (place)

export const popupPlaceSelector = '.popup_type_place';
export const popupPlaceTitle = document.querySelector('.popup__place-title');
export const popupImage = document.querySelector('.popup__image');
export const cardListContainer = document.querySelector('.card');
// card

export const selectorTemplate = '#card-template';
export const cardList = '.card';
