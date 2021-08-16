

export default class UserInfo {
    constructor({ nameSelector, captionSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userCaption = document.querySelector(captionSelector);
    }

    get userInfo() {
        const name = this._userName.textContent;
        const caption = this._userCaption.textContent;
        return { name, caption }
    }

    set userInfo({ name, caption }) {
        this._userName.textContent = name;
        this._userCaption.textContent = caption;
    }
}