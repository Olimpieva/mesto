
const createPopup = ({ popupSelector, popupOpenedClass, openButtonSelector, closeButtonSelector, onOpen, onClose }) => {
    const popup = document.querySelector(popupSelector);
    const closePopupButton = popup.querySelector(closeButtonSelector);
    const openPopupButton = document.querySelector(openButtonSelector);

    function closePopupByOverlay(event) {
        if (event.target === event.currentTarget) {
            closePopup();
        }
    }

    function closePopupByEsc(event) {
        if (event.code === 'Escape') {
            closePopup();
        }
    }

    function openPopup() {
        if (onOpen) {
            onOpen();
        }

        popup.classList.add(popupOpenedClass);
        popup.addEventListener('click', closePopupByOverlay);
        document.addEventListener('keyup', closePopupByEsc);
    }

    function closePopup() {
        if (onClose) {
            onClose();
        }

        popup.classList.remove(popupOpenedClass);
        popup.removeEventListener('click', closePopupByOverlay);
        document.removeEventListener('keyup', closePopupByEsc);
    }

    closePopupButton.addEventListener('click', closePopup);

    if (openButtonSelector) {
        openPopupButton.addEventListener('click', openPopup);
    }

    return { openPopup, closePopup };
};

