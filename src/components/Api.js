
export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _sendRequest(path, requestOptions) {
        return fetch(`${this._url}/${path}`, requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Произошла ошибка: ${res.status}`)
            })
    }

    getInitialCards() {
        return this._sendRequest(`cards`, {
            headers: this._headers
        })
    }

    getUserInfo() {
        return this._sendRequest(`users/me`, {
            headers: this._headers,
        });
    }

    updateUserInfo(newUserInfo) {
        return this._sendRequest(`users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newUserInfo.name,
                about: newUserInfo.about
            })
        })
    }

    updateAvatar(avatarLink) {
        return this._sendRequest(`users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink,
            })
        })
    }

    addCard(newCardInfo) {
        return this._sendRequest(`cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: newCardInfo.name,
                link: newCardInfo.link
            })
        })
    }

    removeCard(cardId) {
        return this._sendRequest(`cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    likeCard(cardId) {
        return this._sendRequest(`cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    dislikeCard(cardId) {
        return this._sendRequest(`cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }



}