import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__place-title');
  }

  // открываю попап с изображением и устанавливаю переданные данные карточки
  open(cardData) {
    this._popupImage.src = cardData.link;
    this._popupImage.alt = cardData.name;
    this._popupCaption.textContent = cardData.name;

    super.open();
  }
}
