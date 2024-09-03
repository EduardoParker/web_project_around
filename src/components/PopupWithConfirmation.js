import Popup from "./popup";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._formElement = this._popupElement.querySelector(".form_delete");
  }

  open(handleDeleteSubmit) {
    super.open();
    this._handleDeleteSubmit = handleDeleteSubmit;
  }
  setEventListener() {
    super.setEventListener();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit();
      this.close();
    });
  }
}
