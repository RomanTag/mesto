const openPopupBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const popupText = document.querySelector('.popup__text');
const descriptionInput = document.querySelector('#description');
const jobInput = document.querySelector('.popup__save-btn');
const nameInput = document.querySelector('#name');
// const saveButtonDisabled = document.querySelector('.popup__save-btn_disabled');

// открыть и закрыть попап

function togglePopup() {
  popup.classList.toggle('popup__opened');
}

openPopupBtn.addEventListener('click', togglePopup);
popupCloseBtn.addEventListener('click', togglePopup);


if (popupText.textContent.length === 0) {
  saveButtonDisabled.setAttribute('disabled', true);
  saveButtonDisabled.classList.add('.popup__save-btn_disabled');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
