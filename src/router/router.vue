<script>
import { createWebHashHistory, createRouter } from 'vue-router'

import HomeScreen from '@/components/HomeScreen.vue'
import OverlayWidget from '@/components/OverlayWidget.vue'
import OverlayPage from '@/components/OverlayPage.vue'

const routes = [
  { path: '/', component: HomeScreen },
  { path: '/:name/:tag/:region', component: OverlayPage },
  { path: '/:name/:tag/:region/embed', component: OverlayWidget },
  { path: '/:name', redirect: '/' },
  { path: '/:name/:tag', redirect: '/' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
</script>