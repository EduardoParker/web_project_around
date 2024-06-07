let popup = document.querySelector(".popup");
let profileButton = document.querySelector(".profile__edit-button");
let profileCloseButton = document.querySelector(".popup__close-icon");

profileButton.addEventListener("click", openProfile);

function openProfile() {
  popup.classList.add("popup_opened");
}

profileCloseButton.addEventListener("click", closeProfile);

function closeProfile() {
  popup.classList.remove("popup_opened");
}
