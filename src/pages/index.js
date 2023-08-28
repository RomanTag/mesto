import './index.css';
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  cards,
  cardList,
  selectorTemplate,
  popupNameOpenBtn,
  popupAddOpenBtn,
  formNameDataElement,
  formCardDataElement,
  infoInput,
  nameInput,
  popupAdd,
  nameInputProfile,
  jobInfoProfile,
  popupPlaceSelector,
  popupAddSelector,
  popupNameSelector
} from "../utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: nameInputProfile,
  infoSelector: jobInfoProfile
});

function createNewCard(cardData, selectorTemplate) {
  const card = new Card(cardData, selectorTemplate, () => {
    popupImage.open(cardData);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const popupImage = new PopupWithImage(popupPlaceSelector);
popupImage.setEventListeners();

const addNewCards = new Section({
  items: cards,
  renderer: (cardData) => {
    const cardElement = createNewCard(cardData, selectorTemplate);
    addNewCards.addItem(cardElement);
  }
}, cardList);
addNewCards.renderItems();

const popupNewPlace = new PopupWithForm(popupAddSelector, (formValues) => {
  const item = { name: formValues.place, link: formValues.link };
  const cardElement = createNewCard(item, selectorTemplate);
  addNewCards.addItem(cardElement); // Замените addNewItem на addItem
  popupNewPlace.close();
});
popupNewPlace.setEventListeners();

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_invalid',
  inputErrorClass: 'popup__input-container_invalid',
  inputContainerSelector: '.popup__input-container',
  errorClass: 'popup__error-message'
};

const popupNewPlaceValidator = new FormValidator(validationConfig, formCardDataElement);
popupNewPlaceValidator.enableValidation();

popupAddOpenBtn.addEventListener('click', () => {
  popupNewPlaceValidator.resetValidation();
  popupNewPlaceValidator._toggleButton();
  popupNewPlace.open();
});

const formNameDataValidator = new FormValidator(validationConfig, formNameDataElement);
formNameDataValidator.enableValidation();

const formCardDataValidator = new FormValidator(validationConfig, formCardDataElement);
formCardDataValidator.enableValidation();

const popupAddForm = new PopupWithForm(popupNameSelector, (evt) => {
  evt.preventDefault();
  const formValues = popupAddForm.getFormValues();
  userInfo.setUserInfo({ userName: formValues.name, userInfo: formValues.info });
  popupAddForm.close();
});
popupAddForm.setEventListeners();

popupAddForm.setSubmitHandler((formValues) => {
  userInfo.setUserInfo({ userName: formValues.name, userInfo: formValues.info });
  const profileNameElement = document.querySelector('.profile__name');
  const profileInfoElement = document.querySelector('.profile__data');
  profileNameElement.textContent = formValues.name;
  profileInfoElement.textContent = formValues.info;
  popupAddForm.close();
});

popupNameOpenBtn.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  const profileForm = popupAddForm.getFormElement();
  profileForm.elements.name.value = userInfoData.name;
  profileForm.elements.info.value = userInfoData.info;
  formNameDataValidator.resetValidation();
  popupAddForm.open();
});
