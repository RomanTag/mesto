const openPopupBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const formElement = document.querySelector('.popup__input-container');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');

// открытие/закрытие попапа

function openPopup() {
  popup.classList.add('popup_active');
  nameInput.value = nameInputprofile.textContent;
  jobInput.value = jobInfoProfile.textContent;
}

function closePoup() {
  popup.classList.remove('popup_active');
}

// сохранить данные из input

function handleFormSubmit (evt) {
    evt.preventDefault();
    nameInputprofile.textContent = nameInput.value;
    jobInfoProfile.textContent = jobInput.value;
    closePoup();
}


openPopupBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePoup);
formElement.addEventListener('submit', handleFormSubmit);

