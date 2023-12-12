export default [
  {
    path: '/apis',
    name: 'apis',
    component: () => import('@/views/TheApi.vue'),
    meta: {
      title: 'Playground Api - Apis',
      description: ''
    }
  }
]
