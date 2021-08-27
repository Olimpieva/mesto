
export default class Card {
    constructor(userId, cardTemplateSelector, data, { handlerCardClick, handlerRemoveCard }) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content;
        this._data = data;
        this._handlerCardClick = handlerCardClick;
        this._handlerRemoveCard = handlerRemoveCard;
        this._userId = userId;
    }

    _getCardTemplate = () => this._cardTemplate.querySelector('.card').cloneNode(true);

    _toggleLike = (event) => {
        event.target.classList.toggle('card__like_active');
    }

    _removeCard = () => {
        this._handlerRemoveCard(this._data._id)
        this._card.remove();
    }

    _setEventListeners = () => {
        this._card.querySelector('.card__like').addEventListener('click', this._toggleLike);
        this._card.querySelector('.card__remove').addEventListener('click', this._removeCard);
        this._card.querySelector('.card__image').addEventListener('click', () => this._handlerCardClick(this._data));
    }

    generateCard = () => {
        this._card = this._getCardTemplate();

        if (this._userId !== this._data.owner._id) {
            this._card.querySelector('.card__remove').style.display = 'none';
        }

        const cardImage = this._card.querySelector('.card__image');
        const cardTitle = this._card.querySelector('.card__title');
        const { name, link } = this._data;

        cardImage.src = link;
        cardImage.alt = name;
        cardTitle.textContent = name;

        this._setEventListeners();

        return this._card;
    }
}

