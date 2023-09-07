import authConfig from '../utils/constants';

export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  // проверяю ответа на запрос
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получаю информацию о текущем пользователе
  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  // Получаю начальные карточки
  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  // Получаю информацию о пользователе и начальные карточки
  getDataFromServer() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // Обновляю информацию о пользователе
  editProfileInfo(body) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(response => {
        console.log("Обновленные данные пользователя:", response);
        return response;
      });
  }

  // Добавляю новую карточку
  addNewCards(body) {
    console.log("Отправка запроса на создание новой карточки с данными:", JSON.stringify(body));

    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then(this._checkResponse)
      .then(response => {
        console.log("Ответ от сервера:", response);
        return response;
      })
      .catch(error => {
        console.error("Ошибка:", error);
        throw error;
      });
  }

  // Обновляю аватар пользователя
  updateAvatar(newAvatar) {
    console.log("Тело запроса для обновления аватара:", JSON.stringify(newAvatar));
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newAvatar),
    })
      .then(this._checkResponse);
  }

  // Удаляю карточку
  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  // Добавляю лайк карточке
  addCardLike(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  // Удаляю лайк с карточки
  deleteCardLike(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // Удаляю карточку
  removeCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
}
