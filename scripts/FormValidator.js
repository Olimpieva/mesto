
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

// function hideInputErrorMessage(formElement, inputElement, inputErrorClass, inputErrorMessageClass) {
//     const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//     errorElement.classList.remove(inputErrorMessageClass)
//     inputElement.classList.remove(inputErrorClass);
//     errorElement.textContent = '';
// }

// function showInputErrorMessage(form, input, inputErrorClass, inputErrorMessageClass, errorMessage) {
//     const errorElement = form.querySelector(`#${input.id}-error`)
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(inputErrorMessageClass);
//     input.classList.add(inputErrorClass);
// }

// function checkInputValidity(formElement, inputElement, inputErrorClass, inputErrorMessageClass) {
//     const isInputValid = inputElement.validity.valid;

//     if (!isInputValid) {
//         const errorMessage = inputElement.validationMessage;
//         showInputErrorMessage(formElement, inputElement, inputErrorClass, inputErrorMessageClass, errorMessage)
//     } else {
//         hideInputErrorMessage(formElement, inputElement, inputErrorClass, inputErrorMessageClass)
//     }
// }

// function hasInvalidInput(inputList) {
//     return inputList.some((inputElement) => !inputElement.validity.valid);
// }

// function toggleButtonState(inputList, button) {
//     button.disabled = hasInvalidInput(inputList);
// }

// function enableValidation({ formSelector, inputSelector, submitButtonSelector, inputErrorClass, inputErrorMessageClass, onSubmit }) {
//     const formElement = document.querySelector(formSelector);
//     const submitButton = formElement.querySelector(submitButtonSelector)
//     const inputList = Array.from(formElement.querySelectorAll(inputSelector));

//     toggleButtonState(inputList, submitButton);

//     inputList.forEach((inputElement) => inputElement.addEventListener('input', () => {
//         checkInputValidity(formElement, inputElement, inputErrorClass, inputErrorMessageClass);
//         toggleButtonState(inputList, submitButton);
//     }))

//     const resetForm = () => {
//         formElement.reset();
//         inputList.forEach((inputElement) => hideInputErrorMessage(formElement, inputElement, inputErrorClass, inputErrorMessageClass));
//         submitButton.disabled = true;
//     }

//     return {
//         resetForm
//     }
// }
