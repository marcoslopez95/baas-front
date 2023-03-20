<script setup lang="ts">
import { authStore } from '@/stores/AuthStore';
import { required, email, password, confirmPassword } from '@/validator';
const auth = authStore()
const formPasswordSecond = ref<any>()
const validator = { required, email, password, confirmPassword }
const form = ref({
  token: '',
  password: '',
  password_confirmation: '',
})

const isPasswordVisible = ref(false)
const isPasswordVisible2 = ref(false)

const nextPassword = async () => {
  const { valid } = await formPasswordSecond.value.validate()
  console.log(valid)
  if (!valid) return
  auth.confirmForgotPassword(form.value)
}
</script>

<template>
  <VForm @submit.prevent="nextPassword" ref="formPasswordSecond">
    <VCol cols="12">
      <VTextField v-model="form.token" label="Code" type="text" :rules="[validator.required]" />
    </VCol>
    <VCol cols="12">
      <VTextField :rules="[validator.required, validator.password]" v-model="form.password" label="Password"
        :type="isPasswordVisible2 ? 'text' : 'password'"
        :append-inner-icon="isPasswordVisible2 ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        @click:append-inner="isPasswordVisible2 = !isPasswordVisible2" />
    </VCol>
    <VCol cols="12">
      <VTextField v-model="form.password_confirmation"
        :rules="[validator.required, validator.confirmPassword(form.password, form.password_confirmation)]"
        label="Confirm Password" :type="isPasswordVisible ? 'text' : 'password'"
        :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        @click:append-inner="isPasswordVisible = !isPasswordVisible" />
    </VCol>

    <!-- password -->
    <VCol cols="12">
      <VBtn style="margin-top: 5px" block type="submit">
        Submit
      </VBtn>
    </VCol>
  </VForm>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
