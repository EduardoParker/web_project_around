import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
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
  popupConfirmation,
  avatarButton,
  popupAvatar,
  avatarInput,
  profileAvatar,
} from "../utils/Utils.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/popup.js";

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

//apartado para la instancia de Section
const cardListSelector = ".elements";

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".template", {
        handleCardClick: (link, title) =>
          popupZoom.open({
            link: link,
            title: title,
          }),
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardListSelector
);

cardList.renderItems();

const formValidatorProfile = new FormValidator(formConfig, ".popup_profile");
formValidatorProfile.enableValidation();
const formValidatorCard = new FormValidator(formConfig, ".popup_form-image");
formValidatorCard.enableValidation();

const formValidatorAvatar = new FormValidator(formConfig, ".popup_avatar");
formValidatorAvatar.enableValidation();

const elementArea = document.querySelector(".elements");

//seccion para la instancia del zoom image
const popupZoom = new PopupWithImage({ popupSelector: popupImage });
popupZoom.setEventListener();

// seccion para la instancia del popup with form -- form image
const addCardForm = new PopupWithForm({
  popupSelector: formImage,
  handleFormSubmit: (formData) => {
    if (formData.title !== "" && formData.link !== "") {
      const newCardImage = new Card(
        {
          title: formData.title,
          link: formData.link,
        },
        ".template",
        {
          handleCardClick: (link, title) =>
            popupZoom.open({
              link: link,
              title: title,
            }),
        }
      );
      const newCardElement = newCardImage.generateCard();
      elementArea.prepend(newCardElement);
    }
  },
});
imageAddButton.addEventListener("click", () => {
  addCardForm.open();
});
addCardForm.setEventListener();

// seccion para la instancia del popup with form -- form profile

const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileJob,
});

const editProfile = new PopupWithForm({
  popupSelector: popup,
  handleFormSubmit: (inputValues) => {
    if (inputValues.name !== "" && inputValues.about !== "") {
      profileName.textContent = inputValues.name;
      profileJob.textContent = inputValues.about;
      editProfile.close();
    }
  },
});

profileButton.addEventListener("click", () => {
  editProfile.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
});
editProfile.setEventListener();

// seccion para instanciar el popup de confirmacion

const closePopupConfirmation = new Popup({ popupSelector: popupConfirmation });
closePopupConfirmation.setEventListener();

// seccion pata la instancia del popup avatar
const avatarUpdate = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (inputValue) => {
    if (inputValue.link_avatar !== "") {
      console.log(inputValue.link_avatar);
      profileAvatar.src = inputValue.link_avatar;
      avatarUpdate.close();
    }
  },
});

avatarButton.addEventListener("click", () => {
  avatarUpdate.open();
  avatarInput.value = profileAvatar.src;
});
avatarUpdate.setEventListener();
