import { copyInputText } from '@/utils/input'
import './TextField.scss'
import iconSvg from '@/assets/images/icon-copy.svg?raw'

function createDOM(id, placeholder, copyable) {
  const container = document.createElement('div')
  container.className = 'text-field'

  if (copyable) {
    container.classList.add('text-field--copyable')
  }

  const input = document.createElement('input')
  input.id = id
  input.placeholder = placeholder
  input.type = 'text'
  input.readOnly = true

  const copyContainer = document.createElement('div')
  copyContainer.className = 'text-field__copy'

  const copyNotice = document.createElement('span')
  copyNotice.className = 'text-field__copy-notice'
  copyNotice.textContent = 'copied'

  const iconBtn = document.createElement('button')
  iconBtn.type = 'button'
  iconBtn.innerHTML = iconSvg

  copyContainer.append(copyNotice, iconBtn)
  container.append(input, copyContainer)

  return {
    container,
    iconBtn,
    input,
    copyNotice,
  }
}

const toText = (v) => (v === null || v === undefined ? null : String(v))
const VISIBLE_CLASS = 'is-visible'

export function TextField({ id, placeholder, copyable }) {
  let state = {
    text: null,
  }

  const dom = createDOM(id, placeholder, copyable)

  function render() {
    dom.input.value = state.text

    if (state.text) {
      dom.iconBtn.disabled = false
    } else {
      dom.iconBtn.disabled = true
    }
  }

  function bindEvents() {
    dom.iconBtn.addEventListener('click', async () => {
      await copyInputText(dom.input)
      dom.copyNotice.classList.add(VISIBLE_CLASS)
    })
  }

  function setState(patch) {
    const prev = state

    state = { ...state, ...patch }

    if (prev.text !== state.text) {
      dom.copyNotice.classList.remove(VISIBLE_CLASS)
    }

    render()
  }

  bindEvents()
  render()

  return {
    element: dom.container,

    setText(value) {
      setState({ text: toText(value) })
    },

    onClick(fn) {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
  }
}
