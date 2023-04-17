import { Account } from '@/interfaces/Account/Account.model';
import { Currency } from '@/interfaces/Currency/Currency.model';
import { defineStore } from 'pinia';
import { ref } from "vue";
import { toast } from 'vue3-toastify';
import { helperStore } from './../helper';

export const accountUserStore = defineStore('account-user', ()=>{
  const helper = helperStore()
  const {baseUrl} = storeToRefs(helper)

  baseUrl.value = import.meta.env.VITE_API_URL

  const items = ref<Account[]>([])
  const item = ref<Account>()
  const currency_id = ref<any>(null)

  const getAccounts = () => {
  baseUrl.value = import.meta.env.VITE_API_URL
    
    let url = '/api/accounts'
    helper.http(url,'get')

        .then((res:any) => {
          items.value = []
          res.data.data.map((res:any)=>  items.value.push({...res, accountNumberFormat: `${res.accountNumber} (${Intl.NumberFormat(["ban", "id"]).format(res.balance)} ${res?.currency?.abbreviation})` }))
        })
        .catch(err => {
          console.log(err)
        })
  }
  
  const openModal = ref(false);
  
  const createAccount = (currency:number):Promise<boolean> => {
    return new Promise( async (resolve) => {
      baseUrl.value = import.meta.env.VITE_API_URL
      let url = '/api/accounts'
      let data = {
        currency_id : currency
      }
      console.log('aqui2')
      await helper.http(url,'post',{data})
      console.log('terminado')
        getAccounts()
        toast('Cuenta creada correctamente', {
          theme: 'colored',
            type: 'success',
          
        })
        currency_id.value = null
        openModal.value= false
        resolve(true)
    })
  }

  
  const currencies = ref<Currency[]>([])

  const getCurrencies = () => {
    baseUrl.value = import.meta.env.VITE_API_URL
    let url = `/api/currencies`

    helper.http(url, 'get').then(
        (res: any) => {
          currencies.value = res.data.data.map((res:any) => { return { ...res, nameCategory: `${res.name} (${res.category?.name})` }})
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
 
})
