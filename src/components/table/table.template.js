const CODES = {
  A: 65,
  Z: 90,
}
function toCell(rowIndex) {
  return function (_, colIndex) {
    return `
    <div class="cell" contenteditable="true" data-col="${colIndex}" data-type="cell" data-id="${rowIndex}:${colIndex}"></div>
    `
  }
}
function toCol(col, index) {
  return `
  <div class="column" data-type="resizable" data-col="${index}">${col}
  <div class="col-resize" data-resize="col"></div></div>
  `
}
function createRow(content, number = '') {
  const resizer = number ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
  <div class="row" data-type="resizable">
    <div class="row-info">${number}${resizer}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}
export function createTable(rowsCount = 100) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount).fill('').map(toChar).map(toCol).join('')
  rows.push(createRow(cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(row)).join('')
    rows.push(createRow(cells, row + 1))
  }
  return rows.join('')
}
