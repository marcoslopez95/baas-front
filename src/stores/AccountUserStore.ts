import { defineStore } from 'pinia';
import { ref } from "vue";
import { helperStore } from './../helper';
import { toast, ToastOptions } from 'vue3-toastify';

export const accountUserStore = defineStore('account-user', ()=>{
  const helper = helperStore()
  const {baseUrl} = storeToRefs(helper)

  baseUrl.value = import.meta.env.VITE_API_URL

  const items = ref<accountUserInterfaz[]>([])
  const item = ref<accountUserInterfaz>()
  const currency_id = ref<any>(null)

  const getAccounts = () => {
  baseUrl.value = import.meta.env.VITE_API_URL
    
    let url = '/api/accounts'
    helper.http(url,'get')

        .then((res:any) => {
          items.value = []
          res.data.data.map(res=>  items.value.push({...res, accountNumberFormat: `${res.accountNumber} (${Intl.NumberFormat(["ban", "id"]).format(res.balance)} ${res?.currency?.abbreviation})` }))
        })
        .catch(err => {
          console.log(err)
        })
  }
  
  const openModal = ref(false);
  const createAccount = (currency:number) => {
    baseUrl.value = import.meta.env.VITE_API_URL
    let url = '/api/accounts'
    let data = {
      currency_id : currency
    }
    helper.http(url,'post',{data})
    .then((res:any) => {
      getAccounts()
      toast('Cuenta creada correctamente', {
        theme: 'colored',
          type: 'success',
        
      })
      currency_id.value = null
      openModal.value= false
    })
  }

  
  const currencies = ref<Currency[]>([])

  const getCurrencies = () => {
    baseUrl.value = import.meta.env.VITE_API_URL
    let url = `/api/currencies`

    helper.http(url, 'get').then(
        (res: any) => {
          currencies.value = res.data.data
        })
  }

  const deleteAccount = (id:number) => {
    let url = `/api/accounts/${id}`

    helper.http(url, 'delete').then(
        (res: any) => {
          getAccounts()
          toast('Cuenta eliminada correctamente', {
            theme: 'colored',
              type: 'success',
            
          })
        })
  }
  return {
    getAccounts,
    items,
    item,
    openModal,
    createAccount,
    currencies,
    getCurrencies,
    deleteAccount,
    currency_id
  }

  
interface Currency {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: any
}

  interface accountUserInterfaz {
    "id": number,
    "accountNumber": string,
    "balance": number,
    "transferAccountantBalance": number,
    "rechargeAccountantBalance": number,
    "createdAt": Date,
    "currency": currencyInterfaz,
    "accountType": accountTypeInterfaz
  }

  interface currencyInterfaz{
    "id": number,
    "name": string,
    "abbreviation": string,
    "symbol": string,
    "description": string,
    "createdAt"?: Date
  }
  interface accountTypeInterfaz{
    "id": number,
    "name": string,
    "description": string,
    "createdAt": Date,
    "updatedAt": Date
  }
 
})
