export default class Card {
  constructor({ cardData, selectorTemplate, userId, handleCardClick, handleLikeButton, handleRemoveButton }) {
    // инициализирую данные карточки
    this._cardNameData = cardData.name;
    this._cardLinkData = cardData.link;
    this._likes = cardData.likes || [];
    this._cardId = cardData._id;
    this._selectorTemplate = selectorTemplate;

    // определяю, принадлежит ли карточка текущему пользователю (this._isUserCard)
    this._userId = userId,
      this._isUserCard = userId === (cardData.owner ? cardData.owner._id : '');

    // установливаю обработчики
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
    this._handleRemoveButton = handleRemoveButton;

    // проверяю, поставил ли текущий пользователь лайк на карточке (this._isLiked)
    this._isLiked = this._checkUserLikes();
  }

  // полученаю HTML-шаблон карточки и клонированирую его для создания новой карточки
  _getTemplate() {
    return document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.card__list')
      .cloneNode(true);
  }

  // проверяю, поставил ли текущий пользователь лайк на карточке
  _checkUserLikes() {
    return this._likes.some(item => item._id === this._userId);
  }

  // устанавливаю слушатели событий в сгенерированной карточке
  _setEventListeners() {
    this._cardImageElement.addEventListener('click', () => this._handleCardClick(this._cardNameData, this._cardLinkData));
    this._likeButtonElement.addEventListener('click', () => this._handleLikeButton(this));

    if (this._isUserCard) {
      this._cardDelButton.addEventListener('click', (evt) => this._handleRemoveButton(evt, this));
    } else {
      this._cardDelButton.remove();
      this._cardDelButton = null;
    }
  }

  // генерирую карточки на основе данных и шаблона
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

    return this._cardElement;
  }

  // устанавливаю обработчик клика по карточке
  setCardClickHandler(handler) {
    this._handleCardClick = handler;
  }

  // устанавливаю обработчик кнопки "Лайк"
  setLikeButtonHandler(handler) {
    this._handleLikeButton = handler;
  }

  // устанавливаю обработчик кнопки удаления карточки
  setRemoveButtonHandler(handler) {
    this._handleRemoveButton = handler;
  }

  // устанавливаю лайк на карточке
  setLike() {
    this._likeButtonElement.classList.add('card__like-btn_active');
    this._isLiked = true;
  }

  // удаляю лайка с карточки
  unsetLike() {
    this._likeButtonElement.classList.remove('card__like-btn_active');
    this._isLiked = false;
  }

  // обновливаю счетчик лайков карточки
  updatelikesCounter(data) {
    this._likesCounter.textContent = data.length;
  }

  // возвращаю _id карточки
  getCardId() {
    return this._cardId;
  }

  // удаляю HTML-элемент карточки из DOM
  remove() {
    this._cardElement.remove();
  }

  // возвращаю значение нажатия лайка
  isLiked() {
    return this._isLiked;
  }

  // счетчик лайков
  _toggleLikesCounter() {
    if (this._checkUserLikes()) {
      this.setLike();
    } else {
      this.unsetLike();
    };
  }
}
