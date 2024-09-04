import { openModal } from "./modal";

const cardCreate = (card, deleteHandler, likeHandler, imageHandler) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardPlacesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardPlacesItem.querySelector('.card__image');
    const cardDeleteButton = cardPlacesItem.querySelector('.card__delete-button');
    const cardTitle = cardPlacesItem.querySelector('.card__title');
    const cardLikeButton = cardPlacesItem.querySelector('.card__like-button');
    cardDeleteButton.addEventListener('click', (event) => deleteHandler(event, cardPlacesItem));
    cardLikeButton.addEventListener('click', (event) => likeHandler(event, cardPlacesItem));
    cardImage.src = card.link || "";
    cardImage.alt = "Mesto " + card.name || "";
    cardTitle.textContent = card.name || "";
    cardImage.addEventListener('click', (event) => imageHandler(event, cardImage));
    return cardPlacesItem;
}

const deleteHandler = (event, card) => {
    event.stopPropagation();
    card.remove();
}

const likeHandler = (event, card) => {
    event.stopPropagation();
    const likeButton = card.querySelector('.card__like-button');
    likeButton.classList.add('card__like-button_is-active')
}

const imageHandler = (event, cardImage) => {
    event.stopPropagation();
    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImage = popupTypeImage.querySelector('.popup__image');
    const popupCaption = popupTypeImage.querySelector('.popup__caption');
    popupImage.src = cardImage.src || "";
    popupImage.alt = cardImage.alt || "";
    popupCaption.textContent = event.target && event.target.offsetParent && event.target.offsetParent.innerText ? event.target.offsetParent.innerText : "";
    openModal(event, popupTypeImage);
}

export {cardCreate, deleteHandler, likeHandler, imageHandler};