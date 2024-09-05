import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from '../components/modal.js';
import { cardCreate, deleteHandler, likeHandler, imageHandler } from '../components/card.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileModal = document.querySelector('.popup_type_edit');
const profileModalCloseButton = profileModal.querySelector('.popup__close');
const newCardAddButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardModalCloseButton = newCardModal.querySelector('.popup__close');
const wideImageModal = document.querySelector('.popup_type_image');
const wideImageModalCloseButton = wideImageModal.querySelector('.popup__close');
const cardsList = document.querySelector('.places__list');
const body = document.querySelector('.page');

const placesList = document.querySelector('.places__list');
initialCards.forEach(card => {
    placesList.append(cardCreate(card, deleteHandler, likeHandler, imageHandler));
});

profileEditButton.addEventListener('click', (event) => openModal(event, profileModal));
profileModalCloseButton.addEventListener('click', (event) => closeModal(event, profileModal));

newCardAddButton.addEventListener('click', (event) => openModal(event, newCardModal));
newCardModalCloseButton.addEventListener('click', (event) => closeModal(event, newCardModal));

cardsList.addEventListener('click', (event) => openModal(event, wideImageModal));
wideImageModalCloseButton.addEventListener('click', (event) => closeModal(event, wideImageModal));

body.addEventListener('click', 
    (event) => {
        [profileModal, newCardModal, wideImageModal].forEach((domObject) => {
            if (event.target === profileModal || event.target === newCardModal || event.target === wideImageModal)
                closeModal(event, domObject) 
        });
    });