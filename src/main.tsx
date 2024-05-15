import ReactDOM from 'react-dom/client'
import './styles/index.css'

import { App } from './App'
import { setLocale } from './i18n'
import { Locale } from './types'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

setLocale(Locale.en)

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
