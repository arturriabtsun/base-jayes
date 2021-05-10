import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubcribers = []
    this.prepare()
  }
  // setup component before init
  prepare() {}
  // return components template
  toHTML() {
    return ''
  }
  // notify listeners
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubcribers.push(unsub)
  }
  // initialize component
  // add dom listeners
  init() {
    this.initDOMListeners()
  }
  // delete component
  // remove listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubcribers.forEach((unsub) => unsub())
  }
}
