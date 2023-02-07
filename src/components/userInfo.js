export class UserInfo {
  constructor(profileNameSelector, profileInfoSelector, profileAvatarSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._info = document.querySelector(profileInfoSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo = () => {
    return { name: this._name.textContent, about: this._info.textContent };
  };

  setUserInfo(newInfo) {
    this._name.textContent = newInfo.name;
    this._info.textContent = newInfo.about;
  }

  setAvatar(newAvatar) {
    this._avatar.src = newAvatar.avatar;
  }
}
