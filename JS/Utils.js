import { popupImage } from "./Card.js";
const popup = document.querySelector(".popup_profile");
const profileButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".form__close-icon_profile");
const imageAddButton = document.querySelector(".profile__add-button");
const formImage = document.querySelector(".popup_form-image");
const formImageCloseButton = document.querySelector(
  ".form__close-icon_form-image"
);

//funcion para cerrar el popups
function closePopups() {
  popup.classList.remove("popup_opened");
  formImage.classList.remove("popup_opened");
  popupImage.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyEscHandler);
}
// apartado para el popup profile

profileButton.addEventListener("click", openProfile);

function openProfile() {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", keyEscHandler);
}

// se cierra formulario para el perfil
profileCloseButton.addEventListener("click", closePopups);

// se abre el formulario para las imagenes
imageAddButton.addEventListener("click", openImageForm);

function openImageForm() {
  formImage.classList.add("popup_opened");
  document.addEventListener("keydown", keyEscHandler);
}

//cierre del formulario de las imagenes
formImageCloseButton.addEventListener("click", closePopups);

//funcion para cerrar los formularios dando click en cualquier parte

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

//apartado para el cierre de popup con esc

document.addEventListener("keydown", keyEscHandler);

function keyEscHandler(evt) {
  if (evt.key === "Escape") {
    closePopups();
  }
}

export { closePopups };
