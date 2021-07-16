
const cards = document.querySelector('.cards');

const imagePopup = document.querySelector('.popup-image');
const fullImage = imagePopup.querySelector('.popup-image__image');
const fullImageTitle = imagePopup.querySelector('.popup-image__title');

function createCard({ name, link }, { onImageClick }) {
    const cardTemplate = cards.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const removeCardButton = cardElement.querySelector('.card__remove');
    const likeButton = cardElement.querySelector('.card__like');

    function toggleLike(event) {
        event.target.classList.toggle('card__like_active');
    }

    function removeCard(event) {
        event.target.closest('.card').remove();
    }

    function openFullImage(title, image) {
        fullImage.src = image;
        fullImageTitle.textContent = title;
        fullImage.alt = title;
    }

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardImage.addEventListener('click', () => {
        openFullImage(name, link);
        onImageClick();
    });
    removeCardButton.addEventListener('click', removeCard);
    likeButton.addEventListener('click', toggleLike);

    renderCard(cardElement);
}

function renderCard(card) {
    cards.prepend(card)
}

