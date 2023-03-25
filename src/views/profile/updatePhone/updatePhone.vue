<template>
   <VCol cols="12">
      <VCard>
        <VCardTitle class="d-flex">
          <!-- 👉 Avatar -->
          <!-- <VAvatar rounded="xl" class="mr-4" size="40" variant="tonal" color="primary"> -->
            <VIcon size="30"  color="primary" class="mr-4" icon="mdi-phone"></VIcon>
          <!-- </VAvatar> -->
          <span>{{ $t('views.profile.update-phone') }}</span> 
        </VCardTitle>

        <VDivider />
        <!-- ACTUALIZAR PERFIL-->
        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow v-if="!confirmationCode">
              <!-- 👉 First Name -->
              <!-- <VCol md="6" cols="12">
                <VTextField v-model="phone_number" :label="$t('views.profile.edit-phone')" />
              </VCol> -->
              <VCol md="6" cols="12">
                <VueTelInput 
                  class="h-100 border-primary" 
                  autoDefaultCountry
                  autoFormat
                  v-model="phone"
                  @validate="phoneEvent"
                  mode="international"
                  inputOptions.showDialCode
                  ></VueTelInput>
              </VCol>
              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn :disabled="!isNumberValid" type="button" @click="sendCode" min-width="100px">Save changes</VBtn>
              </VCol>
            </VRow>
            <VRow v-if="confirmationCode">
              <!-- 👉 First Name -->
              <!-- <VCol md="6" cols="12">
                <VTextField v-model="phone_number" :label="$t('views.profile.edit-phone')" />
              </VCol> -->
              <VCol md="6" cols="12">
                <VueTelInput 
                  class="h-100 border-primary" 
                  v-model="phone_number"
                  autoDefaultCountry
                  autoFormat
                  @validate="phoneEvent"
                  mode="international"
                  inputOptions.showDialCode
                  ></VueTelInput>
              </VCol>
              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn :disabled="!isNumberValid" type="submit" min-width="100px">Save changes</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
</template>
<script lang="ts" setup>
import { helperStore } from '@/helper';
import { ref } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

// 746520616d6f646f726f
const helper = helperStore()
helper.baseUrl = import.meta.env.VITE_API_URL
const validateUpdate = () => {

}

const phone = ref('')
const phone_number = ref('')
const isNumberValid = ref(false)
const phoneEvent = (objectphone:any) => {
  console.log(objectphone)
  if(objectphone.valid) {
    phone_number.value = objectphone.nationalNumber
    isNumberValid.value = true
    return
  }
  isNumberValid.value = false
}

const confirmationCode = ref(false)
const sendCode = () => {
  let url = '/auth/change-phone-number'
  let params = {phone_number: phone_number.value}
  helper
    .http(url,'get',{params})
    .then(()=> {
      confirmationCode.value = true
    })
}
</script>

<style lang="scss" scoped>
.vue-tel-input:focus-within{
  border-width: 2px;
  border-color: #1c298c
}
</style>
