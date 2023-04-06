<script setup lang="ts">
import { helperStore } from '@/helper';
import { depositStore } from '@/stores/depositStore';
import DialogBase from '@/views/global/Dialog.vue'

const deposit = depositStore()
deposit.index()
const helper = helperStore()

const { showModal } = storeToRefs(deposit)
const { item } = storeToRefs(helper)


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



<template>
    <DialogBase :dialog="showModal" :widthDialog="'800px'" @close="showModal = false">
      <template #content>
      contenido
      </template>
  
      <template #actions>
        <VRow class="mx-auto text-center justify-center">
          <VBtn min-width="150px" @click="deposit.uploadVoucher(voucher, item.id)"  variant="flat">Upload</VBtn>
        </VRow>
      </template>
    </DialogBase>
  </template>
  
 
  <style scoped></style>
  