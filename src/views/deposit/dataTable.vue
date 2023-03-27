<script lang="ts" setup>
import { helperStore } from '@/helper';
import { depositStore } from '@/stores/depositStore';
import dayjs from 'dayjs';
import UploadVoucher from './UploadVoucher.vue';
import { useI18n } from 'vue-i18n';
import TableBasic from '@/views/global/Table.vue'

const { t } = useI18n()
// const item = ref<Deposit>()
const helper = helperStore()

const { url, baseUrl } = storeToRefs(helper)
baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
url.value = '/api/clients/recharges'

const deposit = depositStore()
deposit.index()

const { showModal } = storeToRefs(deposit)
const { item } = storeToRefs(helper)
const headers = ref([
  t('tables.headersDeposits.Id'),
  t('tables.headersDeposits.Date'),
  t('tables.headersDeposits.Account'),
  t('tables.headersDeposits.Amount'),
  t('tables.headersDeposits.Currency'),
  t('tables.headersDeposits.Status'),
  t('tables.headersDeposits.Actions')

])
const selectDeposit = (deposit: Deposit) => {
  item.value = deposit;
  showModal.value = true;
}

const desserts = computed(() => {
  let array: Array<object> = []
  console.log(helper.items)
  if (helper.items)
    helper.items.map((res: Deposit) => array.push(
      {
        ...res, desserts: {
          id: res.transactionNumber, date: dayjs(res.createdAt).format('DD/MM/YYYY'), account: res.destination?.accountNumber, amount:  Intl.NumberFormat(["ban", "id"]).format(res.amount), currency: res.destination?.currency?.abbreviation, status: res.operationStatus?.name
        }
      }))
  return array
})

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
    case 'EN ESPERA DE COMPROBANTE':
      return 'text-pending'
    case 'EN VERIFICACION':
      return 'text-verified'
    case 'failed':
      return '#ff0000'
    case 'ACEPTADO':
      return 'text-success'
    default:
      return '#000000'
  }
}
</script>

<template>
  <TableBasic @selectDeposit="selectDeposit($event)" :iconVoucher="true" :headers="headers" :desserts="desserts" />
  <VRow class="mt-2 px-5 py-2">
    <VCol>
      <VRow>
        <VCol cols="4">
          <VSelect v-model="helper.pagination.perPage" :items="helper.perPage" label="Pagination"
            @update:modelValue="deposit.index()">
          </VSelect>
        </VCol>
      </VRow>
    </VCol>
    <VCol>
      <VPagination v-model="helper.pagination.currentPage" :length="helper.pagination.total"
        @update:model-value="helper.index"></VPagination>
    </VCol>
    <VCol></VCol>
  </VRow>
  <UploadVoucher v-if="showModal">
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
