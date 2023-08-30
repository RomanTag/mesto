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
  popupNameSelector,
  validationConfig
} from "../utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: nameInputProfile,
  infoSelector: jobInfoProfile
});

function createNewCard(cardData, selectorTemplate) {
  const card = new Card(cardData, selectorTemplate, () => {
    popupImage.open(cardData);
  });
  return card.generateCard();
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
  addNewCards.addItem(cardElement);
  popupNewPlace.close();
});
popupNewPlace.setEventListeners();

const popupNewPlaceValidator = new FormValidator(validationConfig, formCardDataElement);
popupNewPlaceValidator.enableValidation();

popupAddOpenBtn.addEventListener('click', () => {
  popupNewPlaceValidator.resetValidation();
  popupNewPlace.open();
});

const formNameDataValidator = new FormValidator(validationConfig, formNameDataElement);
formNameDataValidator.enableValidation();

const formCardDataValidator = new FormValidator(validationConfig, formCardDataElement);
formCardDataValidator.enableValidation();

const popupEditProfile = new PopupWithForm(popupNameSelector, (formValues) => {
  userInfo.setUserInfo({ userName: formValues.name, userInfo: formValues.info });
  popupEditProfile.close();
});

popupEditProfile.setEventListeners();

popupNameOpenBtn.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  const profileForm = popupEditProfile.getFormElement();
  profileForm.elements.name.value = userInfoData.name;
  profileForm.elements.info.value = userInfoData.info;
  formNameDataValidator.resetValidation();
  popupEditProfile.open();
});
