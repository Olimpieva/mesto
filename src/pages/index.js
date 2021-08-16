
import '../pages/index.css';

import { initialCards } from '../scripts/initial-cards.js';
import Card from '../scripts/Card.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import FormValidator from '../scripts/FormValidator.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import {
    formConfig,
    profileForm,
    cardForm,
    profilePopupOpenButton,
    cardPopupOpenButton,
    cardPopupSelector,
    profilePopupSelector,
    fullImagePopupSelector,
    cardsContainerSelector,
    cardTemplateSelector
} from '../constants/constants.js';

const cardValidation = new FormValidator(formConfig, cardForm)
const profileValidation = new FormValidator(formConfig, profileForm)

profileValidation.enableValidation();
cardValidation.enableValidation();

const profileInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    captionSelector: '.profile__info-caption',
})

const profilePopup = new PopupWithForm(profilePopupSelector, (profileData) => {
    profileInfo.userInfo = profileData;
}, profileValidation);
profilePopup.setEventListeners();

profilePopupOpenButton.addEventListener('click', () => {
    profileForm.elements.name.value = profileInfo.userInfo.name;
    profileForm.elements.caption.value = profileInfo.userInfo.caption;

    profilePopup.open();
})

const cardPopup = new PopupWithForm(cardPopupSelector, (cardData) => {
    const card = createCard(cardData)
    rendererCards.addItem(card)
}, cardValidation);
cardPopup.setEventListeners();

cardPopupOpenButton.addEventListener('click', () => cardPopup.open());

const fullImagePopup = new PopupWithImage(fullImagePopupSelector);
fullImagePopup.setEventListeners();

function createCard(card) {
    const cardElement = new Card(cardTemplateSelector, card, {
        handlerCardClick: (data) => {
            fullImagePopup.open(data);
        }
    });
    return cardElement.generateCard();
}

const rendererCards = new Section({
    items: initialCards, renderer: (item) => {
        const card = createCard(item);
        rendererCards.addItem(card);
    }
}, cardsContainerSelector)

rendererCards.renderItems();