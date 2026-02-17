import { Slider } from './components/Slider'

export function App() {
  const container = document.createElement('div')
  container.className = 'app'

  const title = document.createElement('h1')
  title.textContent = 'Simple Component App'

  container.append(title, new Slider({ text: 'Character Length' }))

  return container
}
