
<script setup lang="ts">
import { transfersStore } from '@/stores/TransfersStore';
import { requiredAmount, required, amountFormat } from '@/validator';
import { accountUserStore } from '@/stores/AccountUserStore';
import { authStore } from '@/stores/AuthStore';
import DialogConfirm from '@/views/global/DialogConfirm.vue';
import { useDisplay } from 'vuetify'

const { lgAndUp, mdAndDown, xlAndUp } = useDisplay()

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

const { form, addressesInner, addressesOuter, addressesCrypto, dialogConfirm, sms_token, paramsSimule, disabledForm, objectSimule } = storeToRefs(transfer)
disabledForm.value = false

form.value = {
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

const accountOrigin = ref(null)
const accountDestination = ref(null)
const userAccountsDestination = ref([])
const accountsUser = computed(()=> {
  if(props.type == 'crypto')
  return user_accounts.value.filter(res => res.currency?.category?.name == 'CRYPTO')
  else return user_accounts.value
}
)

const changeOrigin = () => {
  form.value.origin_account_id = accountOrigin?.value.id
  form.value.destination_account_id = null
  accountDestination.value = null
  paramsSimule.value.from = accountOrigin?.value.currency?.abbreviation
  switch (props.type) {
    case 'own':
      userAccountsDestination.value = user_accounts.value.filter(res => (res.id != accountOrigin?.value.id))
      userAccountsDestination.value.map(res => {
        res.idAccount = res.id
      })
      break;
    case 'inner':
      userAccountsDestination.value = addressesInner.value
      userAccountsDestination.value.map(res => {
        res.idAccount = res.account?.id
        res.accountNumberFormat = `${res.account?.accountNumber} ( ${res?.account?.currency?.abbreviation})`
        res.accountNumber = res.account?.accountNumber
      })
      break;
    case 'outer':
      userAccountsDestination.value = addressesOuter.value
      userAccountsDestination.value.map(res => {
        res.idAccount = res.id
        res.accountNumberFormat = `${res?.accountNumber} ( ${res?.currency?.abbreviation})`
      })
      break;
    case 'crypto':
      userAccountsDestination.value = addressesCrypto.value.filter(res => (res.currency?.id == accountOrigin?.value.currency?.id))
      userAccountsDestination.value.map(res => {
        res.idAccount = res.id
        res.accountNumberFormat = `${res.walletAddress} ( ${res?.currency?.abbreviation})`
        res.accountNumber = res.walletAddress
      })
      break;

    default:
      break;
  }


}
const changeDestination = () => {
  form.value.destination_account_id = accountDestination?.value.idAccount
  switch (props.type) {
    case 'own':
      paramsSimule.value.to = accountDestination?.value.currency?.abbreviation
      break;
    case 'inner':
      paramsSimule.value.to = accountDestination?.value.account?.currency?.abbreviation
      break;
    case 'outer':
      paramsSimule.value.to = accountDestination?.value.currency?.abbreviation
      break;
    case 'crypto':
      paramsSimule.value.to = accountDestination?.value.currency?.abbreviation
      
      break;

    default:
      break;
  }

}
const confirmTransfer = () => {
  switch (props.type) {
      case 'own':
        transfer.createTranferOwn()
        break;
      case 'inner':
      auth.getResendCodeSms()
    dialogConfirm.value = true
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

  // if (props.type == "own")
  //   transfer.createTranferOwn()
  // else {
  //   auth.getResendCodeSms()
  //   dialogConfirm.value = true
  // }
}

const createTransfer = async () => {
  const { valid } = await formCreateTransfer.value.validate()
  if (!valid) return
  if (paramsSimule.value.to != paramsSimule.value.from)
    transfer.getSimuleTransfer()
  else disabledForm.value = true

}
const processTransfer = async () => {
  const { valid } = await formCodeTransfer.value.validate()
  if (!valid) return
  if (sendCodeSms.value) {

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

switch (props.type) {
  case 'own':
    paramsSimule.value.operation_category_id = 2
    break;
  case 'inner':
    transfer.getAddressInner()
    paramsSimule.value.operation_category_id = 3
    break;
  case 'outer':
    transfer.getAddressOuter()
    paramsSimule.value.operation_category_id = 4
    break;
  case 'crypto':
    transfer.getAddressCrypto()
    paramsSimule.value.operation_category_id = 5
    break;

  default:
    break;
}

</script>

<template>
  <VForm @submit.prevent="createTransfer" ref="formCreateTransfer">
    <VRow>
      <VCol cols="12" md="6">
       <!-- <pre> {{ userAccountsDestination }}</pre> -->
        <VCol cols="12" md="9" class="mx-auto">
          <VSelect v-model="accountOrigin" :disabled="disabledForm" @update:model-value="changeOrigin" return-object
            item-title="accountNumberFormat" item-value="id" :rules="[validator.required]" :items="accountsUser"
            label="Account origin"></VSelect>
        </VCol>
        <VCol cols="12" md="9" class="mx-auto ">
          <VBtnSecondary density="compact" :disabled="disabledForm" v-if="type != 'own'" class="mb-2"
            @click="$emit('createBeneficiary')">Agregar
            beneficiario</VBtnSecondary>
          <VSelect v-model="accountDestination" :disabled="disabledForm || !accountOrigin?.id"
            @update:model-value="changeDestination" return-object item-title="accountNumberFormat" item-value="idAccount"
            :rules="[validator.required]" :items="userAccountsDestination"
            :label="type == 'crypto' ? 'Wallet address:' : 'Cuenta destino:'"></VSelect>
        </VCol>
        <VCol cols="12" md="9" class="mx-auto">
          <VTextField v-model="form.amount" :disabled="disabledForm" @keyup="moneyInput($event)"
            :rules="[validator.requiredAmount]" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"
            type="text" label="Amount" />
        </VCol>
        <VCol cols="12" md="9" class="mx-auto" v-if="type != 'outer' && type != 'crypto'">
          <VTextarea v-model="form.comments" :disabled="disabledForm" label="Comments (optional)" />
        </VCol>
        <VCol cols="12" md="9" class="mx-auto justify-end">
          <VBtnPrimary type="submit" min-width="100px" :disabled="disabledForm">Create</VBtnPrimary>
        </VCol>
      </VCol>
      <VCol cols="1" v-if="disabledForm">
        <VIcon :size="xlAndUp ? '100' :'50'" >mdi-chevron-double-right</VIcon>
      </VCol>
      <VCol cols="12" md="5" v-if="disabledForm">
        <VCard elevation="0" border>
          <VCardTitle>Detalle de la transferencia</VCardTitle>
          <VCardText>
            <VList>
              <VListItem v-if="type == 'outer'">
                <VListItemTitle>
                  Payment method: {{ accountDestination?.paymentMethod?.name }}
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>
                  Cuenta origen: {{ accountOrigin?.accountNumber }}
                </VListItemTitle>
              </VListItem>
              <VListItem v-if="type == 'crypto'">
                <VListItemTitle>
                  Network: {{ accountDestination?.cryptoCurrencyNetwork?.name }}
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>
                  {{ type == 'crypto' ? 'Wallet address:' : 'Cuenta destino:' }} {{ accountDestination?.accountNumber }}
                </VListItemTitle>
              </VListItem>
              <VListItem>
                <VListItemTitle>
                  Enviarás: {{ form.amount }} {{ accountOrigin?.currency?.abbreviation }}
                </VListItemTitle>
              </VListItem>
              <VListItem v-if="paramsSimule?.to != paramsSimule?.from">
                <VListItemTitle>
                  Recibirás: {{ Intl.NumberFormat(["ban", "id"]).format(objectSimule?.rates[paramsSimule.to]) }} {{
                    paramsSimule.to }}
                </VListItemTitle>
              </VListItem>
              <VListItem v-if="type != 'outer' && type != 'crypto'">
                <VListItemTitle>
                  Comments: {{ form.comments }}
                </VListItemTitle>
              </VListItem>
              
            </VList>
            <VRow class="justify-center">
              <VBtnSecondary @click="disabledForm = !disabledForm" class="mr-2" min-width="100px">Update
                  </VBtnSecondary>
                  <VBtnPrimary @click="confirmTransfer">Procesar transferencia</VBtnPrimary>
            </VRow>
          </VCardText>
        </VCard>

      </VCol>

    </VRow>
    <DialogConfirm :title="'Confirmar transferencia'" :content="'Ingresa el codigo que fue enviado a tu tlf'"
      :dialog="dialogConfirm" @close="dialogConfirm = false" @cancel="auth.getResendCodeSms()"
      :btnCancelText="'Resend code'" :btnAcceptText="'Confirm'" @ok="processTransfer">

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