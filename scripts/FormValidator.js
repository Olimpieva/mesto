
export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._submitButton = this._formElement.querySelector(config.submitButtonSelector);
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._inputErrorMessageClass = config.inputErrorMessageClass;
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

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => !inputElement.validity.valid);
    }

    _toggleButtonState = (inputList) => {
        this._submitButton.disabled = this._hasInvalidInput(inputList);
    }

    enableValidation = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

        this._toggleButtonState(inputList);

        inputList.forEach((inputElement) => inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(inputList);
        }))
    }

    resetForm = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

        inputList.forEach((inputElement) => this._hideInputErrorMessage(inputElement));

        this._formElement.reset();
        this._submitButton.disabled = true;
    }
}