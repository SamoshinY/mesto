export class UserInfo {
  constructor(profileName, profileInfo) {
    this._name = profileName;
    this._info = profileInfo;
  }
  getUserInfo = () => {
    this._userData = { name: this._name.textContent, info: this._info.textContent };
    return this._userData
  }
  setUserInfo(nameInputElement, infoInputElement) {
    this._name.textContent = nameInputElement.value;
    this._info.textContent = infoInputElement.value;
  }
}
