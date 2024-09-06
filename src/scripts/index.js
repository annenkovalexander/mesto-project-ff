import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from '../components/modal.js';
import { cardCreate, deleteHandler, likeHandler } from '../components/card.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileModal = document.querySelector('.popup_type_edit');
const contentObject = document.querySelector('.content');
const profileTitle = contentObject.querySelector('.profile__title');
const profileDescription = contentObject.querySelector('.profile__description');
const editForm = document.forms['edit-profile'];
const profileModalCloseButton = profileModal.querySelector('.popup__close');
const newCardAddButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
const submitForm = document.forms['new-place'];

const newCardModalCloseButton = newCardModal.querySelector('.popup__close');
const wideImageModal = document.querySelector('.popup_type_image');
const wideImageModalCloseButton = wideImageModal.querySelector('.popup__close');
const cardsList = document.querySelector('.places__list');
const placesList = document.querySelector('.places__list');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');


const outsidePopupCloseHandler = (event, popup) => {
    if (event.target === popup){
        closeModal(popup);
    }
}


const imageHandler = (event, cardImage) => {
    event.stopPropagation();
    popupImage.src = cardImage.src || "";
    popupImage.alt = cardImage.alt || "";
    popupCaption.textContent = event.target && event.target.offsetParent && event.target.offsetParent.innerText ? event.target.offsetParent.innerText : "";
    openModal(popupTypeImage);
}

const submitEditProfileForm = (event, profileModal, editForm) => {
    event.preventDefault();
    profileTitle.textContent = editForm.name.value;
    profileDescription.textContent = editForm.description.value;
    closeModal(profileModal);
}

const submitNewCard = (event, newCardModal, submitForm) => {
    event.preventDefault();
    const card = {
        name: submitForm['place-name'].value || "",
        link: submitForm['link'].value || ""
    };
    const item = cardCreate(card, deleteHandler, likeHandler, imageHandler);
    placesList.prepend(item);
    submitForm.reset();
    closeModal(newCardModal);
}


editForm.name.value = profileTitle.textContent;
editForm.description.value = profileDescription.textContent;

submitForm.addEventListener('submit', (event) => submitNewCard(event, newCardModal, submitForm, placesList));
editForm.addEventListener('submit', (event) => submitEditProfileForm(event, profileModal, editForm, profileTitle, profileDescription));

initialCards.forEach(card => {
    placesList.append(cardCreate(card, deleteHandler, likeHandler, imageHandler));
});


profileEditButton.addEventListener('click', () => openModal(profileModal));
profileModalCloseButton.addEventListener('click', () => closeModal(profileModal));

profileModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, profileModal));

newCardAddButton.addEventListener('click', () => openModal(newCardModal));
newCardModalCloseButton.addEventListener('click', () => closeModal(newCardModal));

newCardModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, newCardModal));

cardsList.addEventListener('click', () => openModal(wideImageModal));
wideImageModalCloseButton.addEventListener('click', () => closeModal(wideImageModal));
wideImageModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, wideImageModal));