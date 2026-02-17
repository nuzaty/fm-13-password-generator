import './Slider.scss'
import vars from './Slider.vars.module.scss'

function createDOM(text) {
  const container = document.createElement('section')
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
  input.min = 0
  input.max = 20

  header.append(label, output)
  inputWrapper.append(input)
  container.append(header, inputWrapper)

  return {
    container,
    input,
    output,
  }
}

export function Slider({ text }) {
  const dom = createDOM(text)

  let state = {
    min: 0,
    max: 20,
    value: 10,
  }

  function render() {
    const { min, max, value } = state

    const percent = ((value - min) / (max - min)) * 100

    dom.input.style.background = `linear-gradient(
      to right,
      ${vars.sliderColor} 0%,
      ${vars.sliderColor} ${percent}%,
      ${vars.sliderTrack} ${percent}%,
      ${vars.sliderTrack} 100%
    )`

    dom.output.textContent = state.value
    dom.input.value = state.value
  }

  function setState(patch) {
    state = { ...state, ...patch }
    render()
  }

  function bindEvents() {
    dom.input.addEventListener('input', () => {
      setState({ value: Number(dom.input.value) })
    })
  }

  bindEvents()
  render()

  return dom.container
}
