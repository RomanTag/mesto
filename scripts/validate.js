
//навешиваю слушатель на все формы в документе и снимаею стандартные действия

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector))
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(form, rest)
  });
};

//навешиваю слушатель на все инпуты с проверкой полей и активацией кнопки

const setEventListeners = (formToValidate, { inputSelector, submitButtonSelector, ...rest }, handleEditFormSubmit) => {
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector))
  const formBtn = formToValidate.querySelector(submitButtonSelector)
  disableBtn(formBtn, rest)
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      if (hasInvalidinput(formInputs)) {
        disableBtn(formBtn, rest)
      } else {
        enableBtn(formBtn, rest)
      }
    });
  });
}


//проверяет инпут на валидность при наборе символов и выводит предупрждающие сообщения

const checkInputValidity = (input, { inputErrorClass, inputContainerSelector }) => {
  const currentInputErrorContainer = document.querySelector(`#error-${input.id}`);

  if (input.checkValidity()) {
    currentInputErrorContainer.textContent = '';
    const containerEl = currentInputErrorContainer.closest(inputContainerSelector);
    containerEl.classList.remove(inputErrorClass);
  } else {
    currentInputErrorContainer.textContent = input.validationMessage
    const containerEl = currentInputErrorContainer.closest(inputContainerSelector);
    containerEl.classList.add(inputErrorClass);
  }
}


// обхожу массив полей и задаю вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?»

const hasInvalidinput = (formInputs) => {
  return formInputs.some(item => !item.validity.valid);
}

//блокирует кнопку, если хотя бы одно поле невалидно

const enableBtn = (button, { inactiveButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled', true)
}

const disableBtn = (button, { inactiveButtonClass }) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true)

}

export default enableValidation;

export { disableBtn };

