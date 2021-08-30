
import '../pages/index.css';

import { initialCards } from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import PopupConfirmation from '../components/PopupСonfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import {
    apiOptions,
    formConfig,
    profileForm,
    cardForm,
    avatarForm,
    profilePopupOpenButton,
    cardPopupOpenButton,
    avatarPopupOpenButton,
    cardPopupSelector,
    profilePopupSelector,
    fullImagePopupSelector,
    confirmationPopupSelector,
    avatarPopupSelector,
    cardsContainerSelector,
    cardTemplateSelector
} from '../utils/constants.js';


// fetch('https://mesto.nomoreparties.co/v1/cohort-27/cards', {
//     headers: {
//         authorization: 'e0a0481d-9fe7-4aea-8a7b-5b74aae0ea67'
//     }
// })
//     .then(res => res.json())
//     .then((result) => {
//         console.log(result);
//     });

const api = new Api(apiOptions);

const cardList = new Section((item) => {
    const card = createCard(item);
    cardList.addItem(card);
}, cardsContainerSelector)

// api.getInitialCards()
//     .then(initialCards => {
//         cardList.renderItems(initialCards);
//     })
//     .catch(error => console.log(`Произошла ошибка: ${error}`));

const profileInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    captionSelector: '.profile__info-caption',
    avatarSelector: '.profile__avatar',
})

let userId;

api.getUserInfo()
    .then(userData => {
        profileInfo.userInfo = userData;
        userId = userData._id;
        api.getInitialCards()
            .then(initialCards => {
                cardList.renderItems(initialCards);
            })
            .catch(error => console.log(`Произошла ошибка: ${error}`));
    })
    .catch(error => console.log(`Произошла ошибка: ${error}`));



// Promise.all([api.getUserInfo(), api.getInitialCards()])
//     .then(([userData, initialCards]) => {
//         cardList.renderItems(initialCards);
//         userId = userData._id;
//         profileInfo.userInfo = userData;

//         console.log(userId)
//     })
//     .catch(error => console.log(`Произошла ошибка: ${error}`));

const cardValidation = new FormValidator(formConfig, cardForm);
const profileValidation = new FormValidator(formConfig, profileForm);
const avatarValidation = new FormValidator(formConfig, avatarForm)

profileValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();

const confirmationPopup = new PopupConfirmation(confirmationPopupSelector, (cardId, cardElement) => {
    api.removeCard(cardId);
    cardElement.remove();
})
confirmationPopup.setEventListeners()

const avatarPopup = new PopupWithForm(avatarPopupSelector, (avatarData) => {
    profileInfo.userInfo = avatarData;
    api.updateAvatar(avatarData.avatar)
}, avatarValidation);
avatarPopup.setEventListeners();

avatarPopupOpenButton.addEventListener('click', () => avatarPopup.open())

const profilePopup = new PopupWithForm(profilePopupSelector, (profileData) => {
    api.updateUserInfo(profileData)
        .then(profileData => {
            profileInfo.userInfo = profileData;
        })
        .catch(error => console.log(`Произошла ошибка: ${error}`));
}, profileValidation);
profilePopup.setEventListeners();

profilePopupOpenButton.addEventListener('click', () => {
    profileForm.elements.name.value = profileInfo.userInfo.name;
    profileForm.elements.about.value = profileInfo.userInfo.about;
    profilePopup.open();
})

const cardPopup = new PopupWithForm(cardPopupSelector, (cardData) => {
    api.addCard(cardData)
        .then((cardData) => {
            console.log(cardData)
            const card = createCard(cardData)
            cardList.addItem(card)
        })
        .catch(error => console.log(`Произошла ошибка: ${error}`));

}, cardValidation);
cardPopup.setEventListeners();

cardPopupOpenButton.addEventListener('click', () => cardPopup.open());

const fullImagePopup = new PopupWithImage(fullImagePopupSelector);
fullImagePopup.setEventListeners();

function createCard(card) {
    const cardElement = new Card(userId, cardTemplateSelector, card,
        {
            handlerCardClick: (data) => {
                fullImagePopup.open(data);
            },
            handlerRemoveCard: (data, card) => {
                confirmationPopup.open(data, card);
            },
            handlerLikeClick: function (cardId, isLiked) {
                if (isLiked) {
                    api.dislikeCard(cardId)
                        .then(result => {
                            this.likes = result.likes;
                            this.renderLikes()
                        })
                        .catch(error => console.log(`Произошла ошибка: ${error}`));
                } else {
                    api.likeCard(cardId)
                        .then(result => {
                            this.likes = result.likes;
                            this.renderLikes()
                        })
                        .catch(error => console.log(`Произошла ошибка: ${error}`));
                }
            }
        });
    return cardElement.generateCard();
}

// const rendererCards = new Section({
//     items: initialCards, renderer: (item) => {
//         const card = createCard(item);
//         rendererCards.addItem(card);
//     }
// }, cardsContainerSelector)
