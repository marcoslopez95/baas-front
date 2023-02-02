import { defineStore } from 'pinia';
import { ref } from "vue";
import { helperStore } from './../helper';
export const accountUserStore = defineStore('account-user', ()=>{
  const helper = helperStore()
  const items = ref<accountUserInterfaz[]>([])
  const item = ref<accountUserInterfaz>()

  const getAccounts = () => {
    let url = '/api/accounts'
    helper.http(url,'get')

        .then((res:any) => {
          items.value = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
  }
  
  const openModal = ref(false);
  const createAccount = (currency:number) => {
    let url = '/api/accounts'
    let data = {
      currency_id : currency
    }
    helper.http(url,'post',{data})
    .then((res:any) => {
      getAccounts()
      openModal.value= false
    })
  }

  
  const currencies = ref<Currency[]>([])

  const getCurrencies = () => {
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
    deleteAccount
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
