import type { Router } from 'vue-router'

export function setMeta(router: Router) {
  router.beforeEach((to, from, next) => {
    const meta = to.meta

    meta.title ? (document.title = meta.title as string) : (document.title = 'Playground Api')

    const description = document.querySelector('meta[name="description"]')

    if (description) {
      meta.description
        ? description.setAttribute('content', meta.description as string)
        : description.setAttribute(
            'content',
            'API Playground : Maîtrisez les appels API, créez des sites web interactifs et partagez vos réalisations. Explorez nos APIs et rejoignez notre communauté de développeurs juniors et experts.'
          )
    }

    next()
  })
}
