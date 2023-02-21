export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponseStatus = () => (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  getInfoMe = () =>
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponseStatus());

  editUserProfile = (info) => fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: info.name,
        about: info.job,
      }),
    }).then(this._checkResponseStatus());

  getInitialCards = () => fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponseStatus());

  addNewCard = (data) => fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponseStatus());

  deleteCard = (id) => fetch(`${this._baseUrl}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponseStatus());

  likeSetting = (id) => fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._checkResponseStatus());

  likeRemoving = (id) => fetch(`${this._baseUrl}/cards/${id}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponseStatus());

  changeUserAvatar = (data) => fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponseStatus());
}
