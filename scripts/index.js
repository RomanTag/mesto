
// popups
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__input-container');
const popupCloseBtn = document.querySelector('.popup__close-btn');

//popup 1 (edit profile)

const popupEdit = document.querySelector('.popup__edit');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');


//popup 2 (edit add elements)

const popupAdd = document.querySelector('.popup__add');
const openPopupAddBtn = document.querySelector('.profile__add-btn');


// profile

const openPopupBtn = document.querySelector('.profile__edit-btn');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');


// открытие/закрытие попапа

function openPopup() {
  popupEdit.classList.add('popup__edit_opened');
  nameInput.value = nameInputprofile.textContent;
  jobInput.value = jobInfoProfile.textContent;
  console.log(popupEdit);
}


function closePopup() {
  popupEdit.classList.remove('popup__edit_opened');
  // popupSave.classList.add('popup_opened');
  console.log(popupAdd);
}

// popup 2

function openPopupAdd() {
  popupAdd.classList.add('popup__add_opened');
  console.log(popupAdd);
}


function closePopupAdd() {
  popupAdd.classList.remove('popup__add_opened');
}

// сохранить данные из input

function handleFormSubmit (evt) {
    evt.preventDefault();
    nameInputprofile.textContent = nameInput.value;
    jobInfoProfile.textContent = jobInput.value;
    closePopup();
}


openPopupBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
openPopupAddBtn.addEventListener('click', openPopupAdd);
