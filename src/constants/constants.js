
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

export const profileInfoConfig = {
    nameSelector: '.profile__info-name',
    captionSelector: '.profile__info-caption',
    avatarSelector: '.profile__avatar',
}

export const cardPopupSelector = '.popup-card';
export const profilePopupSelector = '.popup-profile';
export const fullImagePopupSelector = '.popup-image';
export const confirmationPopupSelector = '.popup-confirmation';
export const avatarPopupSelector = '.popup-avatar'

export const cardsContainerSelector = '.cards';
export const cardTemplateSelector = '#card-template';