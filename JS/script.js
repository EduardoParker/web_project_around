let popup = document.querySelector(".popup");
let profileButton = document.querySelector(".profile__edit-button");
let profileCloseButton = document.querySelector(".form__close-icon");
let profileSaveButton = document.querySelector(".form__button_submit");

profileButton.addEventListener("click", openProfile);

function openProfile() {
  popup.classList.add("popup_opened");
}

profileCloseButton.addEventListener("click", closeProfile);

function closeProfile() {
  popup.classList.remove("popup_opened");
}

profileSaveButton.addEventListener("click", SaveAndClose);

function SaveAndClose() {
  popup.classList.remove("popup_opened");
}

let formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector("#name").value;
  let jobInput = document.querySelector("#about-me").value;

  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__info-aboutme");

  profileName.textContent = `${nameInput}`;
  profileJob.textContent = `${jobInput}`;
}
formElement.addEventListener("submit", handleProfileFormSubmit, SaveAndClose);
