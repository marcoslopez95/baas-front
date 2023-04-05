import { defineStore } from 'pinia';
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { helperStore } from './../helper';
import { toast, ToastOptions } from 'vue3-toastify';
import { transformAmount } from '@/validator';

export const transfersStore = defineStore('transfers', ()=>{
  const helper = helperStore()
  const {url, items, item, baseUrl, pagination }  = storeToRefs(helper)

  baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
  // const items = ref<transferInterfaz[]>([])
  // const item = ref<transferInterfaz>()

  const router = useRouter()
const sms_token = ref(null)
  const form = ref({
    destination_account_id: null,
    origin_account_id: null,
    amount: "0,00",
    comments: '',
  })
  const addressesInner = ref([])
  const addressesOuter = ref([])
  const addressesCrypto = ref([])

const dialogBeneficiary = ref(false)
const loadingList = ref<boolean>(false)
const dialogConfirm = ref(false)
const indexOwn = () =>{
  url.value = 'api/clients/own-transfers'

  loadingList.value = true
  helper.index().then((res: any) => {
    loadingList.value = false
  })
}
const indexInner= () =>{
  url.value = 'api/clients/inner-transfers'

  loadingList.value = true
  helper.index().then((res: any) => {
    loadingList.value = false
  })
}

const indexOuter = () =>{
  url.value = 'api/clients/outer-transfers'

  loadingList.value = true
  helper.index().then((res: any) => {
    loadingList.value = false
  })
}

const indexCrypto = () =>{
  url.value = 'api/clients/crypto-transfers'

  loadingList.value = true
  helper.index().then((res: any) => {
    loadingList.value = false
  })
}

  const createTranferOwn = () => {
  baseUrl.value = import.meta.env.VITE_RECHEARBLE_API

    let url = '/api/clients/own-transfers'
    console.log(form.value)
    let data = {
      destination_account_id: form.value.destination_account_id,
      origin_account_id: form.value.origin_account_id,
      amount: transformAmount(form.value.amount),
      comments: form.value.comments,
    }
    helper.http(url,'post',{ data }, 'Transferencia creada correctamente')
    .then((res:any) => {
      dialogConfirm.value = false
     form.value =  {
        destination_account_id: null,
        origin_account_id: null,
        amount: "0,00",
        comments: '',
      }
      indexOwn()
      router.push('/transfers/own-transfers')
    
    })
  }
  const createTranferInner = () => {
    baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
  
      let url = '/api/clients/inner-transfers'
      console.log(form.value)
      let data = {
        sms_token: sms_token.value,
        destination_account_id: form.value.destination_account_id,
        origin_account_id: form.value.origin_account_id,
        amount: transformAmount(form.value.amount),
        comments: form.value.comments,
      }
      helper.http(url,'post',{ data }, 'Transferencia creada correctamente')
      .then((res:any) => {
        dialogConfirm.value = false
       form.value =  {
          destination_account_id: null,
          origin_account_id: null,
          amount: "0,00",
          comments: '',
        }
        indexInner()
        router.push('/transfers/inner-transfers')
      
      })
    }

    const createTranferOuter = () => {
      baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
    
        let url = '/api/clients/outer-transfers'
        console.log(form.value)
        let data = {
          sms_token: sms_token.value,
          outer_addressee_id: form.value.destination_account_id,
          account_id: form.value.origin_account_id,
          amount: transformAmount(form.value.amount)
        }
        helper.http(url,'post',{ data }, 'Transferencia creada correctamente')
        .then((res:any) => {
          dialogConfirm.value = false
         form.value =  {
            destination_account_id: null,
            origin_account_id: null,
            amount: "0,00",
            comments: '',
          }
          indexInner()
          router.push('/transfers/inner-transfers')
        
        })
      }
      const createTranferCrypto = () => {
        baseUrl.value = import.meta.env.VITE_RECHEARBLE_API
      
          let url = '/api/clients/outer-transfers'
          console.log(form.value)
          let data = {
            sms_token: sms_token.value,
            crypto_addressee_id: form.value.destination_account_id,
            account_id: form.value.origin_account_id,
            amount: transformAmount(form.value.amount)
          }
          helper.http(url,'post',{ data }, 'Transferencia creada correctamente')
          .then((res:any) => {
            dialogConfirm.value = false
           form.value =  {
              destination_account_id: null,
              origin_account_id: null,
              amount: "0,00",
              comments: '',
            }
            indexInner()
            router.push('/transfers/inner-transfers')
          
          })
        }
      

  const createAddressInner = (form: AddressesInnerInterface) => {
    baseUrl.value = import.meta.env.VITE_API_URL
  
      let url = '/api/inner-addressees'
      console.log(form)
      helper.http(url,'post',{ data: form }, 'Beneficiario agregado')
      .then((res:any) => {
        dialogBeneficiary.value = false
        getAddressInner()
      
      })
    }
    const createAddressOuter = (form: createBeneficiaryOuter) => {
      baseUrl.value = import.meta.env.VITE_API_URL
    
        let url = '/api/outer-addressees'
        console.log(form)
        helper.http(url,'post',{ data: form }, 'Beneficiario agregado')
        .then((res:any) => {
          dialogBeneficiary.value = false
          getAddressOuter()
        
        })
      }
      const createAddressCrypto = (form: createBeneficiaryCrypto) => {
        baseUrl.value = import.meta.env.VITE_API_URL
      
          let url = '/api/crypto-addressees'
          console.log(form)
          helper.http(url,'post',{ data: form }, 'Beneficiario agregado')
          .then((res:any) => {
            dialogBeneficiary.value = false
            getAddressCrypto()
          
          })
        }
    const getAddressInner = () => {
      baseUrl.value = import.meta.env.VITE_API_URL
    
        let url = '/api/inner-addressees'
        console.log(form)
        helper.http(url,'get',{ })
        .then((res:any) => {

          addressesInner.value = res.data.data
        })
      }
      const getAddressOuter = () => {
        baseUrl.value = import.meta.env.VITE_API_URL
      
          let url = '/api/outer-addressees'
          console.log(form)
          helper.http(url,'get',{ })
          .then((res:any) => {
  
            addressesOuter.value = res.data.data
          })
        }
        const getAddressCrypto = () => {
          baseUrl.value = import.meta.env.VITE_API_URL
        
            let url = '/api/crypto-addressees'
            console.log(form)
            helper.http(url,'get',{ })
            .then((res:any) => {
    
              addressesCrypto.value = res.data.data
            })
          }

const networksCrypto = ref([])
          const getNetworksCrypto = () => {
            baseUrl.value = import.meta.env.VITE_API_URL
          
              let url = '/api/configs/cryptocurrency-network'
              console.log(form)
              helper.http(url,'get',{ })
              .then((res:any) => {
      
                networksCrypto.value = res.data.data
              })
            }
          


//   const currency_id = ref<any>(null)

//   const getAccounts = () => {
    
//     let url = '/api/accounts'
//     helper.http(url,'get')

//         .then((res:any) => {
//           items.value = res.data.data
//         })
//         .catch(err => {
//           console.log(err)
//         })
//   }
  
//   const openModal = ref(false);
//   const createAccount = (currency:number) => {
//     let url = '/api/accounts'
//     let data = {
//       currency_id : currency
//     }
//     helper.http(url,'post',{data})
//     .then((res:any) => {
//       getAccounts()
//       toast('Cuenta creada correctamente', {
//         theme: 'colored',
//           type: 'success',
        
//       })
//       currency_id.value = null
//       openModal.value= false
//     })
//   }

  
//   const currencies = ref<Currency[]>([])

//   const getCurrencies = () => {
//     let url = `/api/currencies`

//     helper.http(url, 'get').then(
//         (res: any) => {
//           currencies.value = res.data.data
//         })
//   }

//   const deleteAccount = (id:number) => {
//     let url = `/api/accounts/${id}`

//     helper.http(url, 'delete').then(
//         (res: any) => {
//           getAccounts()
//           toast('Cuenta eliminada correctamente', {
//             theme: 'colored',
//               type: 'success',
            
//           })
//         })
//   }
  return {
    // getAccounts,

    form,
    dialogBeneficiary,
    loadingList,
    indexOwn,
    createTranferOwn,
    createTranferInner,
    createTranferCrypto,
    createTranferOuter,
    createAddressInner,
    getAddressInner,
    addressesInner,
    indexInner,
    indexOuter,
    getAddressOuter,
    getAddressCrypto,
    addressesOuter,
    addressesCrypto,
    indexCrypto,
    dialogConfirm,
    sms_token,
    createAddressOuter,
    createAddressCrypto,
    getNetworksCrypto,
    networksCrypto
    // openModal,
    // createAccount,
    // currencies,
    // getCurrencies,
    // deleteAccount,
    // currency_id
  }

  
interface Currency {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: any
}

  interface transferInterfaz {
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

  interface AddressesInnerInterface {
    account_id: string,
    comments: string
  }

  interface createBeneficiaryOuter {
    payment_method_id: number,
    currency_id: number,
    bank: string,
    name: string,
    account_number: string,
    iban: string,
    swift: string,
    country: string,
    reference: string
  }
  interface createBeneficiaryCrypto {
    crypto_currency_network_id: number,
    currency_id: number,
    name: string,
    email: string,
    wallet_address: string
  }
 
})
