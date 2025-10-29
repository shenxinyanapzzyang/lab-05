import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { inject } from '@vercel/analytics'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'

const app = createApp(App)

// 只在非开发环境初始化Analytics
if (import.meta.env.PROD) {
  try {
    inject()
  } catch (error) {
    console.warn('Analytics initialization error:', error)
  }
}

app.use(createPinia())
app.use(router)

app.mount('#app')
