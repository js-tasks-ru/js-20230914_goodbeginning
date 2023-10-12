export default class NotificationMessage {
  static active;

  constructor(text = '', data = {}) {
    const {duration, type} = data;
    this.text = text;
    this.duration = duration;
    this.type = type;

    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('notification');
    element.innerHTML = this.createTemplate();
    return element.firstElementChild;
  }

  createTemplate() {
    return `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.text}
      </div>
    </div>
  </div>`;
  }

  show(target = document.body) {
    if (NotificationMessage.active) {
      NotificationMessage.active.destroy();
    }
    NotificationMessage.active = this;

    target.append(this.element);
    this.timeoutId = setTimeout(() => this.destroy(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
    this.remove();
  }
}
