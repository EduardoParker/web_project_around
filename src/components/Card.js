const popupImageCloseButton = document.querySelector("#close-button-image");
const imageTitlePopup = document.querySelector(".popup__container-text");
const imageSrcPopup = document.querySelector(".popup__image");

export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__description").textContent =
      this._title;
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._title;

    return this._element;
  }
  _handleLikeEvent(evt) {
    evt.target.classList.toggle("element__like_active");
  }

  _handleEscKey(evt) {
    if (evt.key === "Escape") {
      this._handleClosePopup();
    }
  }

  _handleTrashButton() {
    this._element.remove();
  }
  _setEventListeners() {
    //listener para las imagenes usando el handleCardClick
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._title);
      });
    //listener para el like
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        this._handleLikeEvent(evt);
      });
    //listener para el trash button
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", (evt) => {
        this._handleTrashButton(evt);
      });
  }
}
