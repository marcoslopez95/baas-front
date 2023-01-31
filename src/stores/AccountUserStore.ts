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
  return {
    getAccounts,
    items,
    item
  }
})
