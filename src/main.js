import { createApp } from 'vue'
import App from './App.vue'
import './assets/app.css'
import './assets/aos-style.css'
import router from './routes/index.js'
import AOS from 'aos'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

const app = createApp(App).use(router).use(AOS).use(VCalendar, {})

app.mount('#app')
