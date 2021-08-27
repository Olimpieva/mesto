
export default class UserInfo {
    constructor({ nameSelector, captionSelector, avatarSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userCaption = document.querySelector(captionSelector);
        this._userAvatar = document.querySelector(avatarSelector)
    }

    get userInfo() {
        const name = this._userName.textContent;
        const about = this._userCaption.textContent;
        const avatar = this._userAvatar.src;
        return { name, about, avatar }
    }

    set userInfo({ name, about, avatar }) {
        if (name) {
            this._userName.textContent = name;
        }
        if (about) {
            this._userCaption.textContent = about;
        }
        if (avatar) {
            this._userAvatar.src = avatar;
        }
    }
}