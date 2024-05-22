import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import './styles/index.css'

import { App } from './App'
import { setLocale } from './i18n'
import { Locale } from './types'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

setLocale(Locale.en)

Sentry.init({
  dsn: 'https://8f0bc157f1bc434162e702a175451829@sentry.firefly.land/7',
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
})

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
