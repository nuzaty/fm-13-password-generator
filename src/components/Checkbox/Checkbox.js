import './Checkbox.scss'
import checkIcon from '@/assets/images/icon-check.svg'

function createDOM(id, value, text) {
  const wrapper = document.createElement('label')
  wrapper.className = 'checkbox'

  const input = document.createElement('input')
  input.type = 'checkbox'
  input.className = 'checkbox__input'
  input.id = id
  input.value = value

  const icon = document.createElement('span')
  icon.className = 'checkbox__icon'
  icon.setAttribute('aria-hidden', 'true')

  const iconImg = document.createElement('img')
  iconImg.src = checkIcon
  iconImg.alt = ''
  iconImg.draggable = false

  const label = document.createElement('span')
  label.className = 'checkbox__label'
  label.textContent = text

  icon.append(iconImg)
  wrapper.append(input, icon, label)

  return {
    wrapper,
    input,
  }
}

export function Checkbox({ id, value, text }) {
  const dom = createDOM(id, value, text)

  const changeListeners = new Set()

  function emitChange(checked) {
    changeListeners.forEach((fn) => fn(checked))
  }

  function bindEvents() {
    dom.input.addEventListener('change', (e) => {
      emitChange(Boolean(e.target.checked))
    })
  }

  bindEvents()

  return {
    element: dom.wrapper,

    onChange(fn) {
      changeListeners.add(fn)
      return () => changeListeners.delete(fn)
    },

    setChecked(checked) {
      if (dom.input.checked !== checked) {
        dom.input.checked = checked
      }
    },
  }
}
