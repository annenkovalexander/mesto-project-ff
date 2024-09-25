import { deleteCard, likeCard, dislikeCard } from "../data/integrations_maintain.js";

const cardTemplate = document.querySelector('#card-template').content;

const cardCreate = (card, deleteHandler, likeHandler, imageHandler, profileData) => {
    const cardPlacesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardTemplate.addEventListener('click', (event) => deleteHandler(event, cardPlacesItem));
    const cardImage = cardPlacesItem.querySelector('.card__image');
    const cardDeleteButton = cardPlacesItem.querySelector('.card__delete-button');
    const cardTitle = cardPlacesItem.querySelector('.card__title');
    const cardLikeButton = cardPlacesItem.querySelector('.card__like-button');
    const cardLikeCount = cardPlacesItem.querySelector('.card__like-count');
    if (card.owner && card.owner._id && profileData._id && card.owner._id === profileData._id)
        cardDeleteButton.classList.remove("card__delete-button-hidden");
    if (card.likes.some(like => like._id === profileData._id))
        cardLikeButton.classList.add('card__like-button_is-active');
    cardDeleteButton.addEventListener('click', (event) => deleteHandler(event, cardPlacesItem, card));
    cardLikeButton.addEventListener('click', (event) => likeHandler(event, cardPlacesItem, card));
    cardImage.src = card.link || "";
    cardImage.alt = "Mesto " + card.name || "";
    cardTitle.textContent = card.name || "";
    cardLikeCount.textContent = card.likes && card.likes.length ? card.likes.length : 0;
    cardImage.addEventListener('click', (event) => imageHandler(event, cardImage));
    return cardPlacesItem;
}

const deleteHandler = async (event, cardPlacesItem, card) => {
    event.stopPropagation();
    const deleteResult = await deleteCard(card.id);
    if (deleteResult && deleteResult.message && deleteResult.message.toLowerCase().includes('пост'))
        cardPlacesItem.remove();
}

const likeHandler = async (event, cardPlacesItem, card) => {
    event.stopPropagation();
    const likeButton = cardPlacesItem.querySelector('.card__like-button');
    const cardLikeCount = cardPlacesItem.querySelector('.card__like-count');
    const classCheck =  Array.from(likeButton.classList).some(className => className === 'card__like-button_is-active');
    const likeUpdateResult = classCheck ? await dislikeCard(card.id) : await likeCard(card.id);
    cardLikeCount.textContent = likeUpdateResult && likeUpdateResult.likes && Array.isArray(likeUpdateResult.likes) ? likeUpdateResult.likes.length : 0;
    likeButton.classList.toggle('card__like-button_is-active');
}

export {cardCreate, deleteHandler, likeHandler };