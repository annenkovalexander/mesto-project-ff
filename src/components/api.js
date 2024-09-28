import { resultCheck } from "./utils";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
        authorization: '40c6a7fb-a996-4c45-aa96-4765b718300e',
        'Content-Type': 'application/json'
    }
  }


const resultGet = res => {
    if (resultCheck(res)) {
      return res.json();
    } else {
      Promise.reject('Возникла ошибка!');
    }
}

const getCardsData = () => {
    return fetch(`${config.baseUrl}/cards`, 
        {
            headers: config.headers
        })
        .then(resultGet);
    }

const userDataGet = () => {
    return fetch(`${config.baseUrl}/users/me`, 
        {
            headers: config.headers
        })
        .then(resultGet);
}

export const getInitialData = () => Promise.all([getCardsData(), userDataGet()]);

export const updateUserProfileData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '40c6a7fb-a996-4c45-aa96-4765b718300e',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(resultGet);
}

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(resultGet);
}

export const getCardLikesData = cardId => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'GET',
        headers: config.headers
    }).then(resultGet);
}

export const deleteCard = cardId => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(resultGet);
}

export const likeCard = cardId => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers 
      }).then(resultGet);
}

export const dislikeCard = cardId => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(resultGet);
}

export const submitNewProfileAvatar = form => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: form['avatar-link'].value || ""
        })
    }).then(resultGet);
}

