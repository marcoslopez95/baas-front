<template>
  <VForm @submit.prevent="nextPassword" ref="formPassword">
    <VRow>
      <VCol cols="12">
        <VTextField v-model="form.email" :rules="[validator.required, validator.email]" label="Email" type="email" />
      </VCol>
      <VCol cols="12">
        <VBtn style="margin-top: 5px" block type="submit">
          Submit
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

<script setup lang="ts">

import { authStore } from '@/stores/AuthStore';
import { required, email } from '@/validator';

const validator = { required, email }
const auth = authStore()
const formPassword = ref<any>()
const form = ref({
  email: '',
  password: '',
})

const nextPassword = async () => {
  console.log('next')
  const { valid } = await formPassword.value.validate()
  console.log(valid)
  if (!valid) return
  auth.getForgotPassword(form.value.email)
}

</script>

<style scoped></style>
