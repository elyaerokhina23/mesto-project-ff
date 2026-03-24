import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, handleLike } from "./components/card.js";
import { openPopup, closePopup, setupModals } from "./components/modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const placesList = document.querySelector(".places__list");

  const profileEditButton = document.querySelector(".profile__edit-button");
  const addCardButton = document.querySelector(".profile__add-button");

  const profilePopup = document.querySelector(".popup_type_edit");
  const newCardPopup = document.querySelector(".popup_type_new-card");
  const imagePopup = document.querySelector(".popup_type_image");

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  const profileForm = profilePopup.querySelector(".popup__form");
  const newCardForm = newCardPopup.querySelector(".popup__form");

  const profileNameInput = profileForm.querySelector(".popup__input_type_name");
  const profileDescriptionInput = profileForm.querySelector(
    ".popup__input_type_description",
  );

  const imagePopupElement = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");

  function handleCardImageClick(link, name) {
    imagePopupElement.src = link;
    imagePopupElement.alt = name;
    imagePopupCaption.textContent = name;
    openPopup(imagePopup);
  }

  function renderCard(cardData, method = "append") {
    const cardElement = createCard(cardData, handleLike, handleCardImageClick);
    placesList[method](cardElement);
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profilePopup);
  }

  initialCards.forEach((card) => renderCard(card));

  profileEditButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(profilePopup);
  });

  addCardButton.addEventListener("click", () => {
    newCardForm.reset();
    openPopup(newCardPopup);
  });

  profileForm.addEventListener("submit", handleProfileFormSubmit);

  newCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const cardName = newCardForm.querySelector(
      ".popup__input_type_card-name",
    ).value;
    const cardLink = newCardForm.querySelector(".popup__input_type_url").value;
    renderCard({ name: cardName, link: cardLink }, "prepend");
    newCardForm.reset();
    closePopup(newCardPopup);
  });

  setupModals();
});
