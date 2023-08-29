export default class Card {
  constructor(cardData, selectorTemplate, handleCardClick) {
    this._cardData = cardData;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.card__list')
      .cloneNode(true);

    return cardElement;
  }

  _handleLike = () => {
    this._likeElement.classList.toggle('card__like-btn_active');
  };

  _handleDelete = () => {
    this._element.remove();
    this._imageElement = null;
    this._likeElement = null;
    this._trashElement = null;
    this._titleElement = null;
    this._element = null;
  };

  _handleCardImageOpen = () => {
    this._handleCardClick(this._cardData)
  }

  _setEventListener() {
    this._likeElement.addEventListener('click', this._handleLike);
    this._trashElement.addEventListener('click', this._handleDelete);
    this._imageElement.addEventListener('click', this._handleCardImageOpen);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.card__image');
    this._likeElement = this._element.querySelector('.card__like-btn');
    this._trashElement = this._element.querySelector('.card__delete-btn');
    this._titleElement = this._element.querySelector('.card__title');
    this._imageElement.src = this._cardData.link;
    this._imageElement.alt = this._cardData.name;
    this._titleElement.textContent = this._cardData.name;
    this._setEventListener();

    return this._element;
  }
}
