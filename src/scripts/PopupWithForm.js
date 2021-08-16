import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handlerFormSubmit, validator) {
        console.log('Create Popup with form')
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handlerFormSubmit = handlerFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));

        this._validator = validator;
        this._submitButton = this._popup.querySelector('popup__button_action_save');
    }

    _getInputValues() {
        this._inputValues = this._inputList.reduce((obj, inputElement) => {
            obj[inputElement.name] = inputElement.value;
            return obj
        }, {})
        return this._inputValues
    }

    setEventListeners() {

        console.log('Set event Popup with form')
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            const inputValues = this._getInputValues();
            this._handlerFormSubmit(inputValues);
            this.close();
        })
        super.setEventListeners();
    }

    close = () => {
        console.log('close Popup with form')
        this._validator.resetForm()
        super.close()
    }

}