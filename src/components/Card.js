
export default class Card {
    constructor(userId, cardTemplateSelector, data, { handlerCardClick, handlerRemoveCard, handlerLikeClick }) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content;
        this._userId = userId;
        this._data = data;
        this._cardId = this._data._id;
        this.likes = this._data.likes;
        this._handlerCardClick = handlerCardClick;
        this._handlerRemoveCard = handlerRemoveCard;
        this._handlerLikeClick = handlerLikeClick;
    }

    _getCardTemplate = () => this._cardTemplate.querySelector('.card').cloneNode(true);

    _isCardLiked() {
        const likesArr = this.likes.map(item => item._id);
        return likesArr.some((item) => item === this._userId)
    }

    _removeCard = () => {
        this._handlerRemoveCard(this._cardId, this._card)
    }

    _setEventListeners = () => {
        this._card.querySelector('.card__like').addEventListener('click', () => this._handlerLikeClick(this._cardId, this._isCardLiked()));
        this._card.querySelector('.card__remove').addEventListener('click', this._removeCard);
        this._card.querySelector('.card__image').addEventListener('click', () => this._handlerCardClick(this._data));
    }

    renderLikes() {
        const cardLike = this._card.querySelector('.card__like');
        const cardLikesCounter = this._card.querySelector('.card__like-counter');
        this._isCardLiked() ? cardLike.classList.add('card__like_active') : cardLike.classList.remove('card__like_active');
        cardLikesCounter.textContent = this.likes.length;
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

        this.renderLikes();
        this._setEventListeners();

        return this._card;
    }
}

