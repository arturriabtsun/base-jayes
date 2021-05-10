import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/DOM'

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options,
    })
  }
  static className = 'excel__formula'
  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable="true" spellcheck="false"></div>
    `
  }
  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text())
    })
    this.$on('table:input', ($cell) => {
      this.$formula.text($cell.text())
    })
  }
  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:enter')
    }
  }
  onClick(event) {
    console.log(event)
  }
}
