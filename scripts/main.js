
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

const cards = document.querySelector('.cards');
const cardTemplate = cards.querySelector('#card-template').content;

function removeCard(event) {
    event.target.parentNode.remove();
}

function toggleLike(event) {
    event.target.classList.toggle('card__like_active');
}

function renderCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    const removeCardButton = cardElement.querySelector('.card__remove');
    removeCardButton.addEventListener('click', removeCard);

    const likeButton = cardElement.querySelector('.card__like');
    likeButton.addEventListener('click', toggleLike);

    cards.append(cardElement)
}

initialCards.forEach(item => renderCard(item.name, item.link));

const userName = document.querySelector('.profile__info-name');
const userCaption = document.querySelector('.profile__info-caption');

const openProfileFormButton = document.querySelector('.profile__button_action_edit');
const profilePopup = document.querySelector('.popup-profile');
const userNameInput = profilePopup.querySelector('.popup__input_type_name');
const userCaptionInput = profilePopup.querySelector('.popup__input_type_caption');
const closeProfileFormButton = profilePopup.querySelector('.popup__button_action_close');
const profileForm = profilePopup.querySelector('.popup__form');

const openCardFormButton = document.querySelector('.profile__button_action_add')
const cardPopup = document.querySelector('.popup-card');
const cardCaptionInput = cardPopup.querySelector('.popup__input_type_caption');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_link');
const closeCardFormButton = cardPopup.querySelector('.popup__button_action_close');
const cardForm = cardPopup.querySelector('.popup__form');

function openPopup(form) {
    form.classList.add('popup_is-opened');
}

function closePopup(form) {
    form.classList.remove('popup_is-opened');
}

function setProfileInfo() {
    userName.textContent = userNameInput.value;
    userCaption.textContent = userCaptionInput.value;
    closePopup(profilePopup);
}

function setCardInfo() {
    renderCard(cardCaptionInput.value, cardLinkInput.value)
    closePopup(cardPopup);
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







