const popup = document.querySelector(".popup__profile");
const profileButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".form__close-icon_profile");
const profileSaveButton = document.querySelector(".form__button_submit");
const imageAddButton = document.querySelector(".profile__add-button");
const formImage = document.querySelector(".popup__form-image");
const formImageCloseButton = document.querySelector(
  ".form__close-icon_form-image"
);
const templateNode = document.querySelector(".template");
const elementArea = document.querySelector(".elements");
const imageSaveButton = document.querySelector(".form__button_submit_image");

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

// para agregar dinamicamente las imagenes
initialCards.forEach(function (item) {
  const newNode = templateNode.content
    .querySelector(".element")
    .cloneNode(true);
  newNode.querySelector(".element__image").src = item.link;
  newNode.querySelector(".element__description").textContent = item.name;
  elementArea.append(newNode);
});

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

// seccion para la modificacion del perfil
const formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#about-me").value;

  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__info-aboutme");

  profileName.textContent = `${nameInput}`;
  profileJob.textContent = `${jobInput}`;
  formElement.reset();
}
formElement.addEventListener("submit", handleProfileFormSubmit, SaveAndClose);

// apartado para el popup imagenes
imageAddButton.addEventListener("click", openImageForm);

function openImageForm() {
  formImage.classList.add("popup_opened");
}

formImageCloseButton.addEventListener("click", closeImageForm);

function closeImageForm() {
  formImage.classList.remove("popup_opened");
}
// seccion para la modificacion de las imagenes
imageSaveButton.addEventListener("click", imageSaveAndClose);

function imageSaveAndClose() {
  formImage.classList.remove("popup_opened");
}

const formImageElement = document.querySelector(".form__image");

function handleImageFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title").value;
  const linkInput = document.querySelector("#url").value;
  const newNode = templateNode.content
    .querySelector(".element")
    .cloneNode(true);

  newNode.querySelector(".element__description").textContent = titleInput;
  newNode.querySelector(".element__image").src = linkInput;
  elementArea.prepend(newNode);
  formImageElement.reset();
}

formImageElement.addEventListener(
  "submit",
  handleImageFormSubmit,
  imageSaveAndClose
);
