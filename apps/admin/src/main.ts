import { createApp } from 'vue'
import router from './router'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')