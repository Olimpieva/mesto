
import '../pages/index.css';

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
    profileInfoConfig,
    cardPopupSelector,
    profilePopupSelector,
    fullImagePopupSelector,
    confirmationPopupSelector,
    avatarPopupSelector,
    cardsContainerSelector,
    cardTemplateSelector
} from '../constants/constants.js';

const profileForm = document.querySelector('.popup__form-profile');
const cardForm = document.querySelector('.popup__form-card');
const avatarForm = document.querySelector('.popup__form-avatar');

const profilePopupOpenButton = document.querySelector('.profile__button_action_edit');
const cardPopupOpenButton = document.querySelector('.profile__button_action_add');
const avatarPopupOpenButton = document.querySelector('.profile__avatar-overlay');

const api = new Api(apiOptions);

const cardList = new Section((item) => {
    const card = createCard(item);
    cardList.addItem(card);
}, cardsContainerSelector)

const profileInfo = new UserInfo(profileInfoConfig)

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        profileInfo.userInfo = userData;
        userId = userData._id;
        cardList.renderItems(initialCards);
    })
    .catch(error => console.log(`Произошла ошибка: ${error}`));

const cardValidation = new FormValidator(formConfig, cardForm);
const profileValidation = new FormValidator(formConfig, profileForm);
const avatarValidation = new FormValidator(formConfig, avatarForm)

profileValidation.enableValidation();
cardValidation.enableValidation();
avatarValidation.enableValidation();

const confirmationPopup = new PopupConfirmation(confirmationPopupSelector, (cardId, cardElement) => {
    api.removeCard(cardId)
        .then(() => cardElement.remove())
        .catch(error => console.log(`Произошла ошибка: ${error}`));
})
confirmationPopup.setEventListeners()

const fullImagePopup = new PopupWithImage(fullImagePopupSelector);
fullImagePopup.setEventListeners();

const avatarPopup = new PopupWithForm(avatarPopupSelector, function (avatarData) {
    this.renderLoading(true);
    api.updateAvatar(avatarData.avatar)
        .then(() => {
            profileInfo.userInfo = avatarData;
            this.close();
        })
        .catch(error => console.log(`Произошла ошибка: ${error}`))
        .finally(() => this.renderLoading(false));
}, avatarValidation);
avatarPopup.setEventListeners();

avatarPopupOpenButton.addEventListener('click', () => avatarPopup.open())

const profilePopup = new PopupWithForm(profilePopupSelector, function (profileData) {
    this.renderLoading(true);
    api.updateUserInfo(profileData)
        .then(profileData => {
            profileInfo.userInfo = profileData;
            this.close();
        })
        .catch(error => console.log(`Произошла ошибка: ${error}`))
        .finally(() => this.renderLoading(false));
}, profileValidation);
profilePopup.setEventListeners();

profilePopupOpenButton.addEventListener('click', () => {
    profileForm.elements.name.value = profileInfo.userInfo.name;
    profileForm.elements.about.value = profileInfo.userInfo.about;
    profilePopup.open();
})

const cardPopup = new PopupWithForm(cardPopupSelector, function (cardData) {
    this.renderLoading(true);
    api.addCard(cardData)
        .then((cardData) => {
            const card = createCard(cardData);
            cardList.addItem(card);
            this.close();
        })
        .catch(error => console.log(`Произошла ошибка: ${error}`))
        .finally(() => this.renderLoading(false));

}, cardValidation);
cardPopup.setEventListeners();

cardPopupOpenButton.addEventListener('click', () => cardPopup.open());

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
