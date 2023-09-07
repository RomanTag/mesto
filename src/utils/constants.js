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

// avatar
export const avatarSelector = '.profile__avatar-image';
export const popupAvatarSelector = '.popup_type_avatar';

//popup
export const popupList = Array.from(document.querySelectorAll('.popup'));

// popup 1 (edit profile)
export const popupNameSelector = '.popup_type_edit';
export const profileSelector = '.profile'
export const profileEditButtonSelector = '.profile__edit-btn';
export const avatarEditButtonSelector = '.profile__avatar-edit-btn';
export const nameInputProfile = '.profile__name';
export const jobInfoProfile = '.profile__data';

//popup 2 (add elements)
export const popupAddSelector = '.popup_type_add';
export const cardAddButtonSelector = '.profile__add-btn';
export const formCardDataElement = document.forms.popupAddForm;

// popup 3 (place)
export const popupPlaceSelector = '.popup_type_place';

// popup 4 (delete)
export const popupDeleteSelector = '.popup_type_delete';

// card
export const selectorTemplate = '#card-template';
export const cardListSelector = '.card';
