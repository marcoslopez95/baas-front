<script lang="ts" setup>
import { authStore } from '@/stores/AuthStore';
import { configStore } from '@/stores/configsStore';

const store = authStore()
const config = configStore()
const emit = defineEmits(['verify'])
// Esto se debe traducir
let bugs = [
  " La imagen no corresponde al tipo de documento",
  " Los datos del registro no coincide con el documento de identidad",
  "Documento borroso",
  "Quitarse los lentes",
  "Toma una nueva selfie sonriendo"
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
      <p class="text-center text-lg"> Lo sentimos no ha superado la verificación de identidad, revisa las siguientes sugerencias eh intentalo nuevamente.</p>
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
      <VBtn min-width="150px" @click="backStep" variant="tonal">Volver a intentar</VBtn>
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
