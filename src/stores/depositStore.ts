import { useRouter } from 'vue-router'
import { helperStore } from './../helper'
import { toast, ToastOptions } from 'vue3-toastify';
import { transformAmount } from '@/validator';


export const depositStore = defineStore('deposit', () => {
  const helper = helperStore()
  const {url, items, item, baseUrl, pagination } = storeToRefs(helper)
  pagination.value.currentPage = 1

  baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
  url.value = 'api/clients/recharges'

  const router = useRouter()

  const form = ref({
    business_bank_account_id: null,
    payment_method_id: 0,
    account_id: '',
    amount: "0,00",
    comments: '',
  })
const loadingList = ref<boolean>(false)
  const getDeposits = () => {
    loadingList.value = true
    baseUrl.value = import.meta.env.VITE_RECHEARBLE_API

    let url = `api/clients/recharges`
    // let params = helper.paginated
    let   params = {
      perPage: 5,
      currentPage: 1,
      paginated: 1
    }
    helper.http(url, 'get', { params }).then((res: any) => {
      let deposits: Deposit[] = res.data.data
      items.value = deposits
    loadingList.value = false

    })
  }
  const index = () =>{
    loadingList.value = true
    helper.index().then((res: any) => {
    loadingList.value = false

    })
  }

  const selectItem = (element: any) => {
    item.value = element
  }

  const payment_methods = computed(() => {
    if (bussinness_bank.value.length === 0) return []
    let methods: PaymentMethod[] = []
    bussinness_bank.value.map((element: any) => {
      if(element.paymentMethod){
        if (!methods.find(item => item.id === element.paymentMethod.id)) {
          methods.push(element.paymentMethod)
        }
      }
    })
    return methods
  })

  const bussinness_bank = ref([])

  const getBussinessBank = () => {
  baseUrl.value = import.meta.env.VITE_API_URL

    let url = `/api/business-bank-accounts`
    helper.http(url, 'get').then((res: any) => {
      bussinness_bank.value = res.data.data
    })
  }

  const steps = ref(1)

  const createDeposit = () => {
  baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
console.log(transformAmount(form.value.amount))
    let url = `api/clients/recharges`
    let data = {
      business_bank_account_id: form.value.business_bank_account_id,
      account_id: form.value.account_id,
      amount:transformAmount(form.value.amount),
      comments: form.value.comments,
    }

    helper.http(url, 'post', { data },'Deposito creado correctamente',).then(res => {
      steps.value = 1
      form.value = {
        business_bank_account_id: null,
        payment_method_id: 0,
        account_id: '',
        amount: "0,00",
        comments: '',
      }
      index()
      router.push('/deposit')
    })
  }

  const showModal = ref<boolean>(false)
  const uploadVoucher = (voucher: any, id: number) => {
    if(!voucher){
    toast('Cargue el comprobante', {
      theme: 'colored',
        type: 'warning',
      
    })
    return
  }
    baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
console.log(id, voucher)
    let url = `/api/clients/recharges/${id}/voucher`
    let data = new FormData()
    data.append('voucher', voucher)

    helper.http(url, 'post', { data },'Voucher subido correctamente').then(() => {
      
      index()
      showModal.value = false
    })
  }

  return {
    getDeposits,
    payment_methods,
    getBussinessBank,
    bussinness_bank,
    form,
    steps,
    createDeposit,
    selectItem,
    uploadVoucher,
    showModal,
    loadingList,
    index
  }
})

interface PaymentMethod {
  id: number
  name: string
  description: string
  created_at?: any
}

interface Currency {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: any
}

interface BankAccountType {
  id: number
  name: string
  description?: any
  created_at?: any
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
  currency: Currency
  bankAccountType: BankAccountType
  country: Country
}

interface Currency2 {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: any
}

interface AccountType {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
}

interface OperationStatus {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
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

interface Voucher {
  id: number
  imageable_type: string
  imageable_id: number
  url: string
  created_at: Date
  updated_at: Date
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

interface Link {
  url: string
  label: string
  active: boolean
}

interface RootObject {
  current_page: number
  data: Deposit[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url?: any
  path: string
  per_page: number
  prev_page_url?: any
  to: number
  total: number
}
