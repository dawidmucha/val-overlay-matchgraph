<script>
import { createWebHashHistory, createRouter } from 'vue-router'

import HomeScreen from '@/components/HomeScreen.vue'
import OverlayWidget from '@/components/OverlayWidget.vue'
import OverlayPage from '@/components/OverlayPage.vue'

const routes = [
  { path: '/val-overlay-matchgraph/', component: HomeScreen },
  { path: '/val-overlay-matchgraph/:name/:tag/:region', component: OverlayPage },
  { path: '/val-overlay-matchgraph/:name/:tag/:region/embed', component: OverlayWidget },
  { path: '/val-overlay-matchgraph/:name', redirect: '/val-overlay-matchgraph/' },
  { path: '/val-overlay-matchgraph/:name/:tag', redirect: '/val-overlay-matchgraph/' },
  { path: '/val-overlay-matchgraph/:pathMatch(.*)*', redirect: '/val-overlay-matchgraph/' },
  { path: '/:pathMatch(.*)*', redirect: '/val-overlay-matchgraph/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
</script>