<script lang="ts" setup>
import { authStore } from '@/stores/AuthStore';
import { configStore } from '@/stores/configsStore';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const store = authStore()
const config = configStore()
const emit = defineEmits(['verify'])
// Esto se debe traducir
let bugs = [
  t('views.kyc.errors.image-not-equals'),
  t('views.kyc.errors.fields-not-equals'),
  t('views.kyc.errors.document-not-view'),
  t('views.kyc.errors.take-off-glasses'),
  t('views.kyc.errors.smiley-selfie'),
]
const errorsKycComp = computed(() => {
  let arrayErrors = []
  if (!store.errorsKyc.document_analysis.is_document)
    arrayErrors.push(bugs[0])
  if (!store.errorsKyc.document_analysis.name_in_document)
    arrayErrors.push(bugs[1])
  if (!store.errorsKyc.face_comparison.compare_face || !store.errorsKyc.face_comparison.is_alive)
    arrayErrors.push(bugs[2])
  if (store.errorsKyc.facial_analysis.has_glasses)
    arrayErrors.push(bugs[3])
  if (!store.errorsKyc.facial_analysis.is_smiling)
    arrayErrors.push(bugs[4])
  return arrayErrors
})
const backStep = async () => {
  config.documenType = { id:null, name: ''}
  emit('verify')
}
</script>


<template>
  <VCard>
    <VCardText>
      <p class="text-center text-lg">{{ $t('views.kyc.failed') }} </p>
      <VList class="list-grid" >
        <VListItem  border v-for="(item, i) in errorsKycComp" :key="i">
          <template #prepend>
            <VIcon class="me-2" color="error" icon="mdi-cancel-outline" size="16" />
          </template>
          <VListItemTitle class="font-weight-semibold"> {{ item }} </VListItemTitle>
        </VListItem>
      </VList>
    </VCardText>
    <VCardActions class="justify-end">
      <VBtn min-width="150px" @click="backStep" variant="tonal">{{$t('commons.try-again')}}</VBtn>
    </VCardActions>
  </VCard>
</template>

<style scoped>
.list-grid {
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 1fr;
}
</style>
