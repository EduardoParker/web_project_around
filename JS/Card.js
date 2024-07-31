const popupImage = document.querySelector(".popup_zoom");
const popupImageCloseButton = document.querySelector(".popup__close-button");
const imageTitlePopup = document.querySelector(".popup__container-text");
const imageSrcPopup = document.querySelector(".popup__image");

export default class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
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
  _handleOpenPopup() {
    imageSrcPopup.src = this._link;
    imageTitlePopup.textContent = this._title;
    imageSrcPopup.alt = this._title;
    popupImage.classList.add("popup_opened");
    document.removeEventListener("keydown", (evt) => {
      this._handleEscKey(evt);
    });
  }
  _handleClosePopup() {
    imageSrcPopup.src = "";
    popupImage.classList.remove("popup_opened");
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
    // listener en la imagen para abrir el popup
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
    // listener para el cierre del popup
    popupImageCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    });
    // listener para el cierre con ESC
    document.addEventListener("keydown", (evt) => {
      this._handleEscKey(evt);
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

export { popupImage };
