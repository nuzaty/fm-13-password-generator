import './Slider.scss'
import vars from './Slider.vars.module.scss'

export function Slider({ text }) {
  const container = document.createElement('section')
  container.className = 'slider'

  /* header */

  const header = document.createElement('div')
  header.className = 'slider__header'

  const label = document.createElement('label')
  label.textContent = text

  const output = document.createElement('output')
  output.textContent = 10 //TODO

  header.append(label, output)

  /* range input */

  const inputWrapper = document.createElement('div')
  inputWrapper.className = 'slider__range'

  const input = document.createElement('input')
  input.type = 'range'
  input.min = 0
  input.max = 20
  input.value = 10

  const updateSlider = () => {
    const percent = ((input.value - input.min) / (input.max - input.min)) * 100

    // Update gradient: filled color up to percent, then unfilled color
    const gradient = `
      linear-gradient(
        to right,
        ${vars.sliderColor} 0%,
        ${vars.sliderColor} ${percent}%,
        ${vars.sliderTrack} ${percent}%,
        ${vars.sliderTrack} 100%
      )
    `
    input.style.background = gradient
  }

  input.addEventListener('input', updateSlider)

  inputWrapper.append(input)

  /*  */

  function render() {
    updateSlider()
  }

  container.append(header, inputWrapper)

  render()
  return container
}
