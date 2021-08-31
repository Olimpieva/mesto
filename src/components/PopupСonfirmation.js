
import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor(popupSelector, handlerFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handlerFormSubmit = handlerFormSubmit;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handlerFormSubmit(this._transformData, this._transformElement);
        })
        super.setEventListeners();
    }

    open(transformData, transformElement) {
        super.open()
        this._transformData = transformData;
        this._transformElement = transformElement;
    }
}