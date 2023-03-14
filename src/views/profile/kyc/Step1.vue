<script lang="ts" setup>
import { Store } from '@/stores/configsStore';
import { required } from '@/validator';
import { useRoute } from 'vue-router';
const emit = defineEmits(['stepValue'])
const store = Store()
const validator = { required }
const route = useRoute()
const typeDocuments = []
const countries = []
const formKyc = ref(null)
const form = ref({
  document_type_id: null,
  country_id: null,
  city: null,
  Address: null,
})
store.getCountries()
store.getDocumentTypes()
//birthdate  selfie front_document reverse_document
const nextStep = async () => {
  const { valid } = await formKyc.value.validate()
  console.log('peticion', valid)

  if (!valid) return
  emit('stepValue', 2)
}
</script>

<template>
  <VCard>
    <VCardText>
      <VForm
        @submit.prevent="nextStep"
        ref="formKyc"
      >
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              :items="typeDocuments"
              :rules="[validator.required]"
              v-model="form.document_type_id"
              label="Type document"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              :rules="[validator.required]"
              label="Birthdate"
              type="date"
              v-model="form.birthdate"
              :max="new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              :rules="[validator.required]"
              :items="countries"
              v-model="form.document_type_id"
              label="Country"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              label="City"
              v-model="form.city"
              :rules="[validator.required]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              label="Address"
              v-model="form.Address"
              :rules="[validator.required]"
            />
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
    <VCardActions><VBtn @click="nextStep">Next</VBtn></VCardActions>
  </VCard>
</template>
