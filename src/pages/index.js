
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
  cardAddButtonSelector,
  profileNameSelector,
  profileInfoSelector,
} from "../utils/constants.js";

// константы для элементов на странице
const popupAvatarFormElement = document.querySelector(popupAvatarSelector);
const avatarEditButtonElement = document.querySelector(avatarEditButtonSelector);
const profileElement = document.querySelector(profileSelector);
const profileEditButtonElement = profileElement.querySelector(profileEditButtonSelector);
const popupProfileFormElement = document.querySelector(popupNameSelector);
const cardAddButtonElement = document.querySelector(cardAddButtonSelector);

// создаю экземпляр класса Api
const api = new Api(authConfig);

// создаю экземпляр класса UserInfo для управления данными пользователя
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  infoSelector: profileInfoSelector,
  avatarSelector: avatarSelector
});

// загружаю данные с сервера
api.getDataFromServer().then((responses) => {
  const [initialCards, userData] = responses;
  userInfo.setUserInfo({ userName: userData.name, userInfo: userData.about, userAvatar: userData.avatar, userId: userData._id });
  renderCards.renderItems(initialCards);
}).catch((err) => {
  console.error(err);
});


/* card */


// обрабатываю клик по карточке
function handleCardClick(name, link) {
  popupWithImageCard.open({ name, link });
}

// обрабатываю клик по кнопке "нравится"
function handleLikeButton(card) {
  if (card.isLiked()) {
    api.deleteCardLike(card.getCardId())
      .then((cardData) => {
        card.unsetLike();
        card.updatelikesCounter(cardData.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api.addCardLike(card.getCardId())
      .then((cardData) => {
        card.setLike();
        card.updatelikesCounter(cardData.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// обрабатываю клик по удаления карточки
function handleRemoveButton(evt, card) {
  const cardId = card.getCardId();
  deleteConfirmationPopup.open();
  deleteConfirmationPopup.updateSubmitHandler(() => {
    api.removeCard(cardId)
      .then(() => {
        card.remove();
        deleteConfirmationPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

// создаю и возвращаю HTML-код карточки
function createCard(cardData, userId, selectorTemplate) {
  const card = new Card({
    cardData,
    selectorTemplate,
    userId
  });

  card.setCardClickHandler(handleCardClick);
  card.setLikeButtonHandler(handleLikeButton);
  card.setRemoveButtonHandler(handleRemoveButton);

  return card.generateCard();
}

// инициализирую класс Section для отображения карточек
const renderCards = new Section(
  cardListSelector,
  {
    renderer: (cardData) => {
      const newCard = createCard(cardData, userInfo.getUserId(), selectorTemplate);
      return newCard;
    }
  }
);


/* popups */


/* avatar */


// создаю экземпляр класса PopupWithForm для редактирования аватара
const popupUpdateAvatar = new PopupWithForm(popupAvatarSelector, (formData) => {
  popupUpdateAvatar.renderLoading(true);
  api.updateAvatar({ avatar: formData.linkAvatar }).then((data) => {
    userInfo.setUserAvatar({ newUserAvatar: data.avatar });
    popupUpdateAvatar.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupUpdateAvatar.renderLoading(false);
  });
});

popupUpdateAvatar.setEventListeners();

// валидирую форму редактирования аватара
const avatarValidation = new FormValidator(validationConfig, popupAvatarFormElement);
avatarValidation.enableValidation();

// слушаю кнопку редактирования аватара
avatarEditButtonElement.addEventListener('click', () => {
  avatarValidation.resetValidation();
  popupUpdateAvatar.open();
});


/* profile */


// создаю экземпляр класса PopupWithForm для редактирования профиля
const popupWithProfileForm = new PopupWithForm(popupNameSelector, (formData) => {
  popupWithProfileForm.renderLoading(true);
  api.editProfileInfo({ name: formData.name, about: formData.info }).then((data) => {
    userInfo.setUserInfo({ userName: data.name, userInfo: data.about });
    popupWithProfileForm.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupWithProfileForm.renderLoading(false);
  });
});

popupWithProfileForm.setEventListeners();

// валидирую форму редактирования профиля
const formNameDataValidator = new FormValidator(validationConfig, popupProfileFormElement);
formNameDataValidator.enableValidation();

// слушаю кнопку редактирования профиля
profileEditButtonElement.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupWithProfileForm.setInputValues(userData);
  formNameDataValidator.resetValidation();
  popupWithProfileForm.open();
});


/* cards */


// создаю экземпляр класса PopupWithForm для добавления карточек
const popupWithCardForm = new PopupWithForm(popupAddSelector, (formData) => {
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
});

popupWithCardForm.setEventListeners();

// валидирую форму добавления карточки
const popupNewPlaceValidator = new FormValidator(validationConfig, formCardDataElement);
popupNewPlaceValidator.enableValidation();

// слушаю кнопку добавления карточки
cardAddButtonElement.addEventListener('click', () => {
  popupNewPlaceValidator.resetValidation();
  popupWithCardForm.open();
});


/* delete */


// создаю экземпляр класса PopupWithConfirmation для подтверждения удаления карточки
const deleteConfirmationPopup = new PopupWithConfirmation(popupDeleteSelector, () => { });
deleteConfirmationPopup.updateSubmitHandler(() => {
  api.deleteCard(cardId)
    .then(() => {
      deleteConfirmationPopup.close();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
});

deleteConfirmationPopup.setEventListeners();


/* fullscreen cards */


// создаю экземпляр класса PopupWithImage для отображения увеличенных изображений карточек
const popupWithImageCard = new PopupWithImage(popupPlaceSelector);
popupWithImageCard.setEventListeners();
