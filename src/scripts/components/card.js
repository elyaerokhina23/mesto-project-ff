export function createCard(
  cardData,
  currentUserId,
  handleDeleteClick,
  handleLikeClick,
  handleImageClick,
) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".places__item");
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  renderLikeState(cardData, currentUserId, likeButton, likeCount);

  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = "none";
  }

  cardImage.addEventListener("click", () =>
    handleImageClick(cardData.link, cardData.name),
  );

  likeButton.addEventListener("click", () =>
    handleLikeClick(cardData, likeButton, likeCount),
  );

  deleteButton.addEventListener("click", () =>
    handleDeleteClick(cardData, cardElement),
  );

  return cardElement;
}

function renderLikeState(
  cardData,
  currentUserId,
  likeButton,
  likeCountElement,
) {
  likeCountElement.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((user) => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

export function updateCardLikes(
  likeButton,
  likeCountElement,
  likes,
  currentUserId,
) {
  renderLikeState({ likes }, currentUserId, likeButton, likeCountElement);
}

export function removeCardElement(cardElement) {
  cardElement.remove();
}
