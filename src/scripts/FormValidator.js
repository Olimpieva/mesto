
export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._submitButton = this._formElement.querySelector(config.submitButtonSelector);
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._inputErrorMessageClass = config.inputErrorMessageClass;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    }

    _showInputErrorMessage = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)

        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._inputErrorMessageClass);
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideInputErrorMessage = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        errorElement.classList.remove(this._inputErrorMessageClass)
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity = (inputElement) => {
        const isInputValid = inputElement.validity.valid;

        if (!isInputValid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputErrorMessage(inputElement, errorMessage)
        } else {
            this._hideInputErrorMessage(inputElement)
        }
    }

    _hasInvalidInput = () => this._inputList.some((inputElement) => !inputElement.validity.valid);

    _toggleButtonState = () => {
        this._submitButton.disabled = this._hasInvalidInput();
    }

    enableValidation = () => {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        }))
    }

    resetForm = () => {
        console.log('Reset Form')
        this._inputList.forEach((inputElement) => this._hideInputErrorMessage(inputElement));
        this._formElement.reset();
        this._submitButton.disabled = true;
    }
}