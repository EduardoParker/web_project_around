import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imageTitlePopup = this._popupElement.querySelector(
      ".popup__container-text"
    );
    this._imageSrcPopup = this._popupElement.querySelector(".popup__image");
  }
  open({ name, link }) {
    this._imageSrcPopup.src = link;
    this._imageTitlePopup.textContent = name;
    this._imageSrcPopup.alt = name;
    super.open();
  }
}
