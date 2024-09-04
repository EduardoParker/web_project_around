const popupImageCloseButton = document.querySelector("#close-button-image");
const imageTitlePopup = document.querySelector(".popup__container-text");
const imageSrcPopup = document.querySelector(".popup__image");

export default class Card {
  constructor(
    data,
    cardSelector,
    user,
    { handleCardClick, handleDeleteCard, handleAddLike, handleRemoveLike }
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._user = user;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
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
      this._name;
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    const trashButton = this._element.querySelector(".element__trash");
    const likeButton = this._element.querySelector(".element__like");
    if (this._user._id !== this._data.owner._id) {
      trashButton.remove();
    }
    if (this._data.likes.some((like) => like._id === this._user._id)) {
      likeButton.classList.add("element__like_active");
    }
    const counter = this._element.querySelector(".element__like-counter");
    counter.textContent = this._data.likes.length;
    return this._element;
  }
  _handleLikeEvent(evt) {
    if (this._data.likes.some((like) => like._id === this._user._id)) {
      this._handleRemoveLike(this._data._id).then((card) => {
        const counter = this._element.querySelector(".element__like-counter");
        this._data = card;
        evt.target.classList.remove("element__like_active");
        counter.textContent = this._data.likes.length;
      });
    } else {
      this._handleAddLike(this._data._id).then((card) => {
        const counter = this._element.querySelector(".element__like-counter");
        this._data = card;
        evt.target.classList.add("element__like_active");
        counter.textContent = this._data.likes.length;
      });
    }
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
        this._handleCardClick(this._link, this._name);
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
        //this._handleTrashButton(evt);
        this._handleDeleteCard(this._data._id, () => {
          this._element.remove();
        });
      });
  }
}
