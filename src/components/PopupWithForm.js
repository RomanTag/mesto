import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButtonElement = this._popup.querySelector('.popup__btn');
    this._handlerSubmitForm = handlerSubmitForm;
  }

  // Переопределяю метод родительского класса `setEventListeners()`
  // Устанавливаю слушатели событий для кнопки закрытия и формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      // При сабмите формы вызываю обработчик, передавая ему значения полей формы
      this._handlerSubmitForm(this._getInputValues());
    });
  }

  // устанавливаю значения полей формы из переданных данных
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // изменяею текст кнопки отправки формы в зависимости от статуса загрузки
  renderLoading(isLoading) {
    if (isLoading === true) {
      this._submitButtonElement.textContent = 'Сохранение...';
    } else {
      this._submitButtonElement.textContent = 'Сохранить';
    }
  }

  // собираю значения всех полей формы в объект и возвращаю его
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  // Переопределяю метод родительского класса `close()`
  // Закрываю всплывающее окно и сбрасываю значения полей формы
  close() {
    super.close();
    this._form.reset();
  }
}
