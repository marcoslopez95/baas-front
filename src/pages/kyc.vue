<script lang="ts" setup>
import { authStore } from '@/stores/AuthStore';
import Step1 from '@/views/profile/kyc/Step1.vue';
import Step2 from '@/views/profile/kyc/Step2.vue';
import Step3 from '@/views/profile/kyc/Step3.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const store = authStore()
const formDataStep1 = ref({
  document_type_id: null,
  country_id: null,
  city: '',
  address: '',
  birthdate: '',
  phone_number:''
})
const formDataStep2 = ref({
  selfie: '',
  front_document: '',
  reverse_document: '',
})

const componentStep = computed(() => {
  let comp:any = Step1
  switch (store.steps) {
    case 1:
      comp = Step1
      break
    case 2:
      comp = Step2
      break
    case 3:
      comp = Step3
      break
    default:
      break
  }
  return comp
})
// {...formDataStep1.value, ...formDataStep2.value}
const sendData = async () => {
  store.validateKyc({ ...formDataStep1.value, ...formDataStep2.value })
}
const verify = (() => {
  formDataStep1.value = {
    document_type_id: null,
    country_id: null,
    city: '',
    address: '',
    birthdate: '',
    phone_number:'',
  }
  formDataStep2.value = {
    selfie: '',
    front_document: '',
    reverse_document: '',
  }
  store.steps = 1
})
</script>

<template>
  <div>
    <VCard class="mb-4">
      <VCardTitle class="d-flex">
          <VIcon size="30" color="primary" class="mr-4">mdi-account-card-details</VIcon>
          <span>{{ $t('views.kyc.verify-identity') }}</span> 
          </VCardTitle>
          <VCardSubtitle style="    white-space: normal;" class="py-4">
            {{ $t('views.kyc.subtitle') }}
          </VCardSubtitle>
    </VCard> 
    <Component :formData="store.steps == 1 ? formDataStep1 : formDataStep2" :is="componentStep" @verify="verify()"
      @send="sendData()" @stepValue="store.steps = $event" />
  </div>
</template>
