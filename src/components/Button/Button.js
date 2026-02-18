import './Button.scss'
import iconSvg from '@/assets/images/icon-arrow-right.svg?raw'

function createDOM(text, type) {
  const button = document.createElement('button')
  button.type = type
  button.className = 'button'

  const label = document.createElement('span')
  label.className = 'button__label'
  label.textContent = text

  const icon = document.createElement('span')
  icon.className = 'button__icon'
  icon.setAttribute('aria-hidden', 'true')
  icon.innerHTML = iconSvg

  button.append(label, icon)

  return {
    button,
  }
}

export function Button({ text, type }) {
  const dom = createDOM(text, type)

  const clickListeners = new Set()

  function emitClick(button) {
    clickListeners.forEach((fn) => fn(button))
  }

  function bindEvents() {
    dom.button.addEventListener('click', (e) => {
      emitClick(e.target)
    })
  }

  bindEvents()
  return {
    element: dom.button,

    onClick(fn) {
      clickListeners.add(fn)
      return () => clickListeners.delete(fn)
    },
  }
}
