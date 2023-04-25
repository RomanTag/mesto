
// popups
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__input-container');
const popupCloseBtn = popup.querySelector('.popup__close-btn');


//popup 1 (edit profile)

// const popupEdit = document.querySelector('.popup__edit');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');


//popup 2 (edit add elements)

const popupAdd = document.querySelector('.popup__add');
const popupAddCloseBtn = popupAdd.querySelector('.popup__close-btn');
const popupAddOpenBtn = document.querySelector('.profile__add-btn');


// profile

const popupOpenPopupBtn = document.querySelector('.profile__edit-btn');
const nameInputprofile = document.querySelector('.profile__name');
const jobInfoProfile = document.querySelector('.profile__data');


// полигон

function createCards (nameValue, linkValue) {
  const element = document.createElement('ul');
  element.classList.add('element');

  const artistElement = document.createElement('h4');
  artistElement.classList.add('song__artist');
  artistElement.textContent = artistvalue;

}




//полигон


// открытие/закрытие попапа

function openPopup(popup) {
  popup.classList.add('popup_opened');
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


function handleFormSubmit (evt) {
    evt.preventDefault();
    nameInputprofile.textContent = nameInput.value;
    jobInfoProfile.textContent = jobInput.value;
    closePopup(popup);
    closePopup(popupAdd);
}


popupOpenPopupBtn.addEventListener('click', () => {
  openPopup(popup);
  nameInput.value = nameInputprofile.textContent;
  jobInput.value = jobInfoProfile.textContent;
});

popupCloseBtn.addEventListener('click', () => closePopup(popup));

formElement.addEventListener('submit', handleFormSubmit);

popupAddOpenBtn.addEventListener('click', () => openPopup(popupAdd));
popupAddCloseBtn.addEventListener('click', () => closePopup(popupAdd));

console.log();
