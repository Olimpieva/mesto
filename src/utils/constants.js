
export const apiOptions = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: 'e0a0481d-9fe7-4aea-8a7b-5b74aae0ea67',
        'Content-Type': 'application/json'
    }
}

export const formConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_invalid',
    inputErrorMessageClass: 'popup__input-error_active',
}

export const profileForm = document.querySelector('.popup__form-profile');
export const cardForm = document.querySelector('.popup__form-card');
export const avatarForm = document.querySelector('.popup__form-avatar');

export const profilePopupOpenButton = document.querySelector('.profile__button_action_edit');
export const cardPopupOpenButton = document.querySelector('.profile__button_action_add');
export const avatarPopupOpenButton = document.querySelector('.profile__avatar-overlay');

export const cardPopupSelector = '.popup-card';
export const profilePopupSelector = '.popup-profile';
export const fullImagePopupSelector = '.popup-image';
export const confirmationPopupSelector = '.popup-confirmation';
export const avatarPopupSelector = '.popup-avatar'

export const cardsContainerSelector = '.cards';
export const cardTemplateSelector = '#card-template';