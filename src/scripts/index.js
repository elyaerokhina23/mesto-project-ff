import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, handleLike } from "./components/card.js";
import { openPopup, closePopup, setupModals } from "./components/modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const placesList = document.querySelector(".places__list");
  const buttonEdit = document.querySelector(".profile__edit-button");
  const buttonAdd = document.querySelector(".profile__add-button");
  const popupEdit = document.querySelector(".popup_type_edit");
  const popupAdd = document.querySelector(".popup_type_new-card");
  const popupImage = document.querySelector(".popup_type_image");
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const editForm = popupEdit.querySelector(".popup__form");
  const addForm = popupAdd.querySelector(".popup__form");
  const nameInput = editForm.querySelector(".popup__input_type_name");
  const descInput = editForm.querySelector(".popup__input_type_description");
  const popupImageElement = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");

  function handleImageClick(link, name) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaption.textContent = name;
    openPopup(popupImage);
  }

  function renderCard(cardData, method = "append") {
    const cardElement = createCard(cardData, handleLike, handleImageClick);
    placesList[method](cardElement);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descInput.value;
    closePopup(popupEdit);
  }

  initialCards.forEach((card) => renderCard(card));

  buttonEdit.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    descInput.value = profileDescription.textContent;
    openPopup(popupEdit);
  });

  buttonAdd.addEventListener("click", () => {
    addForm.reset();
    openPopup(popupAdd);
  });

  editForm.addEventListener("submit", handleFormSubmit);

  addForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const placeName = addForm.querySelector(
      ".popup__input_type_card-name",
    ).value;
    const placeLink = addForm.querySelector(".popup__input_type_url").value;
    renderCard({ name: placeName, link: placeLink }, "prepend");
    addForm.reset();
    closePopup(popupAdd);
  });

  setupModals();
});
