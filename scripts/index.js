
// popups

const formElement = document.querySelector('.popup__input-container');
const popupCloseBtn = document.querySelector('.popup__close-btn');

//popup 1 (edit profile)

const popup = document.querySelector('.popup');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');


//popup 2 (edit add elements)

const popupElements = document.querySelector('.popup__add-elements');
const openPopupAddBtn = document.querySelector('.profile__add-btn');

// profile

const openPopupBtn = document.querySelector('.profile__edit-btn');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');


// открытие/закрытие попапа

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameInputprofile.textContent;
  jobInput.value = jobInfoProfile.textContent;
  console.log(popup_opened);
}


function closePoup() {
  popup.classList.remove('popup_opened');
  // popupSave.classList.add('popup_opened');
}

function openPopupAdd() {
  popupElements.classList.add('popup_opened');

}


function closePoupAdd() {
  popupElements.classList.remove('popup_opened');
  // popupAdd.classList.add('popup_opened');
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
openPopupAddBtn.addEventListener('click', openPopupAdd);
popupCloseBtn.addEventListener('click', closePoupAdd);

