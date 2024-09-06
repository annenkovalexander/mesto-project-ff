import { openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;

const cardCreate = (card, deleteHandler, likeHandler, imageHandler) => {
    const cardPlacesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardTemplate.addEventListener('click', (event) => deleteHandler(event, cardPlacesItem));
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
    likeButton.classList.toggle('card__like-button_is-active')
}

export {cardCreate, deleteHandler, likeHandler };