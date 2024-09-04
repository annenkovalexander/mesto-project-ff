import { submitEditProfileForm, submitNewCard } from "./formSubmit";

const pageObject = document.querySelector('.page');

const buttonESCPressHandler = (event, modalScreenObject) => {
    if (event.key.toLowerCase() === "escape"){
        closeModal(event, modalScreenObject);
    }
}

export function openModal(event, popup) {
    event.stopPropagation();
    const contentObject = document.querySelector('.content');
    const buttonESCPressHandlerWrapper = (event) => buttonESCPressHandler(event, popup);
    pageObject.addEventListener('keydown', buttonESCPressHandlerWrapper);
    popup.removeEventListenerRef = buttonESCPressHandlerWrapper;
    if (popup.classList.contains('popup_type_edit')){
        const profileTitle = contentObject.querySelector('.profile__title');
        const profileDescription = contentObject.querySelector('.profile__description');
        const editForm = document.forms['edit-profile'];
        editForm.addEventListener('submit', submitEditProfileForm);
        editForm.name.value = profileTitle.textContent;
        editForm.description.value = profileDescription.textContent;
    }
    if (popup.classList.contains('popup_type_new-card')){
        const popupTypeNewCard = document.querySelector('.popup_type_new-card');
        popupTypeNewCard.addEventListener('submit', submitNewCard);
    }
    popup.classList.add("popup_is-opened");
}

export function closeModal(event, popup) {
    if (popup.classList.contains('popup_is-opened')){
        popup.classList.remove("popup_is-opened");
        pageObject.removeEventListener('keydown', popup.removeEventListenerRef);
    }        
}