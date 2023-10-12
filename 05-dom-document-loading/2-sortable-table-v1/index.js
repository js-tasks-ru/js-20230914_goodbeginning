export default class SortableTable {

  /**
   * @param headerConfig - массив с конфигурацией заголовка таблицы
   * @param data - массив с данными таблицы
   */
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.element = this.createElement();
    this.subElements = {
      header: this.element.querySelector('[data-elem="header"]'),
      body: this.element.querySelector('.body')
    };
  }

  /**
   * Создаём шаблон div-а шапки таблицы.
   *
   * @returns {string}
   */
  getHeaderTemplate() {
    return `<div data-elem="header" class="sortable-table__header sortable-table__row">
                ${this.getColonTemplate()}
            </div>`;
  }

  /**
   * Создаёт шаблон div-а колонок таблицы.
   *
   * @returns {string}
   */
  getColonTemplate() {
    return this.headerConfig.map(({id, sortable, title}) => {
      return `<div class="sortable-table__cell" data-sortable="${sortable}" data-name="${id}">
                     <span>${title}</span>
                 </div>`;
    }).join('');
  }

  /**
   * Создаем шаблон ссылки на товар, принимает отсортированный массив с товаром,
   * если не передан берет по умалчанию не сортированный.
   *
   * @param data - массив с товарами
   * @returns {string}
   */
  getProductTemplate(data = this.data) {
    return data
      .map(
        (item) => `
          <a href="/products/${item.id}" class="sortable-table__row">
            ${this.getProductBodyTemplate(item)}
          </a>
      `
      )
      .join("");
  }

  /**
   * Заполняет шаблон даннымы товара в соотвецтвии колонок.
   *
   * @param item - объект товара
   * @returns {*}
   */
  getProductBodyTemplate(item) {
    return this.headerConfig.reduce((result, headerItem) => {
      if (headerItem.template) {
        return result + headerItem.template(item[headerItem.id]);
      }

      return result + `<div class="sortable-table__cell">${item[headerItem.id]}</div>`;
    }, "");
  }

  /**
   * Возвращает шаблон таблицы товаров.
   *
   * @returns {string}
   */
  getTemplate() {
    return `
    <div class="sortable-table">

        ${this.getHeaderTemplate()}
        <div class="body">
            ${this.getProductTemplate()}
        </div>

        <div data-elem="loading" class="loading-line sortable-table__loading-line"></div>

        <div data-elem="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>Нет данных</div>
        </div>
    </div>`;
  }

  /**
   * Создает новый елемент DOM с использованием шаблона.
   *
   * @returns {Element}
   */
  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    return element.firstElementChild;
  }

  /**
   * Сортирует данные таблицы по полю и порядку.
   *
   * @param field - поле для сортировки
   * @param order - порядок сортировки (asc или desc)
   */
  sort(field, order) {
    const sortedData = this.sortData(field, order);
    this.subElements.body.innerHTML = this.getProductTemplate(sortedData);
  }

  /**
   * Сортирует данные таблицы по полю и порядку и возвращает отсортированный массив.
   *
   * @param field - поле для сортировки
   * @param order - порядок сортировки (asc или desc)
   * @returns {Array} - отсортированный массив
   */
  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find(item => item.id === field);
    const {sortType} = column;
    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[order];

    return arr.sort((a, b) => {
      if ('number' === sortType) {
        return direction * (a[field] - b[field]);
      }
      return direction * a[field].localeCompare(b[field], ['ru', 'en']);
    });
  }

  /**
   * Удаляет элемент таблицы.
   */
  remove() {
    this.element.remove();
  }

  /**
   * Удаляет элемент таблицы и очищает интервал, если таковой есть.
   */
  destroy() {
    this.remove();
  }
}
