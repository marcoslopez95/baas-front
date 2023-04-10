import { BussinessBankAcount } from '@/interfaces/BussinessBankAccount/BussinessBankAccount.model'
import { DepositCreateDto } from '@/interfaces/Deposit/Deposit.dto'
import { Deposit } from '@/interfaces/Deposit/Deposit.model'
import { PaymentMethod } from '@/interfaces/PaymentMethod/PaymentMethod.model'
import { transformAmount } from '@/validator'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { helperStore } from './../helper'

export const depositStore = defineStore('deposit', () => {
  const helper = helperStore()
  const { url, items, item, baseUrl, pagination } = storeToRefs(helper)
  pagination.value.currentPage = 1

  baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
  url.value = 'api/clients/recharges'

  const router = useRouter()

  const form = ref<DepositCreateDto>({
    business_bank_account_id: null,
    payment_method_id: 0,
    account_id: '',
    amount: '0,00',
    comments: '',
  })
  const loadingList = ref<boolean>(false)
  const getDeposits = () => {
    loadingList.value = true
    baseUrl.value = import.meta.env.VITE_RECHEARBLE_API

    let url = `api/clients/recharges`
    // let params = helper.paginated
    let params = {
      perPage: 5,
      currentPage: 1,
      paginated: 1,
    }
    helper.http(url, 'get', { params }).then((res: any) => {
      let deposits: Deposit[] = res.data.data
      items.value = deposits
      loadingList.value = false
    })
  }
  const index = () => {
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
    bussinness_bank.value.forEach(element => {
      if (element.paymentMethod) {
        if (!methods.find(item => item.id === element.paymentMethod.id)) {
          methods.push(element.paymentMethod)
        }
      }
    })
    return methods
  })

  const bussinness_bank = ref<BussinessBankAcount[]>([])

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
      amount: transformAmount(form.value.amount),
      comments: form.value.comments,
    }

    helper.http(url, 'post', { data }, 'Deposito creado correctamente').then(res => {
      steps.value = 1
      form.value = {
        business_bank_account_id: null,
        payment_method_id: 0,
        account_id: '',
        amount: '0,00',
        comments: '',
      }
      index()
      router.push('/deposit')
    })
  }

  const showModal = ref<boolean>(false)
  const uploadVoucher = (voucher: any, id: number) => {
    if (!voucher) {
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

    helper.http(url, 'post', { data }, 'Voucher subido correctamente').then(() => {
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
    index,
  }
})
