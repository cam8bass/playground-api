import { createPinia } from 'pinia'
import { createApp } from 'vue'
// import * as Sentry from '@sentry/vue'
import App from './App.vue'
import router from './router/router'
import { setMeta } from './shared/utils'
import { appear } from './modules'


import { errorManagement } from './error/errorManagement.error'

const pinia = createPinia()
const app = createApp(App)

/**
 * The error handler for the Vue app.
 */

router.onError((err: any) => errorManagement(err))
app.config.errorHandler = (err: any) => errorManagement(err)
window.onerror = (err: any) => errorManagement(err)

// Sentry.init({
//   dsn: 'https://f1e498966407cba1cda3309849b63cca@o4506739136200704.ingest.us.sentry.io/4506932232716288',
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration({
//       maskAllText: false,
//       blockAllMedia: false
//     })
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// })

app.use(pinia)
app.use(router).directive('appear', appear)
setMeta(router)

await router.isReady()

app.mount('#app')
