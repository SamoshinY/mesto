export default class UserInfo {
  constructor(profileNameSelector, profileInfoSelector, profileAvatarSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._info = document.querySelector(profileInfoSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo = () => {
    return { name: this._name.textContent, about: this._info.textContent };
  };

  setUserInfo(newInfo) {
    if(newInfo.name) {this._name.textContent = newInfo.name};
    if(newInfo.about) {this._info.textContent = newInfo.about};
    if(newInfo.avatar) {this._avatar.src = newInfo.avatar};
    if(newInfo._id) {this.id = newInfo._id};
  }
}
