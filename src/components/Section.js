import Card from "./Card.js"

export default class Section {
  constructor(containerSelector, { renderer }) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  // рендерю список элементов
  renderItems(initialCards) {
    initialCards.forEach(item => {
      this.addItem(item);
    });
  }

  // добавляю элемент в конец контейнера
  addItem(item) {
    const card = this._renderer(item);
    this._containerElement.prepend(card);
  }
}
