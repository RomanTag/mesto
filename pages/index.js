const openPopupBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const jobInput = document.querySelector('#description');
const nameInput = document.querySelector('#name');
const formElement = document.querySelector('.popup__input-container');
const saveButton = document.querySelector('.popup__save-btn');
// const saveButtonDisabled = document.querySelector('.popup__save-btn_disabled');

// открытие/закрытие попапа

function togglePopup() {
  popup.classList.toggle('popup__opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    const jobInputValue = jobInput.value;
    const nameInputValue = nameInput.value;

    togglePopup();
}

function handlePopupClose() {
  jobInput.value = '';
  nameInput.value = '';
  togglePopup();
}
openPopupBtn.addEventListener('click', togglePopup);
popupCloseBtn.addEventListener('click', handlePopupClose);
saveButton.addEventListener('click', handleFormSubmit)
formElement.addEventListener('submit', handleFormSubmit);

