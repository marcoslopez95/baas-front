<script lang="ts" setup>
import { authStore } from '@/stores/AuthStore';
import Step1 from '@/views/profile/kyc/Step1.vue';
import Step2 from '@/views/profile/kyc/Step2.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const store = authStore()

const valueStep = ref(1)
const formDataStep1 = ref({
  document_type_id: null,
  country_id: '',
  city: '',
  address: '',
  birthdate: '',
})
const formDataStep2 = ref({
  selfie: '',
  front_document: '',
  reverse_document: '',
})
const componentStep = computed(() => {
  let comp = Step1
  switch (valueStep.value) {
    case 1:
      comp = Step1
      break
    case 2:
      comp = Step2
      break
    default:
      break
  }
  return comp
})
// {...formDataStep1.value, ...formDataStep2.value}
const sendData = async () => {
  store.validateKyc({ ...formDataStep1.value, ...formDataStep2.value })
  console.log('pasa')
} 
</script>

<template>
  <div>
    <VCard class="mb-4">
      <VCardTitle>Verificar identidad</VCardTitle>
    </VCard>
    <Component :formData="valueStep == 1 ? formDataStep1 : formDataStep2" :is="componentStep" @send="sendData()"
      @stepValue="valueStep = $event" />
  </div>
</template>
