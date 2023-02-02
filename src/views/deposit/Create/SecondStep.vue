<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VRow no-gutters>
          <!-- 👉 First Name -->
          <VCol
            cols="12"
            md="3"
            class="my-auto"
          >
            <label for="firstName">Select Account</label>
          </VCol>

          <VCol
            cols="12"
            md="9"
          >
            <VRow class="d-flex gap-4">
              <VBtn
                class="text-white"
                v-for="item in filterAccounts"
                @click="selectAccount(item)"
                :color="form.account_id == item.id ? '#774488' : '#D684F1'"
              >
                {{ item.accountNumber }} ( {{ item.balance }} {{ item.currency.abbreviation }})
              </VBtn>
            </VRow>
          </VCol>
        </VRow>
      </VCol>

      
      <!-- 👉 submit and reset button -->
      <VCol
        offset-md="3"
        cols="12"
        md="9"
        class="d-flex mt-5"
      >
      <VBtn
          type="button"
          @click="deposit.steps--"
        >
          Back
        </VBtn>
        <VBtn
          type="button"
          :disabled="!form.account_id"
          @click="goNextStep"
        >
          Next
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>

<script setup lang="ts">
import { accountUserStore } from '@/stores/AccountUserStore';
import { depositStore } from '@/stores/depositStore';

const account = accountUserStore()
const deposit = depositStore()
const { form, bussinness_bank, steps } = storeToRefs(deposit)
const { items: user_accounts } = storeToRefs(account)
deposit.getBussinessBank()

account.getAccounts()

const goNextStep = () => {
  steps.value++
}
const filterAccounts = computed(() => {
  if (user_accounts.value.length === 0) return []
  let accounts: accountUserInterfaz[] = []
  user_accounts.value.map((element: accountUserInterfaz) => {
    for (let currency of currenciesWithSelectPaymentMethod.value) {
      if (element.currency.id == currency.id) {
        accounts.push(element)
      }
    }
  })
  return accounts
})

const currenciesWithSelectPaymentMethod = computed(() => {
  if (bussinness_bank.value.length === 0) return []
  let currencies: currencyInterfaz[] = []
  bussinness_bank.value.map((element: any) => {
    if (form.value.payment_method_id === element.paymentMethod.id) {
      currencies.push(element.currency)
    }
  })
  return currencies
})

const selectAccount = (element: any) => {
  form.value.account_id = element.id
}

interface accountUserInterfaz {
  id: number
  accountNumber: string
  balance: number
  transferAccountantBalance: number
  rechargeAccountantBalance: number
  createdAt: Date
  currency: currencyInterfaz
  accountType: accountTypeInterfaz
}

interface currencyInterfaz {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: Date
}
interface accountTypeInterfaz {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}
</script>
