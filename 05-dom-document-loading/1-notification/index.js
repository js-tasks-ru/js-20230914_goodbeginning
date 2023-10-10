export default class NotificationMessage {
  constructor(text = '', data = {}) {
    const {duration, type} = data;
    this.text = text;
    this.duration = duration;
    this.type = type;

    this.element = this.getTemplate();
  }

  getTemplate() {
    const element = document.createElement('div');
    element.classList.add('notification');
    element.innerHTML = `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.text}
      </div>
    </div>
  </div>`;
    return element.firstElementChild;
  }

  show(target = document.body) {
    target.append(this.element);
    setTimeout(() => this.destroy(), this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
