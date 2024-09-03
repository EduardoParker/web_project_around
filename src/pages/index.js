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
  updateProfile,
  createImage,
  updateAvatar,
} from "../utils/Utils.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/popup.js";
import api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

/*const initialCards = [
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
*/
const userInfo = new UserInfo({
  nameSelector: profileName,
  jobSelector: profileJob,
});

let currentUser = null;
let cardList = null;

api.getInfo().then((user) => {
  currentUser = user;
  userInfo.setUserInfo({ name: user.name, about: user.about });
  profileAvatar.src = user.avatar;
  //apartado para la instancia de Section
  const cardListSelector = ".elements";
  api.getInitialCards().then((cards) => {
    cardList = new Section(
      {
        data: cards,
        renderer: (item) => {
          const card = new Card(item, ".template", currentUser, {
            handleCardClick: (link, name) =>
              popupZoom.open({
                link: link,
                name: name,
              }),
            handleDeleteCard: (cardId, callback) => {
              popupDeleteCard.open(() => {
                api.deleteCard(cardId).then(() => {
                  callback();
                });
              });
            },
            handleAddLike: (cardId) => {
              return api.addCardLike(cardId);
            },
            handleRemoveLike: (cardId) => {
              return api.deleteCardLike(cardId);
            },
          });
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        },
      },
      cardListSelector
    );

    cardList.renderItems();
  });
});

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
    if (formData.name !== "" && formData.link !== "") {
      return api.addNewCard(formData.name, formData.link).then((card) => {
        const newCardImage = new Card(card, ".template", currentUser, {
          handleCardClick: (link, name) =>
            popupZoom.open({
              link: link,
              name: name,
            }),
          handleDeleteCard: (cardId, callback) => {
            popupDeleteCard.open(() => {
              api.deleteCard(cardId).then(() => {
                callback();
              });
            });
          },
          handleAddLike: (cardId) => {
            return api.addCardLike(cardId);
          },
          handleRemoveLike: (cardId) => {
            return api.deleteCardLike(cardId);
          },
        });
        const newCardElement = newCardImage.generateCard();
        elementArea.prepend(newCardElement);
      });
    }
  },
});
imageAddButton.addEventListener("click", () => {
  addCardForm.open();
});
addCardForm.setEventListener();

// seccion para la instancia del popup with form -- form profile

const editProfile = new PopupWithForm({
  popupSelector: popup,
  handleFormSubmit: (inputValues) => {
    if (inputValues.name !== "" && inputValues.about !== "") {
      return api
        .updateProfile(inputValues.name, inputValues.about)
        .then((user) => {
          userInfo.setUserInfo({ name: user.name, about: user.about });
          editProfile.close();
        });
    }
  },
});

profileButton.addEventListener("click", () => {
  editProfile.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
});
editProfile.setEventListener();

// seccion pata la instancia del popup avatar
const avatarUpdate = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (inputValue) => {
    if (inputValue.avatar !== "") {
      return api.updateAvatarProfile(inputValue.avatar).then((user) => {
        profileAvatar.src = inputValue.avatar;
      });
    }
  },
});

avatarButton.addEventListener("click", () => {
  avatarUpdate.open();
  avatarInput.value = profileAvatar.src;
});
avatarUpdate.setEventListener();

//inicializacion de popupconfirmation
const popupDeleteCard = new PopupWithConfirmation({
  popupSelector: popupConfirmation,
});
popupDeleteCard.setEventListener();
