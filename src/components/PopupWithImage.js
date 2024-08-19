import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imageTitlePopup = this._popupElement.querySelector(
      ".popup__container-text"
    );
    this._imageSrcPopup = this._popupElement.querySelector(".popup__image");
  }
  open({ link, title }) {
    this._imageSrcPopup.src = link;
    this._imageTitlePopup.textContent = title;
    this._imageSrcPopup.alt = title;
    super.open();
  }
}
