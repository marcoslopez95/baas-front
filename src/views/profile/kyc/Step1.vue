<script lang="ts" setup>
import { configStore } from '@/stores/configsStore';
import { required } from '@/validator';
import { useRoute } from 'vue-router';
const props =  defineProps({
    formData:{
        type: Object,
        required: true
    },
})

const emit = defineEmits(['stepValue'])
const store = configStore()
const validator = { required }
const route = useRoute()
const formStep1 = ref<any>()
const document = store.documenType?.id ? ref( store.documenType) : ref(null)
console.log(document)

const form = ref(props.formData)
store.getCountries()
store.getDocumentTypes()

const changeDocumentType= (e: any) => {
  store.setTypeDocument(e)
  form.value.document_type_id = e.id
}
const nextStep = async () => {
  const { valid } = await formStep1.value.validate()

  if (!valid) return
  emit('stepValue', 2)
}
</script>

<template>
  <VCard>
    <VCardText>
      <VForm
        @submit.prevent="nextStep"
        ref="formStep1"
      >
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VSelect
              item-title="name"
              item-value="id"
              :items="store.documentsTypes"
              :rules="[validator.required]"
              @update:model-value="changeDocumentType($event)"
              v-model="document"
              return-object
              :label="$t('views.kyc.type-document')"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              :rules="[validator.required]"
              :label="$t('views.kyc.birthdate')"
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
              item-title="name"
              item-value="id"
              :rules="[validator.required]"
              :items="store.countries"
              v-model="form.country_id"
              :label="$t('views.countries.singular')"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              :label="$t('views.kyc.city')"
              v-model="form.city"
              :rules="[validator.required]"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              :label="$t('views.kyc.address')"
              v-model="form.address"
              :rules="[validator.required]"
            />
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
    <VCardActions class="justify-end"
      ><VBtn
        min-width="150px"
        @click="nextStep"
        variant="tonal"
        >{{$t('commons.next')}}</VBtn
      ></VCardActions
    >
  </VCard>
</template>
