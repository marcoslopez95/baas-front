<template>
  <v-dialog
    v-if="showModal"
    v-model="showModal"
    max-width="800px"
    class=""
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
        <b>Account Holder:</b> {{ item.rechargeable?.accountHolder ?? '' }} <br />
        <b>Account Number:</b> {{ item.rechargeable?.accountNumber ?? '' }} <br />
        <b>Swift Code:</b> {{ item.rechargeable?.swiftCode ?? '' }} <br />
        <b>Address:</b> {{ item.rechargeable?.address ?? '' }} <br />
        <b>Payment Method:</b> {{ item.rechargeable?.paymentMethod.name ?? '' }} <br />
        <b>Currency:</b> {{ item.rechargeable?.currency.abbreviation ?? '' }} <br />
      </VCardText>

      <VCardText class="text-center">
        <div class="text-left row"><b>upload a voucher </b><br /></div>
        <label for="voucher">
          <VIcon
            v-if="prevImg == ''"
            size="150px"
            icon="mdi-upload"
          >
          </VIcon>
          <img
            v-else
            :src="prevImg"
            style="width: 150px; height: 150px"
            alt="voucher"
          />
        </label>
        <input
          type="file"
          style="display: none"
          id="voucher"
          name="voucher"
          @change="changeVoucher($event)"
        />
      </VCardText>
      <v-card-actions class="align-content-between">
        <VRow>
          <VCol>
            <v-btn
              color="primary"
              variant="text"
              @click="showModal = false"
            >
              Close
            </v-btn></VCol
          >
          <VCol></VCol>
          <VCol>
            <v-btn
              color="primary"
              variant="tonal"
              @click="deposit.uploadVoucher(voucher,item.id)"
            >
              Upload
            </v-btn></VCol
          >
        </VRow>
      </v-card-actions>
    </VCard>
  </v-dialog>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { depositStore } from '@/stores/depositStore';
const deposit = depositStore()
deposit.getDeposits()
const helper = helperStore()

const {showModal} = storeToRefs(deposit)
const {item} = storeToRefs(helper)


const prevImg = ref('')
const voucher = ref('')
const changeVoucher = (e: any) => {
  const file = voucher.value = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    const voucher = reader.result
    prevImg.value = `${voucher}`
  }
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
  currency: Currency2
  bankAccountType: BankAccountType
  country: Country
}
interface Deposit {
  id: number
  transactionNumber: string
  amount: string
  createdAt: Date
  rechargeable: Rechargeable
  account: Account
  voucher: Voucher
  operationStatus: OperationStatus
}

interface Account {
  id: number
  accountNumber: string
  balance: string
  transferAccountantBalance: string
  rechargeAccountantBalance: string
  createdAt: Date
  currency: Currency2
  accountType: AccountType
}
interface AccountType {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
}
interface Currency2 {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: any
}

interface Voucher {
  id: number
  imageable_type: string
  imageable_id: number
  url: string
  created_at: Date
  updated_at: Date
}
interface BankAccountType {
  id: number
  name: string
  description?: any
  created_at?: any
}
interface PaymentMethod {
  id: number
  name: string
  description: string
  created_at?: any
}
interface Rechargeable {
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
  currency: Currency2
  bankAccountType: BankAccountType
  country: Country
}

interface Country {
  id: number
  name: string
  abbreviation: string
  phone_code: string
  citizenship: string
  description?: any
  created_at?: any
}

interface OperationStatus {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
}
</script>

<style scoped></style>
