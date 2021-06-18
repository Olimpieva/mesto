const userName = document.querySelector('.profile__info-name');
const userAbout = document.querySelector('.profile__info-about');

const openProfileFormButton = document.querySelector('.profile__button_action_edit');

const profileForm = document.querySelector('.popup-profile')
const userNameInput = profileForm.querySelector('.popup__input_type_name');
const userAboutInput = profileForm.querySelector('.popup__input_type_about');
const closeProfileFormButton = profileForm.querySelector('.popup__button_action_close')
const profileContainer = profileForm.querySelector('.popup__container')

openProfileFormButton.addEventListener('click', openProfileForm);
closeProfileFormButton.addEventListener('click', closeProfileForm);
profileContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    setProfileInfo();
});

function openProfileForm() {
    userNameInput.value = userName.textContent;
    userAboutInput.value = userAbout.textContent;
    profileForm.classList.add('popup_is-opened');
}

function closeProfileForm() {
    profileForm.classList.remove('popup_is-opened');
}

function setProfileInfo() {
    userName.textContent = userNameInput.value;
    userAbout.textContent = userAboutInput.value;
    closeProfileForm();
}