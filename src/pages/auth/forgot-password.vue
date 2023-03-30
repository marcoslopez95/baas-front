<script setup lang="ts">
import { useTheme } from 'vuetify'

import { authStore } from '@/stores/AuthStore';
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.svg'
import FormForgotPassword from '@/views/pages/authentication/FormForgotPassword.vue';
import VerifyForgotPassword from '@/views/pages/authentication/VerifyForgotPassword.vue';
const auth = authStore()

const urlFront = ref(import.meta.env.VITE_URL_FRONT)
const logo = computed(() => {
  return auth.setting?.logo == 'logo.png' ? `${urlFront.value}${auth.setting?.logo}` : auth.setting?.logo
})
const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? authV1MaskLight
    : authV1MaskDark
})

const formPassword = ref<any>()
const form = ref({
  email: '',
  password: '',
})
const codeExist = () =>{
  // const { valid } = await formPassword.value.validate()
  console.log('code')
  auth.confirm_code = true 
}

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img :src="logo"/>
          </div>
        </template>

      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Forgot Password
        </h5>
        <!-- <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p> -->
      </VCardText>

      <VCardText>
          <VRow>
            <VCol
              cols="12"
              class="text-center text-base"
            >
            <FormForgotPassword v-if="!auth.confirm_code"></FormForgotPassword>
            <VerifyForgotPassword v-else></VerifyForgotPassword>
            <!-- create account -->
          </VCol>

            <VCol
            v-if="!auth.confirm_code"
              cols="12"
              class="text-center text-base"
            >
              <span>Tienes tu codigo?</span>
              <RouterLink
                class="text-primary ms-2"
                to="#"
                @click.prevent="codeExist"
              >
                Ya lo tengo
              </RouterLink>
            </VCol>
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'register' }"
              >
                Create an account
              </RouterLink>
            </VCol>
            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
            <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'login' }"
              >
                Login
              </RouterLink>
            </VCol>
          </VRow>
      </VCardText>
    </VCard>
    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
