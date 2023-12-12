export default [
  {
    path: '/activationAccount/:token',
    name: 'activationAccount',
    component: () => import('@/views/TheConfirm.vue'),
    meta: {
      title: 'Playground Api - Activation de compte '
    }
  },
  {
    path: '/resetEmail/:token',
    name: 'resetEmail',
    component: () => import('@/views/TheConfirm.vue'),
    meta: {
      title: "Playground Api - Réinitialisation de l'e-mail"
    }
  },
  {
    path: '/resetPassword/:token',
    name: 'resetPassword',
    component: () => import('@/views/TheConfirm.vue'),
    meta: {
      title: 'Playground Api - Réinitialisation du mot de passe'
    }
  },
  {
    path: '/confirmRenewal/:token',
    name: 'confirmRenewal',
    component: () => import('@/views/TheConfirm.vue'),
    meta: {
      title: "Playground Api - Renouvellement clé d'api"
    }
  },
]