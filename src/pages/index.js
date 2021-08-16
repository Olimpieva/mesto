
import { initialCards } from '../scripts/initial-cards.js';
import Card from '../scripts/Card.js';
import Popup from '../scripts/Popup.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import FormValidator from '../scripts/FormValidator.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';


// const userInfoObj = {
//     nameSelector: '.profile__info-name',
//     captionSelector: '.profile__info-caption',
// }

// const testUserInfo = new UserInfo(userInfoObj)
// console.log(testUserInfo);
// console.log(testUserInfo.userInfo)

// testUserInfo.userInfo = { name: 'fff', caption: 'uuu' }

// const cards = document.querySelector('.cards');

// const fullImage = document.querySelector('.popup-image__image');
// const fullImageTitle = document.querySelector('.popup-image__title');



// const cardPopupConfig = {
//     popupSelector: '.popup-card',
//     popupOpenedClass: 'popup_is-opened',
//     openButtonSelector: '.profile__button_action_add',
//     closeButtonSelector: '.popup__button_action_close',
//     onOpen: onCardPopupOpen,
// }

// const profilePopupConfig = {
//     popupSelector: '.popup-profile',
//     popupOpenedClass: 'popup_is-opened',
//     openButtonSelector: '.profile__button_action_edit',
//     closeButtonSelector: '.popup__button_action_close',
//     onOpen: onProfilePopupOpen,
// }

// const imagePopupConfig = {
//     popupSelector: '.popup-image',
//     popupOpenedClass: 'popup_is-opened',
//     closeButtonSelector: '.popup__button_action_close',
// }



const profileForm = document.querySelector('.popup__form-profile');
const userNameInput = profileForm.querySelector('.popup__input_type_name');
const userCaptionInput = profileForm.querySelector('.popup__input_type_caption');
const userName = document.querySelector('.profile__info-name');
const userCaption = document.querySelector('.profile__info-caption');

const cardForm = document.querySelector('.popup__form-card');
const cardCaptionInput = cardForm.querySelector('.popup__input_type_caption');
const cardLinkInput = cardForm.querySelector('.popup__input_type_link');

const formConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_invalid',
    inputErrorMessageClass: 'popup__input-error_active',
}

const cardValidation = new FormValidator(formConfig, cardForm)
const profileValidation = new FormValidator(formConfig, profileForm)

profileValidation.enableValidation();
cardValidation.enableValidation();

const profileInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    captionSelector: '.profile__info-caption',
})

const profileButton = document.querySelector('.profile__button_action_edit');
const profilePopup = new PopupWithForm('.popup-profile', (profileData) => {
    profileInfo.userInfo = profileData;
}, profileValidation);
profilePopup.setEventListeners();

profileButton.addEventListener('click', () => {
    const profileForm = document.querySelector('.popup__form-profile');
    profileForm.elements.name.value = profileInfo.userInfo.name;
    profileForm.elements.caption.value = profileInfo.userInfo.caption;
    profilePopup.open();
})

const cardButton = document.querySelector('.profile__button_action_add');
const cardPopup = new PopupWithForm('.popup-card', (cardData) => {
    const card = createCard(cardData)
    rendererCards.addItem(card)
}, cardValidation);
cardPopup.setEventListeners();

cardButton.addEventListener('click', () => cardPopup.open());

const fullImagePopup = new PopupWithImage('.popup-image');
fullImagePopup.setEventListeners();

function createCard(card) {
    console.log('create card')
    const cardElement = new Card('#card-template', card, {
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
}, '.cards')

rendererCards.renderItems();

// function renderCards(cards) {
//     console.log('render cards')
//     console.log(cards)
//     const rendererCards = new Section({
//         items: cards, renderer: (item) => {
//             console.log(item)
//             const card = createCard(item);
//             rendererCards.addItem(card);
//         }
//     }, '.cards')
//     rendererCards.renderItems();
// }

// renderCards(initialCards)

// function onProfilePopupOpen() {
//     profileValidation.resetForm()
//     userNameInput.value = userName.textContent;
//     userCaptionInput.value = userCaption.textContent;
// }

// function onCardPopupOpen() {
//     cardValidation.resetForm()
// }



// function setProfileInfo() {
//     userName.textContent = userNameInput.value;
//     userCaption.textContent = userCaptionInput.value;
//     closeProfilePopup();
// }

// profileForm.addEventListener('submit', (event) => {
//     event.preventDefault()
//     setProfileInfo();
// });

// function setCardInfo() {
//     const newCard = {
//         name: cardCaptionInput.value,
//         link: cardLinkInput.value,
//     }
//     renderCards(newCard)
//     closeCardPopup();
// }

// cardForm.addEventListener('submit', (event) => {
//     event.preventDefault()
//     setCardInfo();
// });



// function renderCard(card) {
//     const cardItem = createCard(card);
//     cards.prepend(cardItem);
// }



// initialCards.forEach((card) => renderCard(card));