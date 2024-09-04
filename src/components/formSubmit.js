import { cardCreate, deleteHandler, imageHandler, likeHandler } from "./card";
import { closeModal } from "./modal";

export function submitEditProfileForm(event){
    event.preventDefault();
    const profileModal = document.querySelector('.popup_type_edit');
    const contentObject = document.querySelector('.content');
    const profileTitle = contentObject.querySelector('.profile__title');
    const profileDescription = contentObject.querySelector('.profile__description');
    const editForm = document.forms['edit-profile'];
    profileTitle.textContent = editForm.name.value;
    profileDescription.textContent = editForm.description.value;
    closeModal(event, profileModal);
}

export function submitNewCard(event) {
    event.preventDefault();
    const newCardModal = document.querySelector('.popup_type_new-card');
    const placesList = document.querySelector('.places__list');
    const submitForm = document.forms['new-place'];
    const card = {
        name: submitForm['place-name'].value || "",
        link: submitForm['link'].value || ""
    };
    const item = cardCreate(card, deleteHandler, likeHandler, imageHandler);
    placesList.prepend(item);
    submitForm.reset();
    closeModal(event, newCardModal);
}
