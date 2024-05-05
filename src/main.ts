import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  IoPlaySharp,
  IoPauseSharp,
  IoPlayForwardSharp,
  IoPlayBackSharp,
  MdRepeatoneSharp
} from 'oh-vue-icons/icons'

addIcons(IoPlaySharp, IoPauseSharp, IoPlayForwardSharp, IoPlayBackSharp, MdRepeatoneSharp)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.mount('#app')
