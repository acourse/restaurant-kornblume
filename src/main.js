import { createApp } from 'vue'
import App from './App.vue'
import './assets/app.css'
import './assets/aos-style.css'
import router from './routes/index.js'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import cookies from './components/cookie-consent'

const app = createApp(App)
    .use(router)
    .use(VCalendar, {})
    .use(cookies)

app.mount('#app')
