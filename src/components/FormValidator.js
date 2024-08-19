const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-active",
};

export default class FormValidator {
  constructor(formConfig, formSelector) {
    this._formConfig = formConfig;
    this._formElement = document.querySelector(formSelector);
    this._submitButton = this._formElement.querySelector(
      formConfig.submitButtonSelector
    );
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.add(this._formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formConfig.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(this._formConfig.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._formConfig.errorClass);
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._formConfig.inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(this._formConfig.inactiveButtonClass);
    }
  }
  _setEventListeners() {
    this.inputList = Array.from(
      this._formElement.querySelectorAll(this._formConfig.inputSelector)
    );
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}
