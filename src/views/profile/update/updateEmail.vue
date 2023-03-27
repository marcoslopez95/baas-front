
  
<script setup lang="ts">
import { authStore } from '@/stores/AuthStore';

import { required, email } from '@/validator';
const validator = { required, email }
const auth = authStore()
const { sendCode,formEmail } = storeToRefs(auth)
console.log(sendCode)
const formUpdateEmail = ref<any>()
// const form = ref({ email_token: '',sms_token: '', email: '' })

const validateUpdateEmail = async () => {
  console.log('pasa')
  const { valid } = await formUpdateEmail.value.validate()
  if (!valid) return
  auth.getResendCodeEmail()
  // sendCode.value = true
}

const verifyEmail = async () => {
  const { valid } = await formUpdateEmail.value.validate()
  if (!valid) return
  auth.getVerifyUpdateEmail()
  // sendCode.value = false
}


</script>
<template>
  <VCol cols="12">
    <VCard>
      <VCardTitle class="d-flex">
        <!-- 👉 Avatar -->
        <!-- <VAvatar rounded="xl" class="mr-4" size="40" variant="tonal" color="primary"> -->
        <VIcon size="30" color="primary" class="mr-4" icon="mdi-email"></VIcon>
        <!-- </VAvatar> -->
        <span>Actualizar Email</span>
      </VCardTitle>

      <VDivider />
      <VCardText>
        <!-- 👉 Form -->
        <VForm class="mt-6" ref="formUpdateEmail">
          <VRow>

            <VCol cols="12" md="6">
              <VTextField :rules="[validator.required, validator.email]" :readonly="sendCode" v-model="formEmail.email"
                label="E-mail" type="email" />
            </VCol>
            <VCol  cols="12" md="6">
              <VTextField :rules="[validator.required]" v-if="sendCode" v-model="formEmail.sms_token" label="Token sms" />
            </VCol>
            <VCol  cols="12" md="6">
              <VTextField :rules="[validator.required]" v-if="sendCode" v-model="formEmail.email_token" label="Token email" />
            </VCol>

            <!-- 👉 Form Actions -->
            <VCol cols="12" class="d-flex flex-wrap gap-4">
              <VBtnSecondary v-if="sendCode" @click="auth.getResendCodeEmail()" color="primary" variant="tonal">
                Resend code
              </VBtnSecondary>
              <VBtnPrimary @click="sendCode ? verifyEmail() : validateUpdateEmail()" min-width="100px">{{ sendCode ? 'Verify' : 'Update' }}
              </VBtnPrimary>

            </VCol>
          </VRow>
        </VForm>


      </VCardText>
    </VCard>
  </VCol>
</template>

  