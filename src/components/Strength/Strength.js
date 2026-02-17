import './Strength.scss'

function createDOM() {
  const container = document.createElement('div')
  container.className = 'strength'

  const label = document.createElement('span')
  label.className = 'strength__label'
  label.textContent = 'strength'

  const text = document.createElement('span')
  text.className = 'strength__text'

  const barContainer = document.createElement('div')
  barContainer.className = 'strength__bar-container'

  const bars = Array.from({ length: 4 }, () => {
    const el = document.createElement('span')
    el.className = 'strength__bar'
    return el
  })

  barContainer.append(...bars)
  container.append(label, text, barContainer)

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

export function Strength() {
  const dom = createDOM()

  function render(strengthLevel) {
    const className = CLASS_BY_STRENGTH[strengthLevel] ?? ''
    dom.container.className = `strength ${className}`
  }

  return {
    element: dom.container,

    update(strengthLevel) {
      render(strengthLevel)
    },
  }
}
