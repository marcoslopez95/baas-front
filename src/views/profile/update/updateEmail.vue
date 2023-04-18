
  
<script setup lang="ts">
import { authStore } from '@/stores/AuthStore';

import { email, required } from '@/validator';
const validator = { required, email }
const auth = authStore()
const { sendCode,formEmail } = storeToRefs(auth)
const formUpdateEmail = ref<any>()
// const form = ref({ email_token: '',sms_token: '', email: '' })

const validateUpdateEmail = async () => {
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
        <span> {{$t('views.profile.update-email')}}</span>
      </VCardTitle>

      <VDivider />
      <VCardText>
        <!-- 👉 Form -->
        <VForm class="mt-6" ref="formUpdateEmail">
          <VRow>

            <VCol cols="12" md="6">
              <VTextField :rules="[validator.required, validator.email]" :readonly="sendCode" v-model="formEmail.email"
                :label="$t('commons.e-mail')" type="email" />
            </VCol>
            <VCol  cols="12" md="6">
              <VTextField :rules="[validator.required]" v-if="sendCode" v-model="formEmail.sms_token"  :label="$t('views.profile.token-sms')" />
            </VCol>
            <VCol  cols="12" md="6">
              <VTextField :rules="[validator.required]" v-if="sendCode" v-model="formEmail.email_token"  :label="$t('views.profile.token-email')" />
            </VCol>

            <!-- 👉 Form Actions -->
            <VCol cols="12" class="d-flex flex-wrap gap-4">
              <VBtnSecondary v-if="sendCode" @click="auth.getResendCodeEmail()" color="primary" variant="tonal">
                  {{$t('views.profile.resend-code')}}
              </VBtnSecondary>
              <VBtnPrimary @click="sendCode ? verifyEmail() : validateUpdateEmail()" min-width="100px">{{ sendCode ?  $t('views.profile.verify') : $t('commons.update') }}
              </VBtnPrimary>

            </VCol>
          </VRow>
        </VForm>


      </VCardText>
    </VCard>
  </VCol>
</template>

  