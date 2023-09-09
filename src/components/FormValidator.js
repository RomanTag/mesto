export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputContainerSelector = config.inputContainerSelector
    this._errorClass = config.errorClass;
    this._form = form;

    // получаю ссылку на кнопку отправки формы и список инпутов
    this._button = form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
  }

  // метод для отображения сообщения об ошибке для конкретного инпута
  _showInputError(errorTextElement, input) {
    input.classList.add(this._inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
  }

  // метод для скрытия сообщения об ошибке для конкретного инпута
  _hideInputError(errorTextElement, input) {
    input.classList.remove(this._inputErrorClass);
    errorTextElement.textContent = '';
  }

  // метод для включения состояния активной кнопки
  _enableBtn() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  }

  // метод для отключения состояния активной кнопки
  _disableBtn() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  // метод для проверки валидности конкретного инпута и отображения/скрытия сообщения об ошибке
  _checkInputValidity(input) {
    const errorTextElement = this._form.querySelector(`${this._inputContainerSelector} #error-${input.id}`);
    if (input.validity.valid) {
      this._hideInputError(errorTextElement, input);
    } else {
      this._showInputError(errorTextElement, input);
    }
  }

  // метод для сброса валидации формы
  resetValidation() {
    this._inputList.forEach(input => {
      const errorTextElement = this._form.querySelector(`${this._inputContainerSelector} #error-${input.id}`);
      this._hideInputError(errorTextElement, input);
    });
    this._disableBtn();
  }

  // метод для переключения состояния кнопки в зависимости от валидности всех инпутов
  _toggleButton() {
    if (this._hasInvalidInput()) {
      this._disableBtn();
    } else {
      this._enableBtn();
    }
  }

  // метод для установки слушателей событий на инпуты
  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  }

  // метод для проверки, есть ли хотя бы один невалидный инпут
  _hasInvalidInput() {
    return this._inputList.some(item => !item.validity.valid);
  }

  // метод для включения валидации формы и установки слушателей событий
  enableValidation() {
    this._setEventListeners();
  }
}
