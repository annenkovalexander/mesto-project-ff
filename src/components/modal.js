const pageObject = document.querySelector('.page');

const buttonESCPressHandler = (event, modalScreenObject) => {
    if (event && event.key && event.key.toLowerCase() === "escape"){
        closeModal(modalScreenObject);
    }
}

export function openModal(popup) {
    const buttonESCPressHandlerWrapper = (event) => buttonESCPressHandler(event, popup);
    pageObject.addEventListener('keydown', buttonESCPressHandlerWrapper);
    popup.removeEventListenerRef = buttonESCPressHandlerWrapper;
    popup.classList.add("popup_is-opened");
}

export function closeModal(popup) {
    if (popup.classList.contains('popup_is-opened')){
        popup.classList.remove("popup_is-opened");
        pageObject.removeEventListener('keydown', popup.removeEventListenerRef);
    }
}