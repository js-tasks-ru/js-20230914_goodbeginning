export default class SortableTable {

  /**
   * @param headerConfig
   * @param data
   */
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.createElement();
  }

  getHeaderTemplate() {
    return `<div data-elem="header" class="sortable-table__header sortable-table__row">
                ${this.getColonTemplate()}
            </div>`;
  }

  getColonTemplate() {
    return this.headerConfig.map(
      ({
         id,
         sortable,
         title
       }) => {
        return `<div class="sortable-table__cell" data-sortable="${sortable}" data-name="${id}">
                     <span>${title}</span>
                 </div>`;
      }
    );
  }

  getProductTemplate() {
    return `<a href="/products/vesy-endever-aurora-559" class="sortable-table__row">
        <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="https://">
        </div>
        <div class="sortable-table__cell">Весы Endever Aurora-559</div>
        <div class="sortable-table__cell">
        <span data-tooltip="
            <div class=&quot;sortable-table-tooltip&quot;>
            <span class=&quot;sortable-table-tooltip__category&quot;>Бытовая техника</span> /
            <b class=&quot;sortable-table-tooltip__subcategory&quot;>Красота и здоровье</b>
            </div>">Красота и здоровье</span>
        </div>
        <div class="sortable-table__cell">36</div>
        <div class="sortable-table__cell">$12</div>
        <div class="sortable-table__cell">19</div>
    </a>`;
  }
  // ${this.getProductTemplate()}
  getTemplate() {
    return `
    <div class="sortable-table">

        ${ this.getHeaderTemplate()}
        <div class="body">

        </div>

        <div data-elem="loading" class="loading-line sortable-table__loading-line"></div>

        <div data-elem="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>Нет данных</div>
        </div>
    </div>`;
  }
  createElement() {
    const element = document.createElement('div');
    // element.classList.add('column-chart');
    element.innerHTML = this.getTemplate();
  }

}

