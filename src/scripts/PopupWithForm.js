
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlerFormSubmit, validator) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handlerFormSubmit = handlerFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));

        this._validator = validator;
        this._submitButton = this._popup.querySelector('popup__button_action_save');
    }

    _getInputValues() {
        this._inputValues = this._inputList.reduce((objInputValues, inputElement) => {
            objInputValues[inputElement.name] = inputElement.value;
            return objInputValues
        }, {})
        return this._inputValues
    }

    setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            const inputValues = this._getInputValues();
            this._handlerFormSubmit(inputValues);
            this.close();
        })
        super.setEventListeners();
    }

    close = () => {
        this._validator.resetForm()
        super.close()
    }

}