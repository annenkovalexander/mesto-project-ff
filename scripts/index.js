
// @todo: Темплейт карточки


// @todo: DOM узлы

// @todo: Функция создания карточки

const cardCreate = (card, deleteHandler) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardPlacesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardPlacesItem.querySelector('.card__image');
    const cardButton = cardPlacesItem.querySelector('.card__delete-button');
    const cardTitle = cardPlacesItem.querySelector('.card__title');
    cardButton.onclick = () => deleteHandler(card.name);
    cardImage.src = card.link || "";
    cardImage.alt = card.name || "";
    cardTitle.textContent = card.name || "";
    return cardPlacesItem;
}

// @todo: Функция удаления карточки

const deleteHandler = (item) => {
    const cardsList = document.querySelector('.places__list').children;
    for (let i = 0; i<cardsList.length; i++){
        const cardElement = cardsList[i];
        const cardImage = cardElement.querySelector('.card__image');
        if (cardImage.alt === item){
            cardElement.remove();
            break;
        }
    }
}

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');
initialCards.forEach(card => {
    placesList.append(cardCreate(card, deleteHandler));
});
