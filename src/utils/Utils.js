const popup = document.querySelector(".popup_profile");
const profileButton = document.querySelector(".profile__edit-button");
const imageAddButton = document.querySelector(".profile__add-button");
const formImage = document.querySelector(".popup_form-image");

//popup image
const popupImage = document.querySelector(".popup_zoom");

//user info
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__info-aboutme");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");

//formValidator
const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-active",
};

export {
  profileButton,
  imageAddButton,
  popupImage,
  formImage,
  profileName,
  profileJob,
  popup,
  nameInput,
  jobInput,
  formConfig,
};
