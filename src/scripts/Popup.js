
// export const createPopup = ({ popupSelector, popupOpenedClass, openButtonSelector, closeButtonSelector, onOpen, onClose }) => {
//     const popup = document.querySelector(popupSelector);
//     const closePopupButton = popup.querySelector(closeButtonSelector);
//     const openPopupButton = document.querySelector(openButtonSelector);

//     function closePopupByOverlay(event) {
//         if (event.target === event.currentTarget) {
//             closePopup();
//         }
//     }

//     function closePopupByEsc(event) {
//         if (event.code === 'Escape') {
//             closePopup();
//         }
//     }

//     function openPopup() {
//         if (onOpen) {
//             onOpen();
//         }

//         popup.classList.add('popup_animated'); // class "popup_animated" was added to solve the problem with the popup flickering when rendering the page. I don't want to remove it, please.
//         popup.classList.add(popupOpenedClass);
//         popup.addEventListener('click', closePopupByOverlay);
//         document.addEventListener('keyup', closePopupByEsc);
//     }

//     function closePopup() {
//         if (onClose) {
//             onClose();
//         }

//         popup.classList.remove(popupOpenedClass);
//         popup.removeEventListener('click', closePopupByOverlay);
//         document.removeEventListener('keyup', closePopupByEsc);
//     }

//     closePopupButton.addEventListener('click', closePopup);

//     if (openButtonSelector) {
//         openPopupButton.addEventListener('click', openPopup);
//     }

//     return { openPopup, closePopup };
// };

export default class Popup {
    constructor(popupSelector) {
        console.log('Create main Popup')
        console.log(popupSelector)
        this._popup = document.querySelector(popupSelector);
        console.log(this._popup)
    }

    open() {
        this._popup.classList.add('popup_animated'); // class "popup_animated" was added to solve the problem with the popup flickering when rendering the page. I don't want to remove it, please.
        this._popup.classList.add('popup_is-opened');
        this._popup.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        console.log('Close main Popup')
        console.log(this._popup)
        this._popup.classList.remove('popup_is-opened');
        this._popup.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose = (event) => {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        console.log(this._popup)
        console.log('Set event main Popup')
        this._popup.querySelector('.popup__button_action_close').addEventListener('click', this.close);
    }

}

