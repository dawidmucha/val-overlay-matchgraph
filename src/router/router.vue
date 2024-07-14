<script>
import { createWebHistory, createRouter } from 'vue-router'

import HomeScreen from '@/components/HomeScreen.vue'
import OverlayWidget from '@/components/OverlayWidget.vue'

const routes = [
  { path: '/', component: HomeScreen },
  { path: '/:name/:tag/:region', component: OverlayWidget },
  { path: '/:name', redirect: '/' },
  { path: '/:name/:tag', redirect: '/' },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
</script>