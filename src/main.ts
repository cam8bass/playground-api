import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import dispatchError from './shared/errors/dispatchError.error'
import router from './router/router'
import { setMeta } from './shared/utils'
import { appear } from './modules'

const pinia = createPinia()
const app = createApp(App)

app.config.errorHandler = (err) => {
  console.log('je suis dans app.config.errorHandler')
  dispatchError(err)
}

app.use(pinia)

app.use(router).directive('appear', appear)
setMeta(router)

await router.isReady() 

app.mount('#app')
