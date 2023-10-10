export default class ColumnChart {
  constructor({data = [], label = '', value = 0, formatHeading = (data) => data, link = ''} = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.formatHeading = formatHeading;
    this.link = link;
    this.chartHeight = 50;

    this.render();
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('column-chart');
    element.innerHTML = `
      <div class="column-chart__title">
        <a href="${this.link}" class="column-chart__link">${this.formatHeading(this.label)}</a>
        <span class="column-chart__value">${this.formatHeading(this.value)}</span>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart"></div>
      </div>
    `;

    if (this.data.length === 0) {
      element.classList.add('column-chart_loading');
    }

    const chartBody = element.querySelector('[data-element="body"]');
    chartBody.style.height = `${this.chartHeight}px`;
    chartBody.innerHTML = this.getColumnChartBody(this.data);

    this.element = element;
  }

  getColumnChartBody(data) {
    const max = Math.max(...this.data);

    return data.map(el => {
      const percent = (el / max * 100).toFixed(0);
      return `<div style="--value: ${Math.floor(el * 50 / max)}" data-tooltip="${percent}%"></div>`;
    }).join('');
  }

  update(newData) {
    this.data = newData;
    const chartBody = this.element.querySelector('[data-element="body"]');
    chartBody.innerHTML = this.getColumnChartBody(this.data);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
