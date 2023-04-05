
<script setup lang="ts">
import { transfersStore } from '@/stores/TransfersStore';
import { requiredAmount, required, amountFormat } from '@/validator';
import { accountUserStore } from '@/stores/AccountUserStore';
import { authStore } from '@/stores/AuthStore';
import DialogConfirm from '@/views/global/DialogConfirm.vue';
const props = defineProps({
  type: {
    type: String,
    required: true,
  }
})


const auth = authStore()
const account = accountUserStore()
const validator = { required, requiredAmount }

const transfer = transfersStore()
account.getAccounts()

const { form, addressesInner, addressesOuter, addressesCrypto, dialogConfirm, sms_token} = storeToRefs(transfer)
form.value ={
    destination_account_id: null,
    origin_account_id: null,
    amount: "0,00",
    comments: '',
  }
sms_token.value = null
const { sendCodeSms } = storeToRefs(auth)
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
const userAccountsDestination = ref([])
const disabledForm = ref(false)
const code = ref(null)

// const selectPaymentMethod = computed(()=> {

// })

const changeOrigin = () => {
  form.value.origin_account_id = accountOrigin?.value.id
  form.value.destination_account_id = null
  accountDestination.value = null
  switch (props.type) {
    case 'onw':
      userAccountsDestination.value = user_accounts.value.filter(res => ((res.currency.id == accountOrigin?.value.currency?.id) && (res.id != accountOrigin?.value.id)))
      
      break;
      case 'inner':
        console.log('addressesInner', addressesInner)
      userAccountsDestination.value = addressesInner.value.filter(res => ((res.account?.currency?.id == accountOrigin?.value.currency?.id) && (res.account?.id != accountOrigin?.value.id)))
      userAccountsDestination.value.map(res => {
         res.accountNumberFormat = `${res.account?.accountNumber} ( ${res?.account?.currency?.abbreviation})`
         res.accountNumber = res.account?.accountNumber
      }) 
      break;
      case 'outer':
        console.log('addressesOuter', addressesOuter)
      userAccountsDestination.value = addressesOuter.value.filter(res => ((res.currency?.id == accountOrigin?.value.currency?.id)))
      userAccountsDestination.value.map(res => {
         res.accountNumberFormat = `${res?.accountNumber} ( ${res?.currency?.abbreviation})`
      }) 
      break;
      case 'crypto':
        console.log('addressesCrypto', addressesCrypto)
      userAccountsDestination.value = addressesCrypto.value.filter(res => ((res.account?.currency?.id == accountOrigin?.value.currency?.id) && (res.account?.id != accountOrigin?.value.id)))
      userAccountsDestination.value.map(res => {
         res.accountNumberFormat = `${res.account?.accountNumber} ( ${res?.account?.currency?.abbreviation})`
         res.accountNumber = res.account?.accountNumber
      }) 
      break;
  
    default:
      break;
  }
  

}
const changeDestination = () => {
  form.value.destination_account_id = accountDestination?.value.id
}
const confirmTransfer = () => {
  console.log(form)
  if(props.type == "own")
  transfer.createTranferOwn()
  else { 
    auth.getResendCodeSms()
    dialogConfirm.value = true
  }

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
  if(sendCodeSms.value){
  
  switch (props.type) {
    case 'own':
  transfer.createTranferOwn()
    break;
  case 'inner':
    
  transfer.createTranferInner()
    break;
    case 'outer':
  transfer.createTranferOuter()
    break;
    case 'crypto':
  transfer.createTranferCrypto()
    break;

  default:
    break;
 

  }
}

}

console.log('type',props.type)

switch (props.type) {
  case 'inner':
  transfer.getAddressInner()
    break;
    case 'outer':
  transfer.getAddressOuter()
    break;
    case 'crypto':
  transfer.getAddressCrypto()
    break;

  default:
    break;
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
          <VBtnSecondary density="compact" :disabled="disabledForm"  v-if="type != 'own'" class="mb-2" @click="$emit('createBeneficiary')">Agregar
            beneficiario</VBtnSecondary>

          <VSelect v-model="accountDestination" :disabled="disabledForm || !accountOrigin?.id" @update:model-value="changeDestination"
            return-object item-title="accountNumberFormat" item-value="id" :rules="[validator.required]"
            :items="userAccountsDestination" label="Account destino"></VSelect>
        </VCol>
        <VCol cols="12" md="9" class="mx-auto">
          <VTextField v-model="form.amount" :disabled="disabledForm" @keyup="moneyInput($event)"
            :rules="[validator.requiredAmount]" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
            type="text" label="Amount" />
        </VCol>
        <VCol cols="12" md="9" class="mx-auto" v-if="type != 'outer' && type!='crypto'">
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
              <VListItem  v-if="type == 'outer'">
                <VListItemTitle>
                  Payment method: {{ accountDestination?.paymentMethod?.name }}
                </VListItemTitle>
              </VListItem>
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
              <VListItem  v-if="type != 'outer' && type!='crypto'">
                <VListItemTitle>
                  Comments: {{ form.comments }}
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>
                  <VBtnSecondary @click="disabledForm = !disabledForm" class="mr-2" min-width="100px">Update
                  </VBtnSecondary>
                  <VBtnPrimary @click="confirmTransfer">Procesar transferencia</VBtnPrimary>
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>

      </VCol>

    </VRow>
    <DialogConfirm :title="'Confirmar transferencia'" :content="'Ingresa el codigo que fue enviado a tu tlf'"
      :dialog="dialogConfirm" @close="dialogConfirm = false" @cancel="auth.getResendCodeSms()"  :btnCancelText="'Resend code'" :btnAcceptText="'Confirm'" @ok="processTransfer">

      <VForm ref="formCodeTransfer">
        <VRow class="mt-2">
          <VCol cols="12">
            <VTextField v-model="sms_token" density="compact" :rules="[validator.required]" label="sms token" />
          </VCol>
        </VRow>

      </VForm>
    </DialogConfirm>
  </VForm>
</template>