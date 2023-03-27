import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { toast } from 'vue3-toastify'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
    // {
    //   name: "accounts-user",
    //   component: () => (import("./../pages/accounts-user.vue")),
    //   path: "/accounts-user"

    // }
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  // console.log(isVerifiedKyc())
  if (!isAutenticated()) {
    if (to.name != 'login' && to.name != 'register' && to.name != 'auth-forgot-password') {
      next({ name: 'login' })
    }
  } else {
    if (to.name == 'login' || to.name == 'register' || to.name == 'auth-forgot-password') {
      next({ name: 'index' })
    } else if (to.name == 'deposit' || to.name == 'accounts-user') {
      if (!isVerifiedKyc()) next({ name: 'profile' })
    }
  }
  next()
})

export default router

const isAutenticated = () => {
  return localStorage.getItem('token') || false
}

const isVerifiedKyc = () => {
  let kyc = false
  let user = localStorage.getItem('user') || null

  let status = user
    ? JSON.parse(user)?.profile?.kycVerification?.general_status
      ? JSON.parse(user)?.profile?.kycVerification?.general_status
      : null
    : null
  console.log(status)
  if(status)
  switch (status) {
    case 'ACEPTADO':
      kyc = true
      break
    case 'RECHAZADO':
      kyc = false
      toast('Verifique su identidad', {
        theme: 'colored',
        type: 'warning',
      })
      break
    case 'EN VERIFICACION':
      kyc = false
      toast('Identidad en verificacion', {
        theme: 'colored',
        type: 'warning',
      })
      break

    default:
      break
  }
  else toast('Verifique su identidad para continuar', {
    theme: 'colored',
    type: 'warning',
  })
  return kyc
}
