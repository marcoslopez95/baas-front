<template>
    <VCol cols="12">
      <VTextField
        v-model="form.email"
        label="Email"
        type="email"
      />
    </VCol>
    <VCol cols="12">
      <VBtn
        style="margin-top: 5px"
        block
        type="submit"
        @click="auth.getForgotPassword(form.email)"
      >
        Submit
      </VBtn>
    </VCol>
</template>

<script setup lang="ts">

import { authStore } from '@/stores/AuthStore';
const auth = authStore()

const form = ref({
  email: '',
  password: '',
})

</script>

<style scoped></style>
