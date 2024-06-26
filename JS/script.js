const popup = document.querySelector(".popup");
const profileButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".form__close-icon");
const profileSaveButton = document.querySelector(".form__button_submit");
const imageAddButton = document.querySelector(".profile__add-button");
const formImage = document.querySelector("#form-image");

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// apartado para el popup profile
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

// apartado para el popup imagenes
imageAddButton.addEventListener("click", openImageForm);

function openImageForm() {
  formImage.classList.add("popup_opened-form");
}

profileCloseButton.addEventListener("click", closeImageForm);

function closeImageForm() {
  formImage.classList.remove("popup_opened-form");
}
