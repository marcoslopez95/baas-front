<template>
  <VForm @submit.prevent="() => {}">
    <VRow   class="mx-4 " style="gap: 80px;">
      <VCol cols="12">
        <VRow no-gutters>
          <VCol
            cols="12"
            md="9"
          >
            <VRow class="d-flex gap-4">
              <VBtn
              min-width="200px" :class="form.account_id == item.id ? 'text-white' : ''"
                :variant="form.account_id == item.id ? 'flat' : 'tonal'" 
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
      <!-- <VBtn
      min-width="150px"
          type="button"
          variant="tonal"
          @click="deposit.steps--"
        >
          Back
        </VBtn> -->
        <VBtn
        min-width="150px"
          type="button"
          class="ml-2"
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
import { Account } from '@/interfaces/Account/Account.model';
import { BussinessBankAcount } from '@/interfaces/BussinessBankAccount/BussinessBankAccount.model';
import { Currency } from '@/interfaces/Currency/Currency.model';
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
  let accounts: Account[] = []
  user_accounts.value.forEach((element: Account) => {
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
  let currencies: Currency[] = []
  bussinness_bank.value.forEach((element: BussinessBankAcount) => {
    if(element.paymentMethod){
      if (form.value.payment_method_id === element.paymentMethod.id) {
        currencies.push(element.currency)
      }
    }
  })
  return currencies
})

const selectAccount = (element: any) => {
  form.value.account_id = element.id
}

</script>
