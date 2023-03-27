<template>
  <VForm @submit.prevent="createDeposit()" ref="formDeposit">
    <VRow>
      <VCol cols="12" lg="6">
        <VRow>

          <VCol cols="12" md="9" class="mx-auto">
            <v-select v-model="form.business_bank_account_id" :rules="[validator.required]" :items="filterBussinessAccount" item-title="bank"
              item-value="id" label="Select Bank"></v-select>

          </VCol>
          <VCol cols="12" md="9" class="mx-auto">
            <VTextField v-model="form.amount" @keyup="moneyInput($event)"  :rules="[validator.requiredAmount]"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" type="text" label="Amount" />

          </VCol>
          <VCol cols="12" md="9" class="mx-auto">
            <VTextarea v-model="form.comments" label="Comments (optional)" />
          </VCol>

        </VRow>

      </VCol>
      <!-- 👉 Support -->
      <VCol cols="12" lg="6" v-if="selectBank">

        <VCard class="text-center">
          <v-btn title="Copiar datos para el deposito" @click="clipBoard(selectBank)" icon variant="tonal"
            position="absolute" style="right: 0px;">
            <v-icon color="primary">mdi-clipboard-text-outline</v-icon>
          </v-btn>
          <VCardText class="d-flex flex-column justify-center align-center">
            <VAvatar color="primary" variant="tonal" size="50" class="mb-4">
              <VIcon size="2rem" icon="mdi-bank" />
            </VAvatar>

            <h6 class="text-h6">Deposit Account</h6>
          </VCardText>

          <VCardText class="text-left">
            <b>Account Holder:</b> {{ selectBank?.accountHolder ?? '' }} <br />
            <b>Account Number:</b> {{ selectBank?.accountNumber ?? '' }} <br />
            <b>Swift Code:</b> {{ selectBank?.swiftCode ?? '' }} <br />
            <b>Address:</b> {{ selectBank?.address ?? '' }} <br />
            <b>Payment Method:</b> {{ selectBank?.paymentMethod.name ?? '' }} <br />
            <b>Currency:</b> {{ selectBank?.currency.abbreviation ?? '' }} <br />
          </VCardText>

        </VCard>
      </VCol>
      <!-- 👉 submit and reset button -->
      <VCol offset-md="3" cols="12" md="9" class="d-flex mt-5">
        <VBtnSecondary min-width="150px" type="button" @click="deposit.steps--">
          Back
        </VBtnSecondary>

        <VBtnPrimary min-width="150px" class="ml-2" type="submit"
          :disabled="!form.amount || !form.business_bank_account_id" >
          Create Deposit
        </VBtnPrimary>
      </VCol>
    </VRow>
  </VForm>
</template>

<script setup lang="ts">
import { accountUserStore } from '@/stores/AccountUserStore';
import { depositStore } from '@/stores/depositStore';
import { toast, ToastOptions } from 'vue3-toastify';
import { requiredAmount,required, amountFormat } from '@/validator';

const formDeposit = ref<any>()
  const validator = { required, requiredAmount }

const account = accountUserStore()
const deposit = depositStore()
const { form, bussinness_bank } = storeToRefs(deposit)
const { items: user_accounts } = storeToRefs(account)

const filterBussinessAccount = computed(() => {
  if (bussinness_bank.value.length === 0) return []
  let bank_accounts: BussinessAccountInterfaz[] = []
  bussinness_bank.value.map((element: BussinessAccountInterfaz) => {
    if (element.paymentMethod) {
      if (element.paymentMethod.id == form.value.payment_method_id) {
        bank_accounts.push(element)
      }
    }
  })
  return bank_accounts
})
const moneyInput = (event: string) => {
  form.value.amount = amountFormat(event);
}
const selectBank = computed(() => {
  if (!form.value.business_bank_account_id) return null
  let bank: BussinessAccountInterfaz = bussinness_bank.value.find((element: BussinessAccountInterfaz) => element.id === form.value.business_bank_account_id)
  // console.log('banco',bank)
  return bank
})
const clipBoard = (item: BussinessAccountInterfaz) => {
  console.log(item)
  navigator.clipboard.writeText(`Account Holder: ${item.accountHolder},
                                Account Number:${item.accountNumber},
                                Swift Code: ${item?.swiftCode ?? ''},
                                Address: ${item?.address ?? ''},
                                Payment Method: ${item?.paymentMethod.name ?? ''},
                                Currency: ${item?.currency.abbreviation ?? ''}`)
    .then(() => {
      toast('Datos copiados en el portapapeles', {
        theme: 'colored',
        type: 'success',

      })
    })
    .catch((err) => { console.log("Something went wrong", err) });
}

const createDeposit = async() => {
  const { valid } = await formDeposit.value.validate()
  if (!valid) return
  deposit.createDeposit()
}
const selectAccount = (element: any) => {
  form.value.account_id = element.id
}

interface PaymentMethod {
  id: number
  name: string
  description: string
  created_at: Date
}

interface Currency {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt: Date
}

interface BankAccountType {
  id: number
  name: string
  description: string
  created_at: Date
}

interface Country {
  id: number
  name: string
  abbreviation: string
  phone_code: string
  citizenship: string
  description?: any
  created_at: Date
}

interface BussinessAccountInterfaz {
  id: number
  bank: string
  swiftCode: string
  accountHolder: string
  accountNumber: string
  address: string
  iban: string
  reference?: any
  createdAt: Date
  paymentMethod: PaymentMethod
  currency: Currency
  bankAccountType: BankAccountType
  country: Country
}
</script>
