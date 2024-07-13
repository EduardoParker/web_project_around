const popup = document.querySelector(".popup_profile");
const profileButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".form__close-icon_profile");
const profileSaveButton = document.querySelector(".form__button_submit");
const imageAddButton = document.querySelector(".profile__add-button");
const formImage = document.querySelector(".popup_form-image");
const formImageCloseButton = document.querySelector(
  ".form__close-icon_form-image"
);
const templateNode = document.querySelector(".template");
const elementArea = document.querySelector(".elements");
const imageSaveButton = document.querySelector(".form__button_submit_image");
const popupImage = document.querySelector(".popup_zoom"); // se declara el popup de la imagen
const popupImageCloseButton = document.querySelector(".popup__close-button");

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
  const newNode = createCard(item.name, item.link);
  elementArea.append(newNode);
});

// apartado para el popup profile
profileButton.addEventListener("click", openProfile);

function openProfile() {
  popup.classList.add("popup_opened");
}

// se cierra formulario para el perfil
profileCloseButton.addEventListener("click", closeProfile);

function closeProfile() {
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
  if (!((nameInput.value && jobInput.value) === "")) {
    profileName.textContent = `${nameInput}`;
    profileJob.textContent = `${jobInput}`;
    closeProfile();
  }
}
formElement.addEventListener("submit", handleProfileFormSubmit);

// apartado para el popup form - imagenes

// se abre el formulario para las imagenes
imageAddButton.addEventListener("click", openImageForm);

function openImageForm() {
  formImage.classList.add("popup_opened");
}

//cierre del formulario de las imagenes
formImageCloseButton.addEventListener("click", closeImageForm);

function closeImageForm() {
  formImage.classList.remove("popup_opened");
}
// seccion para el formulario de las imagenes

const formImageElement = document.querySelector(".form_image");

function handleImageFormSubmit(evt) {
  evt.preventDefault();

  const titleInput = document.querySelector("#title").value;
  const linkInput = document.querySelector("#url").value;
  const newNode = createCard(titleInput, linkInput);
  elementArea.prepend(newNode);
  closeImageForm();
}

formImageElement.addEventListener("submit", handleImageFormSubmit);

// funcion para la modificacion del template
function createCard(title, url) {
  const imageTitlePopup = document.querySelector(".popup__container-text");
  const imageSrcPopup = document.querySelector(".popup__image");
  const newNode = templateNode.content
    .querySelector(".element")
    .cloneNode(true);

  newNode.querySelector(".element__description").textContent = title;
  newNode.querySelector(".element__image").src = url;
  newNode.querySelector(".element__image").alt = title;
  newNode
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
  newNode
    .querySelector(".element__trash")
    .addEventListener("click", function () {
      newNode.remove();
    });
  //empieza zoom Image
  newNode
    .querySelector(".element__image")
    .addEventListener("click", function (event) {
      popupImage.classList.add("popup_opened");
      imageTitlePopup.textContent = event.currentTarget.alt;
      imageSrcPopup.src = event.currentTarget.src;
      imageSrcPopup.alt = event.currentTarget.alt;
    });
  return newNode;
}

//boton para el cierre del zoom de las imagenes
popupImageCloseButton.addEventListener("click", closeImagePopup);

function closeImagePopup() {
  popupImage.classList.remove("popup_opened");
}

//funcion para cerrar los formularios dando clinck en cualquier parte

const popupEventListeners = () => {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("popup")) {
        closeProfile();
        closeImageForm();
        closeImagePopup();
      }
    });
  });
};
popupEventListeners();

//apartado para el cierre de popup con esc

document.addEventListener("keydown", keyEscHandler);

function keyEscHandler(evt) {
  if (evt.key === "Escape") {
    closeProfile();
    closeImageForm();
    closeImagePopup();
  }
}
