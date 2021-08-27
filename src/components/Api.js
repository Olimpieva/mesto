
export default class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _sendRequest(path, requestOptions) {
        console.log('sendRequest')
        return fetch(`${this._url}/${path}`, requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Произошла ошибка: ${res.status}`)
            })
    }

    getInitialCards() {
        console.log('getInitialCards')
        return this._sendRequest(`cards`, {
            headers: this._headers
        })
    }

    getUserInfo() {
        console.log('getUserInfo')
        return this._sendRequest(`users/me`, {
            headers: this._headers,
        });
    }

    updateUserInfo(newUserInfo) {
        console.log('UpdateUserInfo')
        return this._sendRequest(`users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newUserInfo.name,
                about: newUserInfo.about
            })
        })
    }

    addNewCard(newCardInfo) {
        console.log('AddCard')
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
        console.log('RemoveCard')
        return this._sendRequest(`cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

}