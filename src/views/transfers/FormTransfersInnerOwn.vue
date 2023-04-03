
<script setup lang="ts">
import { transfersStore } from '@/stores/TransfersStore';
import { requiredAmount, required, amountFormat } from '@/validator';
import { accountUserStore } from '@/stores/AccountUserStore';
import DialogConfirm from '@/views/global/DialogConfirm.vue';
const props = defineProps({
  type: {
    type: String,
    required: true,
  }
})

const account = accountUserStore()
const validator = { required, requiredAmount }

const transfer = transfersStore()
account.getAccounts()
const dialogConfirm = ref(false)
const { form } = storeToRefs(transfer)
const moneyInput = (event: string) => {
  form.value.amount = amountFormat(event);
}

const formCodeTransfer = ref<any>()
const formCreateTransfer = ref<any>()
const { items: user_accounts } = storeToRefs(account)

const accountsDetination = ref([])
const accountsOrigin = ref([])
const accountOrigin = ref(null)
const accountDestination = ref(null)
const disabledForm = ref(false)
const code = ref(null)


const changeOrigin = () => {
  form.value.origin_account_id = accountOrigin?.value.id
}
const changeDestination = () => {
  form.value.destination_account_id = accountDestination?.value.id
}
const confirmTransfer = () => {
  console.log(form)
  dialogConfirm.value = true
}
const createTransfer = async () => {
  console.log(form, user_accounts)

  const { valid } = await formCreateTransfer.value.validate()
  if (!valid) return
  disabledForm.value = true

}
const processTransfer = async () => {
  console.log(form)
  const { valid } = await formCodeTransfer.value.validate()
  if (!valid) return
  console.log('creada')
  dialogConfirm.value = false


}
</script>

<template>
  <VForm @submit.prevent="createTransfer" ref="formCreateTransfer">
    <VRow>
      <VCol cols="12" md="6">
        <VCol cols="12" md="9" class="mx-auto">
          <VSelect v-model="accountOrigin" :disabled="disabledForm" @update:model-value="changeOrigin" return-object
            item-title="accountNumberFormat" item-value="id" :rules="[validator.required]" :items="user_accounts"
            label="Account origin"></VSelect>
        </VCol>
        <VCol cols="12" md="9" class="mx-auto ">
          <VBtnSecondary density="compact" v-if="type != 'own'" class="mb-1" @click="$emit('createBeneficiary')">Agregar beneficiario</VBtnSecondary>

          <VSelect v-model="accountDestination" :disabled="disabledForm" @update:model-value="changeDestination"
            return-object item-title="accountNumberFormat" item-value="id" :rules="[validator.required]"
            :items="user_accounts" label="Account destino"></VSelect>
        </VCol>

        <VCol cols="12" md="9" class="mx-auto">
          <VTextField v-model="form.amount" :disabled="disabledForm" @keyup="moneyInput($event)"
            :rules="[validator.requiredAmount]" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
            type="text" label="Amount" />
        </VCol>
        <VCol cols="12" md="9" class="mx-auto">
          <VTextarea v-model="form.comments" :disabled="disabledForm" label="Comments (optional)" />
        </VCol>
        <VCol cols="12" md="9" class="mx-auto justify-end">
          <VBtnPrimary type="submit" min-width="100px" :disabled="disabledForm">Create</VBtnPrimary>
        </VCol>
      </VCol>
      <VCol cols="1" v-if="disabledForm">
        <VIcon size="100">mdi-chevron-double-right</VIcon>
      </VCol>
      <VCol cols="12" md="5" v-if="disabledForm">
        <VCard elevation="0" border>
          <VCardTitle>Detalle de la transferencia</VCardTitle>
          <VCardText>
            <VList>
              <VListItem>
                <VListItemTitle>
                  Cuenta origen: {{ accountOrigin?.accountNumber }}
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>
                  Cuenta destino: {{ accountDestination?.accountNumber }}
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>
                  Monto: {{ form.amount }} {{ accountOrigin?.currency?.abbreviation }}
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>
                  Comments: {{ form.comments }}
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>
                  <VBtnSecondary @click="disabledForm = !disabledForm" class="mr-2" min-width="100px">Update</VBtnSecondary>
                  <VBtnPrimary @click="confirmTransfer">Procesar transferencia</VBtnPrimary>
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>

      </VCol>

    </VRow>
    <DialogConfirm :title="'Confirmar transferencia'" :content="'Ingresa el codigo que fue enviado a tu tlf'"
      :dialog="dialogConfirm" @close="dialogConfirm = false" :btnAcceptText="'Confirm'" @ok="processTransfer">

      <VForm ref="formCodeTransfer">
        <VRow class="mt-2">
          <VCol cols="12">
            <VTextField v-model="code" density="compact" :rules="[validator.required]" label="Code" />
          </VCol>
        </VRow>

      </VForm>
    </DialogConfirm>
  </VForm>
</template>