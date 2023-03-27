<template>
  <VCol cols="12">
    <VCard>
      <VCardTitle class="d-flex">
        <!-- 👉 Avatar -->
        <!-- <VAvatar rounded="xl" class="mr-4" size="40" variant="tonal" color="primary"> -->
        <VIcon size="30" color="primary" class="mr-4" icon="mdi-phone"></VIcon>
        <!-- </VAvatar> -->
        <span>{{ $t('views.profile.update-phone') }}</span>
      </VCardTitle>

      <VDivider />
      <!-- ACTUALIZAR PERFIL-->
      <VCardText>
        <!-- 👉 Form -->
        <VForm class="mt-6" ref="formUpdatePhone">
          <VRow>
            <!-- 👉 First Name -->
            <!-- <VCol md="6" cols="12">
               <VTextField v-model="phone_number" :label="$t('views.profile.edit-phone')" />
             </VCol> -->
            <VCol md="6" cols="12">
              <VueTelInput :disabled="confirmationCodePhone" class="h-100 border-primary"  style="height: 48px !important;" autoDefaultCountry autoFormat
                v-model="phone" @validate="phoneEvent" mode="international" inputOptions.showDialCode></VueTelInput>
            </VCol>
            <VCol md="6" cols="12">
              <VTextField v-if="confirmationCodePhone" v-model="formPhone.sms_token" :rules="[validator.required]"
                :label="$t('views.profile.code')">
              </VTextField>
            </VCol>
            <VCol cols="12" md="6">
              <VTextField :rules="[validator.required]" v-if="confirmationCodePhone" v-model="formPhone.email_token"
                label="Token email" />
            </VCol>
            <!-- 👉 Form Actions -->
            <VCol cols="12" class="d-flex flex-wrap gap-4">
              <VBtnSecondary v-if="confirmationCodePhone" @click="auth.getResendCodePhone()" color="primary"
                variant="tonal">
                Resend code
              </VBtnSecondary>
              <VBtnPrimary :disabled="!confirmationCodePhone && !isNumberValid"
                @click="confirmationCodePhone ? verifyPhone() : sendCode()" min-width="100px">{{ confirmationCodePhone ?
                  'Verify' : 'Update' }}
              </VBtnPrimary>

            </VCol>
            <!-- <VCol cols="12" class="d-flex flex-wrap gap-4">
               <VBtn :disabled="!isNumberValid" type="button" @click="sendCode" min-width="100px">Save changes</VBtn>
             </VCol> -->
          </VRow>
          <!-- <VRow v-if="confirmationCodePhone">
         
          
             <VCol cols="12" class="d-flex flex-wrap gap-4">
               <VBtn :disabled="!isNumberValid" type="button" @click="updatePhone" min-width="100px">{{$t('views.profile.update-phone')}}</VBtn>
             </VCol>
           </VRow> -->
        </VForm>
      </VCardText>
    </VCard>
  </VCol>
</template>
<script lang="ts" setup>
import { helperStore } from '@/helper';
import { ref } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import { authStore } from '@/stores/AuthStore';
import 'vue-tel-input/dist/vue-tel-input.css';
import { required } from '@/validator';

const auth = authStore()
const validator = { required }

// 746520616d6f646f726f
const helper = helperStore()
helper.baseUrl = import.meta.env.VITE_API_URL
const validateUpdate = () => {

}

const phone = ref('')
const code = ref('')
const phone_number = ref('')
const isNumberValid = ref(false)
const { confirmationCodePhone, formPhone } = storeToRefs(auth)
const phoneEvent = (objectphone: any) => {
  console.log(objectphone)
  if (objectphone.valid) {
    formPhone.value.phone_number = objectphone.nationalNumber
    isNumberValid.value = true
    return
  }
  isNumberValid.value = false
}

// const confirmationCode = ref(false)
const sendCode = () => {
  auth.getResendCodePhone()
}
const formUpdatePhone = ref<any>()

const verifyPhone = async () => {
  const { valid } = await formUpdatePhone.value.validate()
  if (!valid) return
  auth.getVerifyUpdatePhone()
}
</script>

<style lang="scss" scoped>
.vue-tel-input:focus-within {
  border-width: 2px;
  border-color: #1c298c
}
</style>
