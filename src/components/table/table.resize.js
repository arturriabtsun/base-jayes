import { $ } from '@core/DOM'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type=resizable]')
  const parentCoords = $parent.getCoords()
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value
  $resizer.css({
    opacity: 1,
    zIndex: 1000,
    [sideProp]: '-5000px',
  })
  document.onmousemove = (e) => {
    if (type === 'col') {
      const diff = e.pageX - parentCoords.right
      value = parentCoords.width + diff
      $resizer.css({ right: -diff + 'px' })
    } else {
      const diff = e.pageY - parentCoords.bottom
      value = parentCoords.height + diff
      $resizer.css({ bottom: -diff + 'px' })
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({ width: value + 'px' })
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => (el.style.width = value + 'px'))
    } else {
      $parent.css({ height: value + 'px' })
    }
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    })
  }
}
