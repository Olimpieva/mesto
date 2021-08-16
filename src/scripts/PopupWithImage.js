
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._fullImage = this._popup.querySelector('.popup-image__image');
        this._fullImageTitle = this._popup.querySelector('.popup-image__title');
    }

    open({ name, link }) {
        this._fullImage.src = link;
        this._fullImage.alt = name;
        this._fullImageTitle.textContent = name;
        super.open()
    }
}