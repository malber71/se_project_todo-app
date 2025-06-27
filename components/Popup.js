class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
    this._popupEscClose = this._handleEscapeClose.bind(this);
  }

  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(evt) {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target === this._popupElement ||
        evt.target === this._popupCloseBtn
      ) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._popupEscClose);
  }
  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._popupEscClose);
  }
}

export default Popup;
