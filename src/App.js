import { Slider } from '@/components/Slider'
import { TextField } from '@/components/TextField'
import { generatePassword, getPasswordStrength } from './utils/password'
import { Checkbox } from './components/Checkbox'
import { Strength } from './components/Strength'
import { Button } from './components/Button'

function createDOM() {
  const form = document.createElement('form')
  form.className = 'pwd-gen'

  const title = document.createElement('h1')
  title.className = 'pwd-gen__title'
  title.textContent = 'Password Generator'

  const password = new TextField({
    id: 'gen-result',
    placeholder: 'P4$5W0rD!',
    copyable: true,
  })

  const options = document.createElement('div')
  options.className = 'pwd-gen__options'

  const slider = new Slider({
    id: 'char-length',
    text: 'Character Length',
    min: 0,
    max: 20,
  })

  const charOptions = document.createElement('fieldset')
  charOptions.className = 'pwd-gen__char-options'

  const charOptionsLegend = document.createElement('legend')
  charOptionsLegend.className = 'sr-only'
  charOptionsLegend.textContent = 'Password Character Options'

  const uppercaseOption = new Checkbox({
    id: 'uppercase-checkbox',
    value: 'uppercase',
    text: 'Include Uppercase Letters',
  })

  const lowercaseOption = new Checkbox({
    id: 'lowercase-checkbox',
    value: 'lowercase',
    text: 'Include Lowercase Letters',
  })

  const numberOption = new Checkbox({
    id: 'number-checkbox',
    value: 'number',
    text: 'Include Numbers',
  })

  const symbolOption = new Checkbox({
    id: 'symbol-checkbox',
    value: 'symbol',
    text: 'Include Symbols',
  })

  const strength = new Strength()
  const button = new Button({ text: 'Generate', type: 'submit' })

  charOptions.append(
    charOptionsLegend,
    uppercaseOption.element,
    lowercaseOption.element,
    numberOption.element,
    symbolOption.element,
  )
  options.append(slider.element, charOptions, strength.element, button.element)
  form.append(title, password.element, options)

  return {
    form,
    password,
    slider,
    uppercaseOption,
    lowercaseOption,
    numberOption,
    symbolOption,
    strength,
    button,
  }
}

export function App() {
  let state = {
    passwordLength: 0,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  }

  const dom = createDOM()

  function render() {
    generateNewPassword()
    dom.slider.update(state.passwordLength)
  }

  function generateNewPassword() {
    const { passwordLength: length, ...restState } = state
    const newPassword = generatePassword({
      length,
      ...restState,
    })
    dom.password.setText(newPassword)
    const strength = getPasswordStrength(newPassword)
    dom.strength.update(strength)
  }

  function setState(patch) {
    state = { ...state, ...patch }
    render()
  }

  function bindEvents() {
    dom.slider.onChange((v) => {
      setState({ passwordLength: v })
    })

    dom.uppercaseOption.onChange((v) => {
      setState({ uppercase: v })
    })

    dom.lowercaseOption.onChange((v) => {
      setState({ lowercase: v })
    })

    dom.numberOption.onChange((v) => {
      setState({ numbers: v })
    })

    dom.symbolOption.onChange((v) => {
      setState({ symbols: v })
    })

    dom.button.onClick(generateNewPassword)

    dom.form.addEventListener('submit', (e) => {
      e.preventDefault()
      generatePassword()
    })
  }

  bindEvents()
  render()

  return dom.form
}
