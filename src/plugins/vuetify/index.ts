import { createVuetify } from 'vuetify'
import defaults from './defaults'
import aliases from './aliases'
import { icons } from './icons'
import theme from './theme'

// Styles
import '@core/scss/libs/vuetify/index.scss'
import 'vuetify/styles'

export default createVuetify({
  aliases,
  defaults,
  icons,
  theme,
})
