
export default class Card {
    constructor(cardTemplateSelector, { name, link }, { onImageClick }) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content;
        this._name = name;
        this._link = link;
        this._onImageClick = onImageClick;
    }

    _getCardTemplate = () => {
        const cardElement = this._cardTemplate.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    _toggleLike = (event) => {
        event.target.classList.toggle('card__like_active');
    }

    _removeCard = (event) => {
        event.target.closest('.card').remove();
    }

    _setEventListeners = () => {
        this._card.querySelector('.card__like').addEventListener('click', this._toggleLike);
        this._card.querySelector('.card__remove').addEventListener('click', this._removeCard);
        this._card.querySelector('.card__image').addEventListener('click', () => this._onImageClick(this._name, this._link));
    }

    generateCard = () => {
        this._card = this._getCardTemplate();

        const cardImage = this._card.querySelector('.card__image');
        const cardTitle = this._card.querySelector('.card__title');

        cardImage.alt = this._name;
        cardImage.src = this._link;
        cardTitle.textContent = this._name;

        this._setEventListeners();

        return this._card;
    }
}

