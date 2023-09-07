import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  // установливаю обработчик события подтверждения
  updateSubmitHandler(action) {

    // Принимаю функцию-обработчик и сохраняю её в поле класса `_handleSubmit`
    this._handleSubmit = action;
  }

  // для установливаю слушателеи событий
  setEventListeners() {
    super.setEventListeners();
    const submitDeleteButton = this._popup.querySelector('#submitDelete');
    submitDeleteButton.addEventListener('click', () => {
      this._handleSubmit();
      this.close();
    });
  }
}
