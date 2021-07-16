
function hideInputErrorMessage(formElement, inputElement, inputErrorClass, inputErrorMessageClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(inputErrorMessageClass)
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
}

function showInputErrorMessage(form, input, inputErrorClass, inputErrorMessageClass, errorMessage) {
    const errorElement = form.querySelector(`#${input.id}-error`)
    errorElement.textContent = errorMessage;
    errorElement.classList.add(inputErrorMessageClass);
    input.classList.add(inputErrorClass);
}

function checkInputValidity(formElement, inputElement, inputErrorClass, inputErrorMessageClass) {
    const isInputValid = inputElement.validity.valid;

    if (!isInputValid) {
        const errorMessage = inputElement.validationMessage;
        showInputErrorMessage(formElement, inputElement, inputErrorClass, inputErrorMessageClass, errorMessage)
    } else {
        hideInputErrorMessage(formElement, inputElement, inputErrorClass, inputErrorMessageClass)
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, button) {
    button.disabled = hasInvalidInput(inputList);
}

function enableValidation({ formSelector, inputSelector, submitButtonSelector, inputErrorClass, inputErrorMessageClass, onSubmit }) {
    const formElement = document.querySelector(formSelector);
    const submitButton = formElement.querySelector(submitButtonSelector)
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    toggleButtonState(inputList, submitButton);

    inputList.forEach((inputElement) => inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, inputErrorClass, inputErrorMessageClass);
        toggleButtonState(inputList, submitButton);
    }))

    const resetForm = () => {
        formElement.reset();
        inputList.forEach((inputElement) => hideInputErrorMessage(formElement, inputElement, inputErrorClass, inputErrorMessageClass));
        submitButton.disabled = true;
    }

    return {
        resetForm
    }
}
