export class UserInfo {
  constructor(profileName, profileJob) {
    this._name = profileName;
    this._job = profileJob;
  }
  getUserInfo = () => {
    this._userData = { name: this._name.textContent, job: this._job.textContent };
    return this._userData
  }
  setUserInfo(nameInputElement, jobInputElement) {
    this._name.textContent = nameInputElement.value;
    this._job.textContent = jobInputElement.value;
  }
}
