import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { closePopups } from "./Utils.js";

const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-active",
};
const initialCards = [
  {
    title: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    title: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    title: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    title: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

initialCards.forEach((item) => {
  const card = new Card(item, ".template");
  const cardElement = card.generateCard();
  document.querySelector(".elements").append(cardElement);
});

const formValidatorProfile = new FormValidator(formConfig, ".popup_profile");
formValidatorProfile.enableValidation();
const formValidatorCard = new FormValidator(formConfig, ".popup_form-image");
formValidatorCard.enableValidation();

const elementArea = document.querySelector(".elements");

// seccion para la modificacion del perfil
const formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector("#name").value;
  const jobInput = document.querySelector("#about-me").value;
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__info-aboutme");
  if (nameInput !== "" && jobInput !== "") {
    profileName.textContent = `${nameInput}`;
    profileJob.textContent = `${jobInput}`;
    closePopups();
  }
}
formElement.addEventListener("submit", handleProfileFormSubmit);

// seccion para el formulario de las imagenes

const formImageElement = document.querySelector(".form_image");

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const updatedCard = {
    title: document.querySelector("#title").value,
    link: document.querySelector("#link").value,
  };
  if (updatedCard.title !== "" && updatedCard.link !== "") {
    const card = new Card(updatedCard, ".template");
    const cardElement = card.generateCard();
    elementArea.prepend(cardElement);
    closePopups();
  }
}

formImageElement.addEventListener("submit", handleImageFormSubmit);

//funcion para cerrar los formularios dando clinck en cualquier parte

const popupEventListeners = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("popup")) {
        closePopups();
      }
    });
  });
};
popupEventListeners();
