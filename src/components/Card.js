export default class Card {
  constructor({ cardData, selectorTemplate, userId, handleCardClick, handleLikeButton, handleRemoveButton }) {
    // Инициализирую данные карточки
    this._cardNameData = cardData.name;
    this._cardLinkData = cardData.link;
    this._likes = cardData.likes || [];
    this._cardId = cardData._id;
    this._selectorTemplate = selectorTemplate;

    // определяю, принадлежит ли карточка текущему пользователю (this._isUserCard)
    this._UserId = userId,
      this._isUserCard = userId === (cardData.owner ? cardData.owner._id : '');

    // Установливаю обработчики
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
    this._handleRemoveButton = handleRemoveButton;

    // проверяю, поставил ли текущий пользователь лайк на карточке (this.isLiked)
    this.isLiked = this._checkUserLikes();
  }

  // Полученаю HTML-шаблон карточки и клонированирую его для создания новой карточки
  _getTemplate() {
    return document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.card__list')
      .cloneNode(true);
  }

  // Генерирую карточки на основе данных и шаблона
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardTitleElement = this._cardElement.querySelector('.card__title');
    this._cardTitleElement.textContent = this._cardNameData;
    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._cardImageElement.src = this._cardLinkData;
    this._cardImageElement.alt = `${this._cardNameData}. Фотография`;
    this._cardDelButton = this._cardElement.querySelector('.card__delete-btn');
    this._likeButtonElement = this._cardElement.querySelector('.card__like-btn');
    this._likesCounter = this._cardElement.querySelector('.card__likes-counter');
    this._likesCounter.textContent = this._likes.length;

    this._setEventListeners();
    this._toggleLikesCounter();

    return this._cardElement;
  }

  //  устанавливаю слушатели событий в сгенерированной карточке
  _setEventListeners() {

    // слушатель картинки для открытия попапа
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._cardNameData, this._cardLinkData);
    });

    // слушатель кнопки лайк/дизлайк (сердечко)
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeButton();
    });

    // слушатель кнопки попапа для удаления карточки
    if (!this._isUserCard) {
      this._cardDelButton.remove();
      this._cardDelButton = null;
    } else {
      this._cardElement.querySelector('.card__delete-btn').addEventListener('click', (evt) => {
        this._handleRemoveButton(evt);
      });
    }
  }

  // счетчик лайков
  _toggleLikesCounter() {
    if (this._checkUserLikes()) {
      this.setLike();
    } else {
      this.unsetLike();
    };
  }

  // Устанавливаю лайк на карточке
  setLike() {
    this._likeButtonElement.classList.add('card__like-btn_active');
    this.isLiked = true;
  }

  // Удаляю лайка с карточки
  unsetLike() {
    this._likeButtonElement.classList.remove('card__like-btn_active');
    this.isLiked = false;
  }

  // Проверяю, поставил ли текущий пользователь лайк на карточке
  _checkUserLikes() {
    return this._likes.some(item => item._id === this._UserId);
  }

  // Обновливаю счетчик лайков карточки
  updatelikesCounter(data) {
    this._likesCounter.textContent = data.length;
  }

  // Возвращаю _id карточки
  getCardId() {
    return this._cardId;
  }
}
