<script setup lang="ts">
import { authStore } from '@/stores/AuthStore';
const auth = authStore()

const form = ref({
  token: '',
  password: '',
  password_confirmation: '',
})

const isPasswordVisible = ref(false)
const isPasswordVisible2 = ref(false)
</script>

<template>
  <VCol cols="12">
    <VTextField
      v-model="form.token"
      label="Code"
      type="text"
    />
  </VCol>
  <VCol cols="12">
    <VTextField
      v-model="form.password"
      label="Password"
      :type="isPasswordVisible2 ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      @click:append-inner="isPasswordVisible2 = !isPasswordVisible2"
    />
  </VCol>
  <VCol cols="12">
    <VTextField
      v-model="form.password_confirmation"
      label="Confirm Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    />
  </VCol>

  <!-- password -->
  <VCol cols="12">
    <VBtn
      style="margin-top: 5px"
      block
      type="submit"
      @click="auth.confirmForgotPassword(form)"
    >
      Submit
    </VBtn>
  </VCol>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
