<script lang="ts" setup>
import { helperStore } from '@/helper';
import { depositStore } from '@/stores/depositStore';
import dayjs from 'dayjs';
import UploadVoucher from './UploadVoucher.vue';

// const item = ref<Deposit>()

const deposit = depositStore()
deposit.getDeposits()
const helper = helperStore()

const {showModal} = storeToRefs(deposit)
const {item} = storeToRefs(helper)

const selectDeposit = (deposit: Deposit) => {
  item.value = deposit;
  showModal.value = true;
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


const colorText = (item: Deposit) => {
  switch (item.operationStatus.name) {
    case 'EN PROCESO':
      return 'text-pending'
    case 'EN VERIFICACION':
      return 'text-verified'
    case 'failed':
      return '#ff0000'
    default:
      return '#000000'
  }
}
</script>

<template>
  <VTable
    height="250"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-uppercase">Transaction ID</th>
        <th class="text-center text-uppercase">Amount</th>
        <th class="text-center text-uppercase">Date</th>
        <th class="text-center text-uppercase">Currency</th>
        <th class="text-center text-uppercase">Status</th>
        <th class="text-center text-uppercase">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in helper.items"
        :key="i"
      >
        <td>{{ item.transactionNumber }}</td>
        <td class="text-center">
          <!-- {{ item.amount }} -->
          {{ new Intl.NumberFormat('de-DE').format(item.amount) }}
          
        </td>
        <td class="text-center">
          {{ dayjs(item.createdAt).format('DD/MM/YYYY') }}
        </td>
        <td class="text-center">
          {{ item.account.currency.symbol }}
        </td>
        <td class="text-center font-weight-bold" :class="colorText(item)">
          {{ item.operationStatus.name }}
          <!-- Letra bold  -->
          <!-- Naranja -> en proceso -->
          <!-- verde -> aceptado -->
          <!-- rojo -> rechazado -->
        </td>
        <td class="text-center">
        <!-- Si y solo si en proceso, cargar comprobante -->
          <VBtn 
            v-if="item.operationStatus.name == 'EN PROCESO'"
            @click="selectDeposit(item)"
            >
            <VIcon icon="mdi-upload" />
          </VBtn>
           <span v-else>-</span>
        </td>
      </tr>
    </tbody>
  </VTable>
  <UploadVoucher>
  </UploadVoucher>
</template>

<style>
.text-pending {
  color: #f37f0b
}

.text-verified {
  color: #410bf3
}

.text-success {
  color: #138104

}
.text-blocked {
  color: #b60000
}
</style>
