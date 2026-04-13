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
  likeCount.textContent = cardData.likes.length;

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

export function updateCardLikes(
  likeButton,
  likeCountElement,
  likes,
  currentUserId,
) {
  likeCountElement.textContent = likes.length;
  if (likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add("place__like-button_active");
  } else {
    likeButton.classList.remove("place__like-button_active");
  }
}
