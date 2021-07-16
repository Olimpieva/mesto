const profilePopup = document.querySelector('.popup-profile');
const profileForm = document.querySelector('.popup__form-profile');
const userNameInput = profilePopup.querySelector('.popup__input_type_name');
const userCaptionInput = profilePopup.querySelector('.popup__input_type_caption');
const userName = document.querySelector('.profile__info-name');
const userCaption = document.querySelector('.profile__info-caption');

const cardForm = document.querySelector('.popup__form-card');
const cardCaptionInput = cardForm.querySelector('.popup__input_type_caption');
const cardLinkInput = cardForm.querySelector('.popup__input_type_link');

const cardPopupConfig = {
    popupSelector: '.popup-card',
    popupOpenedClass: 'popup_is-opened',
    openButtonSelector: '.profile__button_action_add',
    closeButtonSelector: '.popup__button_action_close',
    onOpen: onCardPopupClose
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

initialCards.forEach((card) => createCard(card, {
    onImageClick: openImagePopup
}));

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

const { resetForm: resetCardForm } = enableValidation(cardFormConfig)
const { resetForm: resetProfileForm } = enableValidation(profileFormConfig)

function onProfilePopupOpen() {
    resetProfileForm();
    userNameInput.value = userName.textContent;
    userCaptionInput.value = userCaption.textContent;
}

function onCardPopupClose() {
    resetCardForm();
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
    createCard(newCard, {
        onImageClick: openImagePopup
    });
    closeCardPopup();
    resetCardForm();
}

cardForm.addEventListener('submit', (event) => {
    event.preventDefault()
    setCardInfo();
});
