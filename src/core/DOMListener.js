import { capitalize } from '@core/utils'

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('$root was not provided')
    }
    this.$root = $root
    this.listeners = listeners
  }
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name} Component`)
      }
      this[method] = this[method].bind(this) // bind will return new function so we just need to reasign this[method] and later we can easily delete litener by the same function refference
      this.$root.on(listener, this[method])
    })
  }
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
