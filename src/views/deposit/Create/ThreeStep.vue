<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="6">
        <VCol cols="12">
            <!-- 👉 First Name -->
          <VRow no-gutters class="mb-3 mx-auto">

            <VCol
              cols="12"
              class="text-center"
            >
              <label for="firstName">Select Bussiness bank</label>
            </VCol>
          </VRow>
          <VRow no-gutters>

            <VCol
              cols="12"
              md="9"
              class="mx-auto"
            >
              <v-select
                v-model="form.business_bank_account_id"
                :items="filterBussinessAccount"
                item-title="bank"
                item-value="id"
                label="Select Bank"
              ></v-select>
            </VCol>
          </VRow>
        </VCol>

        <VCol cols="12">
          <VRow no-gutters>
            <!-- 👉 First Name -->
            <VCol
              cols="12"
              
              class="text-center"
            >
              <label for="firstName">Ammount</label>
            </VCol>
          </VRow>
            <VRow no-gutters>

            <VCol
              cols="12"
              md="7"
              class="mx-auto"
            >
              <VTextField
                v-model="form.amount"
                type="number"
              />
            </VCol>
          </VRow>
        </VCol>

        <VCol cols="12">
          <VRow no-gutters fluid>
            <!-- 👉 First Name -->
            <VCol
              cols="12"
              class="text-center"
            >
              <label for="firstName">Comments (optional)</label>
            </VCol>
          </VRow>
            <VRow no-gutters>

            <VCol
              cols="12"
        
              class="mx-auto"
            >
              <VTextarea
                v-model="form.comments"
              />
            </VCol>
          </VRow>
        </VCol>
      </VCol>
      <!-- 👉 Support -->
      <VCol
        cols="6"
       
      >
        <VCard class="text-center">
          <VCardText class="d-flex flex-column justify-center align-center">
            <VAvatar
              color="primary"
              variant="tonal"
              size="50"
              class="mb-4"
            >
              <VIcon
                size="2rem"
                icon="mdi-bank"
              />
            </VAvatar>

            <h6 class="text-h6">Deposit Account</h6>
          </VCardText>

          <VCardText class="text-left">
            <b>Account Holder:</b> {{ selectBank?.accountHolder ?? ''}} <br />
            <b>Account Number:</b> {{ selectBank?.accountNumber ?? ''}} <br />
            <b>Swift Code:</b> {{ selectBank?.swiftCode ?? ''}} <br />
            <b>Address:</b> {{ selectBank?.address ?? ''}} <br />
            <b>Payment Method:</b> {{ selectBank?.paymentMethod.name ?? ''}} <br />
            <b>Currency:</b> {{ selectBank?.currency.abbreviation ?? ''}} <br />
          </VCardText>

        </VCard>
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
          :disabled="!form.amount || !form.business_bank_account_id"
          @click="deposit.createDeposit"
        >
          Create Deposit
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
const { form, bussinness_bank } = storeToRefs(deposit)
const { items: user_accounts } = storeToRefs(account)

const filterBussinessAccount = computed(() => {
  if (bussinness_bank.value.length === 0) return []
  let bank_accounts: BussinessAccountInterfaz[] = []
  bussinness_bank.value.map((element: BussinessAccountInterfaz) => {
    if (element.paymentMethod.id == form.value.payment_method_id) {
      bank_accounts.push(element)
    }
  })
  return bank_accounts
})

const selectBank = computed(()=>{
  if(!form.value.business_bank_account_id) return null
  let bank: BussinessAccountInterfaz = bussinness_bank.value.find((element: BussinessAccountInterfaz) => element.id === form.value.business_bank_account_id )

  return bank
})

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
