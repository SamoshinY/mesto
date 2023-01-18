export class UserInfo {
  constructor(profileNameSelector, profileInfoSelector) {
    this._name = document.querySelector(profileNameSelector);
    this._info = document.querySelector(profileInfoSelector);
  }

  getUserInfo = () => {
    return { name: this._name.textContent, info: this._info.textContent };
  };

  setUserInfo(newInfo) {
    this._name.textContent = newInfo.name;
    this._info.textContent = newInfo.job;
  }
}
