export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // получаю информацию о пользователе
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent
    };
  }

  // установливаю информацию о пользователе
  setUserInfo(userData) {
    const { userName, userInfo, userAvatar, userId } = userData;

    // Устанавливаю имя, информацию и аватар пользователя
    this._nameElement.textContent = userName;
    this._infoElement.textContent = userInfo;
    this._avatarElement.src = userAvatar;
    this._userId = userId;
  }

  // установливаю новый аватар пользователя
  setUserAvatar({ newUserAvatar }) {
    this._avatarElement.src = newUserAvatar;
  }

  // измененяю имя и информацию о пользователе
  changeUserInfo({ userName, userInfo }) {
    this._nameElement.textContent = userName;
    this._infoElement.textContent = userInfo;
    console.log(userName)
    console.log(userInfo)
  }


  // получаю идентификатор пользователя
  getUserId() {
    return this._userId;
  }
}
