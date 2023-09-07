
import './index.css';

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import authConfig from "../utils/authConfig.js"
import {
  cardListSelector,
  selectorTemplate,
  formCardDataElement,
  nameInputProfile,
  jobInfoProfile,
  popupPlaceSelector,
  popupAddSelector,
  popupNameSelector,
  validationConfig,
  popupDeleteSelector,
  avatarSelector,
  popupAvatarSelector,
  profileSelector,
  profileEditButtonSelector,
  avatarEditButtonSelector,
  cardAddButtonSelector
} from "../utils/constants.js";

// constants

const popupAvatarFormElement = document.querySelector(popupAvatarSelector);
const avatarEditButtonElement = document.querySelector(avatarEditButtonSelector);
const profileElement = document.querySelector(profileSelector);
const profileEditButtonElement = profileElement.querySelector(profileEditButtonSelector);
const popupProfileFormElement = document.querySelector(popupNameSelector);
const cardAddButtonElement = document.querySelector(cardAddButtonSelector);

// Создаю экземпляр класса Api
const api = new Api(authConfig);

// Загружаю данные с сервера
api.getDataFromServer().then((responses) => {
  const [initialCards, userData] = responses;
  userInfo.setUserInfo({ userName: userData.name, userInfo: userData.about, userAvatar: userData.avatar, userId: userData._id });
  renderCards.renderItems(initialCards);
}).catch((err) => {
  console.error(err);
});

// Создаю экземпляр класса Section для управления карточками
const renderCards = new Section(
  cardListSelector,
  {
    renderer: (cardData) => {
      const newCard = new Card({
        cardData: cardData,
        selectorTemplate: selectorTemplate,
        userId: userInfo.getUserId(),
        handleCardClick: (name, link) => {
          popupWithImageCard.open(cardData);
        },
        handleLikeButton: () => {
          if (newCard.isLiked) {
            api.deleteCardLike(newCard.getCardId()).then((cardData) => {
              newCard.unsetLike();
              newCard.updatelikesCounter(cardData.likes);
            }).catch((err) => {
              console.error(err);
            });
          } else {
            api.addCardLike(newCard.getCardId()).then((cardData) => {
              newCard.setLike();
              newCard.updatelikesCounter(cardData.likes);
            }).catch((err) => {
              console.error(err);
            });
          }
        },
        handleRemoveButton: (evt) => {
          const cardElement = evt.target.closest('.card__list');
          const cardId = newCard.getCardId();
          deleteConfirmationPopup.open();
          deleteConfirmationPopup.updateSubmitHandler(() => {
            api.removeCard(cardId).then(() => {
              cardElement.remove();
              deleteConfirmationPopup.close();
            }).catch((err) => {
              console.error(err);
            });
          });
        }
      });
      return newCard.generateCard();
    }
  });


// Создаю экземпляр класса UserInfo для управления данными пользователя
const userInfo = new UserInfo({
  nameSelector: nameInputProfile,
  infoSelector: jobInfoProfile,
  avatarSelector: avatarSelector
});

// Создаю экземпляр класса PopupWithForm для редактирования аватара
const popupUpdateAvatar = new PopupWithForm(popupAvatarSelector, (formData) => {
  popupUpdateAvatar.renderLoading(true);
  api.updateAvatar({ avatar: formData.link }).then((data) => {
    userInfo.setUserAvatar({ newUserAvatar: data.avatar });
    popupUpdateAvatar.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupUpdateAvatar.renderLoading(false);
  });
});

popupUpdateAvatar.setEventListeners();

// Валидирую форму редактирования аватара
const avatarValidation = new FormValidator(validationConfig, popupAvatarFormElement);
avatarValidation.enableValidation();

// Слушаю кнопку редактирования аватара
avatarEditButtonElement.addEventListener('click', () => {
  avatarValidation.resetValidation();
  popupUpdateAvatar.open();
});

// Создаю экземпляр класса PopupWithForm для редактирования профиля
const popupWithProfileForm = new PopupWithForm(popupNameSelector, (formData) => {
  popupWithProfileForm.renderLoading(true);
  api.editProfileInfo({ name: formData.name, about: formData.info }).then((data) => {
    userInfo.changeUserInfo({ userName: data.name, userInfo: data.about });
    popupWithProfileForm.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupWithProfileForm.renderLoading(false);
  });
});

popupWithProfileForm.setEventListeners();

// Валидирую форму редактирования профиля
const formNameDataValidator = new FormValidator(validationConfig, popupProfileFormElement);
formNameDataValidator.enableValidation();

// Слушаю кнопку редактирования профиля
profileEditButtonElement.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupWithProfileForm.setInputValues(userData);
  formNameDataValidator.resetValidation();
  popupWithProfileForm.open();
});

// Создаю экземпляр класса PopupWithForm для добавления карточек
const popupWithCardForm = new PopupWithForm(popupAddSelector, (formData) => {
  if (typeof formData.name === 'string' && typeof formData.link === 'string' && formData.name.trim() !== '' && formData.link.trim() !== '') {
    popupWithCardForm.renderLoading(true);
    api.addNewCards(formData).then((newCardData) => {
      console.log("Успешно создана новая карточка:", newCardData);
      renderCards.addItem(newCardData);
      popupWithCardForm.close();
    }).catch((err) => {
      console.error("Ошибка при создании карточки:", err);
    }).finally(() => {
      popupWithCardForm.renderLoading(false);
    });
  } else {
    console.error('Данные имеют неправильный формат');
  }
});

popupWithCardForm.setEventListeners();

// Валидирую форму добавления карточки
const popupNewPlaceValidator = new FormValidator(validationConfig, formCardDataElement);
popupNewPlaceValidator.enableValidation();

// Слушаю кнопку добавления карточки
cardAddButtonElement.addEventListener('click', () => {
  popupNewPlaceValidator.resetValidation();
  popupWithCardForm.open();
});

// Создаю экземпляр класса PopupWithConfirmation для подтверждения удаления карточки
const deleteConfirmationPopup = new PopupWithConfirmation(popupDeleteSelector, () => { });
deleteConfirmationPopup.setEventListeners();

// Создаю экземпляр класса PopupWithImage для отображения увеличенных изображений карточек
const popupWithImageCard = new PopupWithImage(popupPlaceSelector);
popupWithImageCard.setEventListeners();
