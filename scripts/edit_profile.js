const userName = document.querySelector('.profile__info-name');
const userAbout = document.querySelector('.profile__info-about');

const openProfileFormButton = document.querySelector('.profile__button_action_edit');

const popupProfile = document.querySelector('.popup-profile');
const userNameInput = popupProfile.querySelector('.popup__input_type_name');
const userAboutInput = popupProfile.querySelector('.popup__input_type_about');
const closeProfileFormButton = popupProfile.querySelector('.popup__button_action_close')
const profileForm = popupProfile.querySelector('.popup__form')

function openProfileForm() {
    userNameInput.value = userName.textContent;
    userAboutInput.value = userAbout.textContent;
    popupProfile.classList.add('popup_is-opened');
}

function closeProfileForm() {
    popupProfile.classList.remove('popup_is-opened');
}

function setProfileInfo() {
    userName.textContent = userNameInput.value;
    userAbout.textContent = userAboutInput.value;
    closeProfileForm();
}

openProfileFormButton.addEventListener('click', openProfileForm);
closeProfileFormButton.addEventListener('click', closeProfileForm);
profileForm.addEventListener('submit', (event) => {
    event.preventDefault()
    setProfileInfo();
});