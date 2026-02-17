import './Slider.scss'
import vars from './Slider.vars.module.scss'

function createDOM(text, min, max) {
  const container = document.createElement('div')
  container.className = 'slider'

  const header = document.createElement('div')
  header.className = 'slider__header'

  const label = document.createElement('label')
  label.textContent = text

  const output = document.createElement('output')

  const inputWrapper = document.createElement('div')
  inputWrapper.className = 'slider__range'

  const input = document.createElement('input')
  input.type = 'range'
  input.min = min
  input.max = max

  header.append(label, output)
  inputWrapper.append(input)
  container.append(header, inputWrapper)

  return {
    container,
    input,
    output,
  }
}

export function Slider({ text, min, max }) {
  const dom = createDOM(text, min, max)

  function render(value) {
    if (dom.input.value != value) {
      dom.input.value = value
    }

    const percent = ((value - min) / (max - min)) * 100

    dom.input.style.background = `linear-gradient(
      to right,
      ${vars.sliderColor} 0%,
      ${vars.sliderColor} ${percent}%,
      ${vars.sliderTrack} ${percent}%,
      ${vars.sliderTrack} 100%
    )`

    dom.output.textContent = value
  }

  const changeListeners = new Set()

  function emitChange(value) {
    changeListeners.forEach((fn) => fn(value))
  }

  function bindEvents() {
    dom.input.addEventListener('input', (e) => {
      emitChange(Number(e.target.value))
    })
  }

  bindEvents()

  return {
    element: dom.container,

    update(value) {
      render(value)
    },

    onChange(fn) {
      changeListeners.add(fn)
      return () => changeListeners.delete(fn)
    },
  }
}
