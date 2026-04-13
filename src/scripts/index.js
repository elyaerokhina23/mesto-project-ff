import "../pages/index.css";
import { createCard, updateCardLikes } from "./components/card.js";
import { openPopup, closePopup, setupModals } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  addCard,
  deleteCard,
  getInitialCards,
  getUserInfo,
  likeCard,
  unlikeCard,
  updateAvatar,
  updateProfile,
} from "./api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

document.addEventListener("DOMContentLoaded", () => {
  const placesList = document.querySelector(".places__list");
  const profilePopup = document.querySelector(".popup_type_edit");
  const newCardPopup = document.querySelector(".popup_type_new-card");
  const avatarPopup = document.querySelector(".popup_type_avatar");
  const confirmPopup = document.querySelector(".popup_type_confirm");
  const imagePopup = document.querySelector(".popup_type_image");

  const profileForm = profilePopup.querySelector(".popup__form");
  const newCardForm = newCardPopup.querySelector(".popup__form");
  const avatarForm = avatarPopup.querySelector(".popup__form");
  const confirmDeleteForm = confirmPopup.querySelector(".popup__form");

  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileImage = document.querySelector(".profile__image");

  const profileNameInput = profileForm.querySelector("#name-input");
  const profileDescriptionInput =
    profileForm.querySelector("#description-input");
  const placeNameInput = newCardForm.querySelector("#title-input");
  const placeLinkInput = newCardForm.querySelector("#url-input");
  const avatarInput = avatarForm.querySelector("#avatar-input");

  const profileEditButton = document.querySelector(".profile__edit-button");
  const addCardButton = document.querySelector(".profile__add-button");
  const avatarEditButton = document.querySelector(".profile__image");

  const imagePopupImage = imagePopup.querySelector(".popup__image");
  const imagePopupCaption = imagePopup.querySelector(".popup__caption");

  let currentUserId = "";
  let cardToDelete = null;

  enableValidation(validationConfig);

  function setLoadingState(button, isLoading) {
    button.textContent = isLoading ? "Сохранение..." : "Сохранить";
  }

  function setProfileData(userData) {
    currentUserId = userData._id;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
  }

  function openImagePopup(link, name) {
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    imagePopupCaption.textContent = name;
    openPopup(imagePopup);
  }

  function handleDeleteClick(cardData, cardElement) {
    cardToDelete = { cardId: cardData._id, cardElement };
    openPopup(confirmPopup);
  }

  function handleLikeClick(cardData, likeButton, likeCountElement) {
    const isLiked = cardData.likes.some((like) => like._id === currentUserId);
    const likeRequest = isLiked
      ? unlikeCard(cardData._id)
      : likeCard(cardData._id);

    likeRequest
      .then((updatedCard) => {
        cardData.likes = updatedCard.likes;
        updateCardLikes(
          likeButton,
          likeCountElement,
          updatedCard.likes,
          currentUserId,
        );
      })
      .catch(console.error);
  }

  function renderCard(cardData, method = "append") {
    // Проверьте, что вы передаете все нужные обработчики (лайк, удаление, клик по фото)
    const cardElement = createCard(
      cardData,
      currentUserId,
      handleDeleteClick,
      handleLikeClick,
      openImagePopup, // эта функция открывает попап с большой картинкой
    );

    // Метод append добавляет в конец (для начальных), prepend — в начало (для новых)
    placesList[method](cardElement);
  }

  Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cards]) => {
      setProfileData(userData); // Установка имени и аватара (это у вас работает)

      // Отрисовка карточек
      cards.forEach((card) => {
        renderCard(card); // Если здесь пусто, карточки не появятся
      });
    })
    .catch((err) => {
      console.log("Ошибка загрузки данных:", err);
    });

  profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    setLoadingState(evt.submitter, true);
    updateProfile({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
      .then((userData) => {
        setProfileData(userData);
        closePopup(profilePopup);
      })
      .catch(console.error)
      .finally(() => setLoadingState(evt.submitter, false));
  });

  newCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    setLoadingState(evt.submitter, true);
    addCard({ name: placeNameInput.value, link: placeLinkInput.value })
      .then((cardData) => {
        renderCard(cardData, "prepend");
        newCardForm.reset();
        clearValidation(newCardForm, validationConfig);
        closePopup(newCardPopup);
      })
      .catch(console.error)
      .finally(() => setLoadingState(evt.submitter, false));
  });

  avatarForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    setLoadingState(evt.submitter, true);
    updateAvatar(avatarInput.value)
      .then((userData) => {
        setProfileData(userData);
        avatarForm.reset();
        clearValidation(avatarForm, validationConfig);
        closePopup(avatarPopup);
      })
      .catch(console.error)
      .finally(() => setLoadingState(evt.submitter, false));
  });

  confirmDeleteForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (!cardToDelete) return;
    deleteCard(cardToDelete.cardId)
      .then(() => {
        cardToDelete.cardElement.remove();
        closePopup(confirmPopup);
      })
      .catch(console.error);
  });

  profileEditButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openPopup(profilePopup);
  });

  addCardButton.addEventListener("click", () => openPopup(newCardPopup));
  avatarEditButton.addEventListener("click", () => openPopup(avatarPopup));

  setupModals();
});
