
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_animated'); // class "popup_animated" was added to solve the problem with the popup flickering when rendering the page. I don't want to remove it, please.
        this._popup.classList.add('popup_is-opened');
        this._popup.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_is-opened');
        this._popup.classList.remove('popup_animated');
        this._popup.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose = (event) => {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__button_action_close').addEventListener('click', () => this.close());
    }

}

