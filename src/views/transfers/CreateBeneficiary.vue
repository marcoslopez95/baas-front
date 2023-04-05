<script setup lang="ts">
import { required, email } from '@/validator';
import DialogBase from '@/views/global/Dialog.vue'
import { transfersStore } from '@/stores/TransfersStore';
import { depositStore } from '@/stores/depositStore';
import { accountUserStore } from '@/stores/AccountUserStore';

const deposit = depositStore()

const account = accountUserStore()
const transfer = transfersStore()
const { bussinness_bank } = storeToRefs(deposit)

account.getCurrencies()

const { dialogBeneficiary, networksCrypto } = storeToRefs(transfer)
const props = defineProps({
  type: {
    type: String,
    required: true,
  }
})
const validator = { required, email }
const currenciesWithSelectPaymentMethod = computed(() => {
  if (bussinness_bank.value.length === 0) return []
  let currencies: currencyInterfaz[] = []
  bussinness_bank.value.map((element: any) => {
    if (element.paymentMethod) {
      if (formCreateBeneficiaryOuter.value.payment_method_id === element.paymentMethod.id) {
        currencies.push(element.currency)
      }
    }
  })
  return currencies
})
//currencies
const formCreateBeneficiaryInner = ref<createBeneficiaryInner>({
  account_id: "",
  comments: ""
})

const formCreateBeneficiaryOuter = ref<createBeneficiaryOuter>({
  payment_method_id: null,
  currency_id: null,
  bank: "",
  name: "",
  account_number: "",
  iban: "",
  swift: "",
  country: "",
  reference: ""
})
const formCreateBeneficiaryCrypto = ref<createBeneficiaryCrypto>({
  crypto_currency_network_id: null,
  currency_id: null,
  name: "",
  email: "",
  wallet_address: ""
})
const formCreateAccount = ref<any>()

const changePayment = () => {
  formCreateBeneficiaryOuter.value.currency_id = null
}
const createStore = async () => {
  const { valid } = await formCreateAccount.value.validate()
  if (!valid) return
  switch (props.type) {
    case 'inner':
      transfer.createAddressInner(formCreateBeneficiaryInner.value)

      break;
    case 'outer':
      transfer.createAddressOuter(formCreateBeneficiaryOuter.value)

      break;
    case 'crypto':
      transfer.createAddressCrypto(formCreateBeneficiaryCrypto.value)

      break;

    default:
      break;
  }


}

switch (props.type) {
  case 'outer':
    deposit.getBussinessBank()
    break;
  case 'crypto':
    transfer.getNetworksCrypto()
    break;

  default:
    break;
}
interface currencyInterfaz {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: Date
}
interface createBeneficiaryInner {
  account_id: string,
  comments: string
}
interface createBeneficiaryOuter {
  payment_method_id: number,
  currency_id: number,
  bank: string,
  name: string,
  account_number: string,
  iban: string,
  swift: string,
  country: string,
  reference: string
}
interface createBeneficiaryCrypto {
  crypto_currency_network_id: number,
  currency_id: number,
  name: string,
  email: string,
  wallet_address: string
}

</script>

<template>
  <DialogBase :dialog="dialogBeneficiary"
    :widthDialog="props.type == 'outer' || props.type == 'crypto' ? '800px' : '400px'" @close="dialogBeneficiary = false">
    <template #title><span>Create Beneficiary</span></template>
    <template #content>
      <VForm ref="formCreateAccount" @submit.prevent="createStore()">
        <VRow v-if="props.type == 'inner'">
          <VCol cols="12">
            <VTextField v-model="formCreateBeneficiaryInner.account_id" density="compact" :rules="[validator.required]"
              label="Account number" />
          </VCol>
          <VCol cols="12">
            <VTextField v-model="formCreateBeneficiaryInner.comments" density="compact" label="Comments" />
          </VCol>
        </VRow>
        <VRow v-else-if="props.type == 'outer'">
          <VCol cols="12" md="6">
            <VSelect @update:model-value="changePayment" item-title="name" item-value="id"
              :items="deposit.payment_methods" v-model="formCreateBeneficiaryOuter.payment_method_id" density="compact"
              :rules="[validator.required]" label="Payment method"></VSelect>
          </VCol>
          <VCol cols="12" md="6">
            <VSelect item-title="abbreviation" :disabled="!formCreateBeneficiaryOuter.payment_method_id" item-value="id"
              :items="currenciesWithSelectPaymentMethod" v-model="formCreateBeneficiaryOuter.currency_id"
              density="compact" :rules="[validator.required]" label="Currency"></VSelect>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryOuter.bank" density="compact" label="Bank"
              :rules="[validator.required]" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryOuter.name" density="compact" label="Name"
              :rules="[validator.required]" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryOuter.account_number" density="compact" label="Account number"
              :rules="[validator.required]" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryOuter.iban" density="compact" label="Iban"
              :rules="[validator.required]" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryOuter.swift" density="compact" label="Swift"
              :rules="[validator.required]" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryOuter.country" density="compact" label="Country"
              :rules="[validator.required]" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryOuter.reference" density="compact" label="Reference" />
          </VCol>
        </VRow>
        <VRow v-else-if="props.type == 'crypto'">
          <VCol cols="12" md="6">
            <VSelect item-title="name" item-value="id" :items="networksCrypto"
              v-model="formCreateBeneficiaryCrypto.crypto_currency_network_id" density="compact"
              :rules="[validator.required]" label="Network"></VSelect>
          </VCol>
          <VCol cols="12" md="6">
            <VSelect item-title="abbreviation" item-value="id" :items="account.currencies"
              v-model="formCreateBeneficiaryCrypto.currency_id" density="compact" :rules="[validator.required]"
              label="Currency"></VSelect>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryCrypto.name" density="compact" label="Name"
              :rules="[validator.required]" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryCrypto.email" density="compact" label="Email"
              :rules="[validator.required, validator.email]" />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="formCreateBeneficiaryCrypto.wallet_address" density="compact" label="Wallet address"
              :rules="[validator.required]" />
          </VCol>
        </VRow>
      </VForm>
    </template>
    <template #actions>
      <VRow class="mx-auto text-center justify-center">
        <VBtn @click="createStore()" variant="flat">Store</VBtn>
      </VRow>
    </template>

  </DialogBase>
</template>