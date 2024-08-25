
// @todo: Темплейт карточки


// @todo: DOM узлы

// @todo: Функция создания карточки

const cardCreate = (card, deleteHandler) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardPlacesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardPlacesItem.querySelector('.card__image');
    const cardDeleteButton = cardPlacesItem.querySelector('.card__delete-button');
    const cardTitle = cardPlacesItem.querySelector('.card__title');
    cardDeleteButton.addEventListener('click', () => deleteHandler(cardPlacesItem));
    cardImage.src = card.link || "";
    cardImage.alt = "Mesto " + card.name || "";
    cardTitle.textContent = card.name || "";
    return cardPlacesItem;
}

// @todo: Функция удаления карточки

const deleteHandler = card => card.remove();

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach(card => {
    placesList.append(cardCreate(card, deleteHandler));
});
