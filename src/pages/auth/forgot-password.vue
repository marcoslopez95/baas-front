<script setup lang="ts">
import logo from '@/assets/logo.svg?raw';

import { authStore } from '@/stores/AuthStore';
import FormForgotPassword from '@/views/pages/authentication/FormForgotPassword.vue';
import VerifyForgotPassword from '@/views/pages/authentication/VerifyForgotPassword.vue';
const auth = authStore()

const form = ref({
  email: '',
  password: '',
})

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
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Materio
        </VCardTitle>
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
        <VForm @submit.prevent="() => {}">
          <VRow>
            <FormForgotPassword v-if="!auth.confirm_code"></FormForgotPassword>
            <VerifyForgotPassword v-else></VerifyForgotPassword>
            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Tienes tu codigo?</span>
              <RouterLink
                class="text-primary ms-2"
                to="#"
                @click.prevent="auth.confirm_code = true"
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
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
