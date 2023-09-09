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

  // обновляю информацию о пользователе в интерфейсе
  setUserInfo({ userName, userInfo, userAvatar, userId }) {

    if (userName) this._nameElement.textContent = userName;
    if (userInfo) this._infoElement.textContent = userInfo;
    if (userAvatar) this._avatarElement.src = userAvatar;
    if (userId) this._userId = userId;
  }

  // установливаю новый аватар пользователя
  setUserAvatar({ newUserAvatar }) {
    this._avatarElement.src = newUserAvatar;
  }

  // получаю идентификатор пользователя
  getUserId() {
    if (!this._userId) {
      return null;
    }
    return this._userId;
  }
}
