import './Strength.scss'

function createDOM() {
  const container = document.createElement('div')
  container.className = 'strength'
  container.setAttribute('role', 'status')
  container.setAttribute('aria-live', 'polite')

  const label = document.createElement('span')
  label.className = 'strength__label'
  label.textContent = 'strength'

  const meter = document.createElement('div')
  meter.className = 'strength__meter'

  const text = document.createElement('span')
  text.className = 'strength__text'

  const barContainer = document.createElement('div')
  barContainer.className = 'strength__bar-container'
  barContainer.setAttribute('aria-hidden', 'true')

  const bars = Array.from({ length: 4 }, () => {
    const el = document.createElement('span')
    el.className = 'strength__bar'
    return el
  })

  barContainer.append(...bars)
  meter.append(text, barContainer)
  container.append(label, meter)

  return {
    container,
    bars,
    text,
  }
}

export const STRENGTH = {
  NONE: 0,
  TOO_WEAK: 1,
  WEAK: 2,
  MEDIUM: 3,
  STRONG: 4,
}

const CLASS_BY_STRENGTH = {
  [STRENGTH.NONE]: '',
  [STRENGTH.TOO_WEAK]: 'strength--too-weak',
  [STRENGTH.WEAK]: 'strength--weak',
  [STRENGTH.MEDIUM]: 'strength--medium',
  [STRENGTH.STRONG]: 'strength--strong',
}

const TEXT_BY_STRENGTH = {
  [STRENGTH.NONE]: '',
  [STRENGTH.TOO_WEAK]: 'too weak!',
  [STRENGTH.WEAK]: 'weak',
  [STRENGTH.MEDIUM]: 'medium',
  [STRENGTH.STRONG]: 'strong',
}

export function Strength() {
  const dom = createDOM()

  function render(strengthLevel) {
    const className = CLASS_BY_STRENGTH[strengthLevel] ?? ''
    dom.container.className = `strength ${className}`
    dom.text.textContent = TEXT_BY_STRENGTH[strengthLevel] ?? ''
  }

  return {
    element: dom.container,

    update(strengthLevel) {
      render(strengthLevel)
    },
  }
}
