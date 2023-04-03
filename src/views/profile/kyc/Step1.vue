<script lang="ts" setup>
import { configStore } from '@/stores/configsStore';
import { required } from '@/validator';
import { useRoute } from 'vue-router';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
const props =  defineProps({
    formData:{
        type: Object,
        required: true
    },
})
const phone = ref('')
const isNumberValid = ref(false)

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
const phoneEvent = (objectphone:any) => {
  console.log(objectphone)
  if(objectphone.valid) {
    form.value.phone_number = objectphone.nationalNumber
    isNumberValid.value = true
    return
  }else form.value.phone_number = ''
  isNumberValid.value = false
}
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
          <!-- phone_number  -->
          
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
          <VueTelInput 
                  class="h-48 border-primary" 
                  style="height: 46px !important;"
                  v-model="phone"
                  autoDefaultCountry
                  autoFormat
                  @validate="phoneEvent"
                  mode="international"
                  inputOptions.showDialCode
                  ></VueTelInput>
         
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
      ><VBtnSecondary
        min-width="150px"
        @click="nextStep"
        :disabled="!form.phone_number"
        >{{$t('commons.next')}}</VBtnSecondary
      ></VCardActions
    >
  </VCard>
</template>
<style >

.vue-tel-input:focus-within {
  border-width: 2px;
  border-color:  rgb(var(--v-theme-primary))
}
</style>