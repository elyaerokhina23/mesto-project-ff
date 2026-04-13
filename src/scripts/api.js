const config = {
  baseUrl: "https://nomoreparties.co/v1/higher-front-back-dev_cohort_01",
  headers: {
    authorization: "4c85e56b-3e24-4263-bf84-b021ac2238a4",
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.status === 204 ? Promise.resolve() : res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options = {}) {
  return fetch(`${config.baseUrl}${endpoint}`, {
    headers: config.headers,
    ...options,
  }).then(checkResponse);
}

export function getUserInfo() {
  return request("/users/me");
}

export function getInitialCards() {
  return request("/cards");
}

export function updateProfile(profileData) {
  return request("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      name: profileData.name,
      about: profileData.about,
    }),
  });
}

export function addCard(cardData) {
  return request("/cards", {
    method: "POST",
    body: JSON.stringify(cardData),
  });
}

export function deleteCard(cardId) {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
  });
}

export function likeCard(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
  });
}

export function unlikeCard(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
  });
}

export function updateAvatar(avatarLink) {
  return request("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  });
}
