const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
        authorization: '40c6a7fb-a996-4c45-aa96-4765b718300e',
        'Content-Type': 'application/json'
    }
  }


const getCardsData = async () => {
    return fetch(`${config.baseUrl}/cards`, 
        {
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          })
        .then((result) => {
            return result;
        })
        .catch(err => console.log(err));;
    }

const userDataGet = async () => {
    return fetch(`${config.baseUrl}/users/me`, 
        {
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          })
        .then((result) => {
            return result;
        })
        .catch(err => console.log(err));
}

export const getInitialData = () => Promise.all([getCardsData(), userDataGet()]).then(result => ({
    profileData: result[1] || {},
    cardsData: result[0] || {}
}))
.catch(err => console.log(err));

export const updateUserProfileData = async (name, about, modal, validationConfig) => {
    const submitButton = modal.querySelector(validationConfig.submitButtonSelector);
    submitButton.textContent = "Сохранение...";
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
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
      })
    .then(result => {
        submitButton.textContent = "Сохранить";
        return result;
    })
    .catch(err => console.log(err));
}

export const addNewCard = async (name, link, modal, submitForm, validationConfig) => {
    const submitButton = modal.querySelector(validationConfig.submitButtonSelector);
    submitButton.textContent = "Сохранение...";
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
      })
    .then(result => {
        submitButton.textContent = "Сохранить";
        return result;
    })
    .catch(err => console.log(err));;
}

export const getCardLikesData = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'GET',
        headers: config.headers
    }).then(res => {
            if (res.ok) {
              return res.json();
            }
          })
        .then(result => result)
        .catch(err => console.log(err));;
}

export const deleteCard = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            }
          })
          .then(result => result)
          .catch(err => console.log(err));;
}

export const likeCard = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers 
      }).then(res => {
            if (res.ok) {
              return res.json();
            }
          })
        .then(result => result)
        .catch(err => console.log(err));;
}

export const dislikeCard = async (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
      })
    .then(result => result)
    .catch(err => console.log(err));;
}

export const submitNewProfileAvatar = async (form, modal, validationConfig) => {
    const submitButton = modal.querySelector(validationConfig.submitButtonSelector);
    submitButton.textContent = "Сохранение...";
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: form['avatar-link'].value || ""
        })
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
      })
    .then(result => {
        submitButton.textContent = "Сохранить";
        return result
    }).catch(err => console.log(err));;
}

