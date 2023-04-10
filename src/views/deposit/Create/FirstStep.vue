<template>
  <VForm @submit.prevent="() => { }">
    <VRow class="mx-4 " style="gap: 80px;">
      <VCol cols="12">
        <VRow>
          <VCol cols="12" md="9">
            <div>
              <p>Select payment method</p>

              <VRow class="d-flex gap-4 mb-2 mb-md-8  pa-4 " style="border:1px solid #beb9b9; border-radius: 8px;">
                <VBtn min-width="200px"  
                  :variant="form.payment_method_id == item.id ? 'tonal' : 'outlined'" v-for="item in deposit.payment_methods"
                  @click="selectPaymentMethod(item)" :color="form.payment_method_id == item.id ? 'primary' : 'primary'">
                  {{ item.name }}
                </VBtn>
              </VRow>
            </div>
            <div v-if="form.payment_method_id">
              <p>Select account</p>

              <VRow class="d-flex gap-4 pa-4" style="border:1px solid #beb9b9; border-radius: 8px;" >
                <VBtn min-width="200px"
                  :variant="form.account_id == item.id ? 'tonal' : 'outlined'" v-for="item in filterAccounts"
                  @click="selectAccount(item)" :color="form.account_id == item.id ? 'primary' : 'primary'">
                  {{ item.accountNumber }} ( {{ item.balance }} {{ item.currency.abbreviation }})
                </VBtn>
              </VRow>
            </div>

          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="9" class="d-flex mt-4 justify-center">
        <VBtnPrimary min-width="150px" type="button" :disabled="!form.payment_method_id || !form.account_id"
          @click="goSecondStep">
          Next
        </VBtnPrimary>

      </VCol>
    </VRow>
  </VForm>
</template>
 
<script setup lang="ts">
import { Account } from '@/interfaces/Account/Account.model';
import { Currency } from '@/interfaces/Currency/Currency.model';
import { accountUserStore } from '@/stores/AccountUserStore';
import { depositStore } from '@/stores/depositStore';
const account = accountUserStore()

const deposit = depositStore()
const { form, bussinness_bank, steps } = storeToRefs(deposit)
const { items: user_accounts } = storeToRefs(account)

deposit.getBussinessBank()
account.getAccounts()

const selectPaymentMethod = (element: any) => {
  form.value.payment_method_id = element.id
  form.value.account_id = ''
  form.value.business_bank_account_id = null
}

const goSecondStep = () => {
  steps.value++
}
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
  bussinness_bank.value.forEach((element: any) => {
    if (element.paymentMethod) {
      if (form.value.payment_method_id === element.paymentMethod.id) {
        currencies.push(element.currency)
      }
    }
  })
  return currencies
})

const selectAccount = (element: any) => {
  form.value.account_id = element.id
  form.value.business_bank_account_id = null

}

</script>
 
 