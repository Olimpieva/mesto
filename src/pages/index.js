
import '../pages/index.css';

import { initialCards } from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
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
} from '../utils/constants.js';

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