import '../pages/index.css';
import { openModal, closeModal } from '../components/modal.js';
import { cardCreate, deleteHandler, likeHandler } from '../components/card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialData, updateUserProfileData, addNewCard, submitNewProfileAvatar } from '../data/integrations_maintain.js';
import { convertCardsData } from '../data/convert_data.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

const profileEditButton = document.querySelector('.profile__edit-button');
const profileModal = document.querySelector('.popup_type_edit');
const profileModalForm = profileModal.querySelector(validationConfig.formSelector);
const contentObject = document.querySelector('.content');
const profileTitle = contentObject.querySelector('.profile__title');
const profileDescription = contentObject.querySelector('.profile__description');
const profileAvatarModal = document.querySelector('.popup_type_avatar');
const profileAvatar = contentObject.querySelector('.profile__image');
const profileAvatarForm = document.forms['new-avatar'];
const profileAvatarCloseButton = profileAvatarModal.querySelector('.popup__close');
const editForm = document.forms['edit-profile'];
const profileModalCloseButton = profileModal.querySelector('.popup__close');
const newCardAddButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardModalForm = newCardModal.querySelector(validationConfig.formSelector);
const submitForm = document.forms['new-place'];

const newCardModalCloseButton = newCardModal.querySelector('.popup__close');
const wideImageModal = document.querySelector('.popup_type_image');
const wideImageModalCloseButton = wideImageModal.querySelector('.popup__close');
const cardsList = document.querySelector('.places__list');
const placesList = document.querySelector('.places__list');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');


const formsList = Array.from(document.querySelectorAll(validationConfig.formSelector));

const initialData = await getInitialData();
const initialCards = convertCardsData(initialData);

profileTitle.textContent = initialData && initialData.profileData && initialData.profileData.name ? initialData.profileData.name : "";
profileDescription.textContent = initialData && initialData.profileData && initialData.profileData.about ? initialData.profileData.about : "";
profileAvatar.src = initialData && initialData.profileData && initialData.profileData.avatar ? initialData.profileData.avatar : "";
profileAvatarForm['avatar-link'].value = initialData && initialData.profileData && initialData.profileData.avatar ? initialData.profileData.avatar : "";


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

const submitEditProfileForm = async (event, profileModal, editForm) => {
    event.preventDefault();
    const updateData = await updateUserProfileData(editForm.name.value, editForm.description.value, profileModal, validationConfig);
    profileTitle.textContent = updateData.name;
    profileDescription.textContent = updateData.about;
    closeModal(profileModal);
}

const submitNewCard = async (event, newCardModal, submitForm) => {
    event.preventDefault();
    const newCardData = await addNewCard(submitForm['place-name'].value, submitForm['link'].value, newCardModal, submitForm, validationConfig);
    console.log("submitNewCard newCardData: ", newCardData);
    const card = {
        id: newCardData._id || "",
        name: newCardData.name || "",
        link: newCardData.link || "",
        likes: newCardData.likes || [],
        owner: newCardData.owner || {}
    };
    const item = cardCreate(card, deleteHandler, likeHandler, imageHandler, initialData.profileData);
    placesList.prepend(item);
    submitForm.reset();
    closeModal(newCardModal);
}

const submitProfileAvatar = async (event, submitForm, modal) => {
    event.preventDefault();
    const submitResult = await submitNewProfileAvatar(submitForm, modal, validationConfig);
    console.log("submitProfileAvatar submitResult: ", submitResult);
    if (submitResult && submitResult.avatar)
        profileAvatar.src = submitResult.avatar
    closeModal(modal);
}

editForm.name.value = profileTitle.textContent;
editForm.description.value = profileDescription.textContent;

submitForm.addEventListener('submit', (event) => submitNewCard(event, newCardModal, submitForm, placesList));
editForm.addEventListener('submit', (event) => submitEditProfileForm(event, profileModal, editForm, profileTitle, profileDescription));
profileAvatarForm.addEventListener('submit', (event) => submitProfileAvatar(event, profileAvatarForm, profileAvatarModal));


initialCards.forEach(card => {
    placesList.append(cardCreate(card, deleteHandler, likeHandler, imageHandler, initialData.profileData));
});


profileEditButton.addEventListener('click', () => {
    openModal(profileModal);
    clearValidation(profileModalForm, validationConfig);
});
profileModalCloseButton.addEventListener('click', () => {
    closeModal(profileModal);
    clearValidation(profileModalForm, validationConfig);
});

profileModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, profileModal));

profileAvatar.addEventListener('click', () => {
    openModal(profileAvatarModal);
    clearValidation(profileAvatarForm, validationConfig);
})

profileAvatarCloseButton.addEventListener('click', () => {
    closeModal(profileAvatarModal);
    clearValidation(profileAvatarForm, validationConfig);
});

profileAvatarModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, profileAvatarModal));

newCardAddButton.addEventListener('click', () => {
    openModal(newCardModal);
    clearValidation(newCardModalForm, validationConfig);
});
newCardModalCloseButton.addEventListener('click', () => {
    closeModal(newCardModal);
    clearValidation(newCardModalForm, validationConfig);
});

newCardModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, newCardModal));

cardsList.addEventListener('click', () => openModal(wideImageModal));
wideImageModalCloseButton.addEventListener('click', () => closeModal(wideImageModal));
wideImageModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, wideImageModal));

enableValidation(validationConfig);

