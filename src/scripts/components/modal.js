export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closePopup(openedPopup);
  }
}

export function setupModals() {
  const popups = document.querySelectorAll(".popup");

  popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");

    closeButton.addEventListener("click", () => closePopup(popup));
    popup.addEventListener("click", (evt) => {
      if (evt.target === popup) closePopup(popup);
    });
  });
}
