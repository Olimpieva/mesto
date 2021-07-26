
import { initialCards } from './initial-cards.js';
import Card from './Card.js';
import { createPopup } from './createPopup.js';
import FormValidator from './FormValidator.js';


const cardPopupConfig = {
    popupSelector: '.popup-card',
    popupOpenedClass: 'popup_is-opened',
    openButtonSelector: '.profile__button_action_add',
    closeButtonSelector: '.popup__button_action_close',
    onOpen: onCardPopupOpen,
}

const profilePopupConfig = {
    popupSelector: '.popup-profile',
    popupOpenedClass: 'popup_is-opened',
    openButtonSelector: '.profile__button_action_edit',
    closeButtonSelector: '.popup__button_action_close',
    onOpen: onProfilePopupOpen,
}

const imagePopupConfig = {
    popupSelector: '.popup-image',
    popupOpenedClass: 'popup_is-opened',
    closeButtonSelector: '.popup__button_action_close',
}

const { closePopup: closeCardPopup } = createPopup(cardPopupConfig);
const { closePopup: closeProfilePopup } = createPopup(profilePopupConfig);
const { openPopup: openImagePopup } = createPopup(imagePopupConfig);

const cardFormConfig = {
    formSelector: '.popup__form-card',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button_action_save',
    inputErrorClass: 'popup__input_invalid',
    inputErrorMessageClass: 'popup__input-error_active',
}

const profileFormConfig = {
    formSelector: '.popup__form-profile',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_invalid',
    inputErrorMessageClass: 'popup__input-error_active',
}

const profileForm = document.querySelector('.popup__form-profile');
const userNameInput = profileForm.querySelector('.popup__input_type_name');
const userCaptionInput = profileForm.querySelector('.popup__input_type_caption');
const userName = document.querySelector('.profile__info-name');
const userCaption = document.querySelector('.profile__info-caption');

const cardForm = document.querySelector('.popup__form-card');
const cardCaptionInput = cardForm.querySelector('.popup__input_type_caption');
const cardLinkInput = cardForm.querySelector('.popup__input_type_link');

const cardValidation = new FormValidator(cardFormConfig, cardForm)
const profileValidation = new FormValidator(profileFormConfig, profileForm)

const cards = document.querySelector('.cards');

function onProfilePopupOpen() {
    profileValidation.resetForm()
    profileValidation.enableValidation()
    userNameInput.value = userName.textContent;
    userCaptionInput.value = userCaption.textContent;
}

function onCardPopupOpen() {
    cardValidation.resetForm()
    cardValidation.enableValidation()
}

function setProfileInfo() {
    userName.textContent = userNameInput.value;
    userCaption.textContent = userCaptionInput.value;
    closeProfilePopup();
}

profileForm.addEventListener('submit', (event) => {
    event.preventDefault()
    setProfileInfo();
});

function setCardInfo() {
    const newCard = {
        name: cardCaptionInput.value,
        link: cardLinkInput.value,
    }
    createCard(newCard)
    closeCardPopup();
}

cardForm.addEventListener('submit', (event) => {
    event.preventDefault()
    setCardInfo();
});

function createFullImage({ name, link }) {
    createPopup(imagePopupConfig);

    const fullImage = document.querySelector('.popup-image__image');
    const fullImageTitle = document.querySelector('.popup-image__title');

    fullImage.src = link;
    fullImageTitle.textContent = name;
    fullImage.alt = name;

    openImagePopup();
}

function renderCard(card) {
    cards.prepend(card);
}

function createCard(card) {
    const cardElement = new Card('#card-template', card, { onImageClick: createFullImage });
    renderCard(cardElement.generateCard());
}

initialCards.forEach((card) => createCard(card));