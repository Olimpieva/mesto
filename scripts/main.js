
const initialCards = [
    {
        name: 'Индия',
        link: 'https://images.unsplash.com/photo-1624446559568-4d7812b6f75d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80'
    },
    {
        name: 'Турция',
        link: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
        name: 'Италия',
        link: 'https://images.unsplash.com/photo-1578063079163-330c68efb737?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
        name: 'Латвия',
        link: 'https://images.unsplash.com/photo-1607969391576-48f9021ded30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
        name: 'Канада',
        link: 'https://images.unsplash.com/photo-1497546848296-1bb36c9b48db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=562&q=80'
    },
    {
        name: 'Россия',
        link: 'https://images.unsplash.com/photo-1612719734814-73ed4b4235e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    }
]

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


//cards

const cards = document.querySelector('.cards');
const cardTemplate = cards.querySelector('#card-template').content;

function renderCard(card) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    cards.append(cardElement)
}

initialCards.forEach(item => renderCard(item));

const removeCardButtons = cards.querySelectorAll('.card__remove');
const likeButtons = cards.querySelectorAll('.card__like');

function removeCard(event) {
    event.target.parentNode.remove();
}

function toggleLike(event) {
    event.target.classList.toggle('card__like_active');
}

removeCardButtons.forEach(item => item.addEventListener('click', removeCard));
likeButtons.forEach(item => item.addEventListener('click', toggleLike));




