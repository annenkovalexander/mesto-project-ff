import '../pages/index.css';
import { openModal, closeModal } from '../components/modal.js';
import { cardCreate, deleteHandler, likeHandler } from '../components/card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialData, updateUserProfileData, addNewCard, submitNewProfileAvatar } from '../components/api.js';
import { convertCardsData } from '../components/utils.js';

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
const profileAvatarChangeButton = contentObject.querySelector('.profile__image-change-avatar');
const profileAvatarForm = document.forms['new-avatar'];
const profileAvatarCloseButton = profileAvatarModal.querySelector('.popup__close');
const formEditProfile = document.forms['edit-profile'];
const profileModalCloseButton = profileModal.querySelector('.popup__close');
const newCardAddButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('.popup_type_new-card');
const newCardModalForm = newCardModal.querySelector(validationConfig.formSelector);
const formAddCard = document.forms['new-place'];

const newCardModalCloseButton = newCardModal.querySelector('.popup__close');
const wideImageModal = document.querySelector('.popup_type_image');
const wideImageModalCloseButton = wideImageModal.querySelector('.popup__close');
const cardsList = document.querySelector('.places__list');
const placesList = document.querySelector('.places__list');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');


getInitialData().then(result => {
    const initialData = {
        profileData: result[1] || {},
        cardsData: result[0] || {}
    }
    const initialCards = convertCardsData(initialData);

    const imageHandler = (event, cardImage) => {
        event.stopPropagation();
        popupImage.src = cardImage.src || "";
        popupImage.alt = cardImage.alt || "";
        popupCaption.textContent = event.target && event.target.offsetParent && event.target.offsetParent.innerText ? event.target.offsetParent.innerText : "";
        openModal(popupTypeImage);
    }

    initialCards.forEach(card => {
        placesList.append(cardCreate(card, deleteHandler, likeHandler, imageHandler, initialData.profileData));
    });

    profileTitle.textContent = initialData && initialData.profileData && initialData.profileData.name ? initialData.profileData.name : "";
    profileDescription.textContent = initialData && initialData.profileData && initialData.profileData.about ? initialData.profileData.about : "";
    profileAvatar.src = initialData && initialData.profileData && initialData.profileData.avatar ? initialData.profileData.avatar : "";
    profileAvatarForm['avatar-link'].value = initialData && initialData.profileData && initialData.profileData.avatar ? initialData.profileData.avatar : "";
    
    const outsidePopupCloseHandler = (event, popup) => {
        if (event.target === popup){
            closeModal(popup);
        }
    }
    
    const submitEditProfileForm = (event, profileModal, editForm) => {
        event.preventDefault();
        const submitButton = profileModal.querySelector(validationConfig.submitButtonSelector);
        submitButton.textContent = 'Сохранение...';
        submitButton.disabled = true;
        updateUserProfileData(editForm.name.value, editForm.description.value, profileModal, validationConfig).then(updateData => {
            profileTitle.textContent = updateData.name;
            profileDescription.textContent = updateData.about;
            submitButton.disabled = true;
            clearValidation(profileModal, validationConfig);
            closeModal(profileModal);
        }).catch(err => console.log(err))
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        })
    }
    
    const submitNewCard = (event, newCardModal, submitForm, placesList) => {
        event.preventDefault();
        const submitButton = newCardModal.querySelector(validationConfig.submitButtonSelector);
        submitButton.textContent = 'Сохранение...';
        submitButton.disabled = true;
        addNewCard(submitForm['place-name'].value, submitForm['link'].value, newCardModal, submitForm, validationConfig)
        .then(newCardData => {
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
            submitButton.disabled = true;
            clearValidation(newCardModal, validationConfig);
            closeModal(newCardModal);
        })
        .catch(err => console.log(err))
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });  
    }
    
    const submitProfileAvatar = (event, submitForm, modal) => {
        event.preventDefault();
        const submitButton = modal.querySelector(validationConfig.submitButtonSelector);
        submitButton.textContent = 'Сохранение...';
        submitButton.disabled = true;
        submitNewProfileAvatar(submitForm, modal, validationConfig).then(submitResult => {
            if (submitResult && submitResult.avatar){
                profileAvatar.src = submitResult.avatar;
                submitButton.disabled = true;
            }
            submitForm.reset();
            clearValidation(submitForm, validationConfig);
            closeModal(modal);
        }).catch(err => console.log(err))
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
    }
    
    formAddCard.addEventListener('submit', (event) => submitNewCard(event, newCardModal, formAddCard, placesList));
    formEditProfile.addEventListener('submit', (event) => submitEditProfileForm(event, profileModal, formEditProfile, profileTitle, profileDescription));
    profileAvatarForm.addEventListener('submit', (event) => submitProfileAvatar(event, profileAvatarForm, profileAvatarModal));
    
    profileEditButton.addEventListener('click', () => {
        openModal(profileModal);
        formEditProfile.name.value = profileTitle.textContent;
        formEditProfile.description.value = profileDescription.textContent;
        clearValidation(profileModalForm, validationConfig);
    });
    profileModalCloseButton.addEventListener('click', () => {
        closeModal(profileModal);
        clearValidation(profileModalForm, validationConfig);
    });
    
    profileModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, profileModal));
    
    profileAvatar.addEventListener('click', () => {
        openModal(profileAvatarModal);
        profileAvatarForm['avatar-link'].value = profileAvatar.src;
        clearValidation(profileAvatarForm, validationConfig);
    });
    
    profileAvatarChangeButton.addEventListener('click', () => {
        openModal(profileAvatarModal);
        clearValidation(profileAvatarForm, validationConfig);
    });
    
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
    });
    
    newCardModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, newCardModal));
    
    cardsList.addEventListener('click', () => openModal(wideImageModal));
    wideImageModalCloseButton.addEventListener('click', () => closeModal(wideImageModal));
    wideImageModal.addEventListener('click', (event) => outsidePopupCloseHandler(event, wideImageModal));
    
    enableValidation(validationConfig);
})
.catch(err => console.log(err));

