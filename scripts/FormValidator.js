class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputContainerSelector = config.inputContainerSelector
    this._errorClass = config.errorClass;
    this._form = form;
    this._button = form.querySelector(this._submitButtonSelector);
    this._inputList = form.querySelectorAll(this._inputSelector);
  }

  _showInputError(errorTextElement, input) {
    input.classList.add(this._inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
  }
  _hideInputError(errorTextElement, input) {
    input.classList.remove(this._inputErrorClass);
    errorTextElement.textContent = '';
  }

  _enableBtn() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.disabled = false;
  }

  _disableBtn() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.disabled = true;
  }

  _checkInputValidity(input) {
    const errorTextElement = this._form.querySelector(`${this._inputContainerSelector} #error-${input.id}`);
    if (input.validity.valid) {
      this._hideInputError(errorTextElement, input);
    } else {
      this._showInputError(errorTextElement, input);
    }
  }

  resetValidation() {
    this._inputList.forEach(input => {
      const errorTextElement = this._form.querySelector(`${this._inputContainerSelector} #error-${input.id}`);
      this._hideInputError(errorTextElement, input);
    });
    this._disableBtn();
  }

  _toggleButton() {
    if (this._hasInvalidInput()) {
      this._disableBtn();
    } else {
      this._enableBtn();
    }
  }

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButton();
      });
    });
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some(item => !item.validity.valid);
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator }
