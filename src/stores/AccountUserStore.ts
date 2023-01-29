import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from "vue";
export const accountUserStore = defineStore('account-user', ()=>{
  const items = ref<accountUserInterfaz[]>([])
  const item = ref<accountUserInterfaz>()

  const getAccounts = () => {
    let url = '/api/accounts'
    let headers  = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    axios.get(url,{headers})
        .then(res => {
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
