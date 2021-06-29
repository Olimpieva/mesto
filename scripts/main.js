
import { initialCards } from './initial-cards.js';

const cards = document.querySelector('.cards');
const cardTemplate = cards.querySelector('#card-template').content;

const userName = document.querySelector('.profile__info-name');
const userCaption = document.querySelector('.profile__info-caption');

const openProfileFormButton = document.querySelector('.profile__button_action_edit');
const profilePopup = document.querySelector('.popup-profile');
const profileForm = profilePopup.querySelector('.popup__form');
const userNameInput = profilePopup.querySelector('.popup__input_type_name');
const userCaptionInput = profilePopup.querySelector('.popup__input_type_caption');
const closeProfileFormButton = profilePopup.querySelector('.popup__button_action_close');

const openCardFormButton = document.querySelector('.profile__button_action_add')
const cardPopup = document.querySelector('.popup-card');
const cardForm = cardPopup.querySelector('.popup__form');
const cardCaptionInput = cardPopup.querySelector('.popup__input_type_caption');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_link');
const closeCardFormButton = cardPopup.querySelector('.popup__button_action_close');

const imagePopup = document.querySelector('.popup-image');
const fullImage = imagePopup.querySelector('.popup-image__image');
const fullImageTitle = imagePopup.querySelector('.popup-image__title');
const closeFullImageButton = imagePopup.querySelector('.popup__button_action_close');

function openPopup(popup) {
    popup.classList.add('popup_animated');
    popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

function setProfileInfo() {
    userName.textContent = userNameInput.value;
    userCaption.textContent = userCaptionInput.value;
    closePopup(profilePopup);
}

function setCardInfo() {
    const newCard = {
        name: cardCaptionInput.value,
        link: cardLinkInput.value,
    }
    createCard(newCard);
    closePopup(cardPopup);
    cardForm.reset();
}

function openFullImage(title, image) {
    fullImage.src = image;
    fullImageTitle.textContent = title;
    fullImageTitle.alt = title;
    openPopup(imagePopup);
}

function removeCard(event) {
    event.target.closest('.card').remove();
}

function toggleLike(event) {
    event.target.classList.toggle('card__like_active');
}

function createCard({ name, link }) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const removeCardButton = cardElement.querySelector('.card__remove');
    const likeButton = cardElement.querySelector('.card__like');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardImage.addEventListener('click', () => openFullImage(name, link));
    removeCardButton.addEventListener('click', removeCard);
    likeButton.addEventListener('click', toggleLike);

    renderCard(cardElement);
}

function renderCard(card) {
    cards.prepend(card)
}

openProfileFormButton.addEventListener('click', () => {
    userNameInput.value = userName.textContent;
    userCaptionInput.value = userCaption.textContent;
    openPopup(profilePopup);
});
closeProfileFormButton.addEventListener('click', () => closePopup(profilePopup));
profileForm.addEventListener('submit', (event) => {
    event.preventDefault()
    setProfileInfo();
});

openCardFormButton.addEventListener('click', () => openPopup(cardPopup));
closeCardFormButton.addEventListener('click', () => closePopup(cardPopup))
cardForm.addEventListener('submit', (event) => {
    event.preventDefault()
    setCardInfo();
});

closeFullImageButton.addEventListener('click', () => closePopup(imagePopup));

initialCards.forEach(createCard);


