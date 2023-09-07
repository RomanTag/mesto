export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-btn');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // устанавливаю слушатели событий
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    // Добавляю слушатель события для клика на оверлее
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }

  // открываю попапы, добавляя класс `popup_opened`
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // закрываю попапы, удаляя класс `popup_opened`
  close() {
    this._popup.classList.remove('popup_opened');

    // устанавливаю слушатель события `keydown`, чтобы закрыть окно по нажатию клавиши "Escape"
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // обрабатываю нажатие клавиши Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }
}
