import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from,next) => {

  if (!isAutenticated()) {
    if(to.name != 'login' && to.name != 'register'){
      next({ name: 'login' });
    }
  }else 
  if(isAutenticated() && to.name == 'login'){
    next({ name: 'index' });
  }
  next();
})

export default router

const isAutenticated = () => {
  return localStorage.getItem('token') || false
}
