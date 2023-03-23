<script lang="ts" setup>
import { authStore } from '@/stores/AuthStore';
import VerifyForgotPassword from '../pages/authentication/VerifyForgotPassword.vue';
const auth = authStore()




</script>

<template>
  <VRow >
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="Change Password">
      <VCardText>
        <VRow class="mb-4 justify-end mr-2">
        <VBtn @click="auth.getForgotPassword(auth.user.email)" color="primary" variant="tonal" >
          Resend code
        </VBtn>
      </VRow>
        <VerifyForgotPassword :type="'Change'"/>
      </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
