export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
  }
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  setEventListener() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
