import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { helperStore } from './../helper'

export const authStore = defineStore('auth', () => {
  const helper = helperStore()
  const router = useRouter()

  const login = (form: formLoginInterface) => {
    let url = '/api/auth/client-login'

    helper
      .http(url, 'post', { data: form }, 'logeado')
      .then(async (res: any) => {
        console.log('success', res)
        let new_token: string = res.data.data.accessToken

        localStorage.setItem('token', new_token.split('|')[1])
        await getUser()

        router.push('/')
      })
      .catch(err => {
        console.log('error', err)
      })
  }
  const steps = ref(1)

  const loading = ref(false)
  const errorsKyc = ref()
  const validateKyc = (form: formKycInterface) => {
    console.log(form)
    let data = new FormData()
    data.append('document_type_id', form.document_type_id)
    data.append('country_id', form.country_id)
    data.append('city', form.city)
    data.append('address', form.address)
    data.append('birthdate', form.birthdate)
    data.append('selfie', form.selfie)
    data.append('front_document', form.front_document)
    if(form.reverse_document)
    data.append('reverse_document', form.reverse_document)
    loading.value = true
    let url = '/api/auth/kyc-verification'
    helper
      .http(url, 'post', { data: data })
      .then((res: any) => {
        loading.value = false

        router.push('/profile')
      })
      .catch(async err => {
        loading.value = false

        if(err.response.status == 423){
          helper.showNotify(`${err.response.data.message}, tus documentos pasaran a verificacion manual`,{
            type: 'error',
          })
          await getUser()
          router.push('/profile')
        }else if(err.response?.data?.data?.body){
          steps.value = 3
          errorsKyc.value = JSON.parse(err.response.data.data.body)
        }
       

      })
  }
  const register = (form: formRegisterInterface) => {
    let url = '/api/auth/register'
    let headers = {
      'business-key': import.meta.env.VITE_BUSSINESS_KEY,
    }
    helper
      .http(url, 'post', { data: form, headers }, 'registro exitoso')
      .then(res => {
        router.push('/login')
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  const user = ref<userModel>({
    id: 0,
    business_id: 0,
    code: '',
    name: '',
    email: '',
  })
  const setUser = () => {
    let get_user = localStorage.getItem('user')
    if (!get_user) return null
    let user_local: userModel = JSON.parse(get_user)
    user.value = user_local
  }

  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      let url = '/api/auth/user'
      let token = localStorage.getItem('token')

      let headers = {
        Authorization: `Bearer ${token}`,
      }
      try {
        let res: AxiosResponse = await helper.http(url, 'get', { headers })
        localStorage.setItem('user', JSON.stringify(res.data.data))
        setUser()
        resolve(true)
      } catch (err) {
        // console.log("error",err);
        reject(err)
      }
    })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    user.value = {
      id: 0,
      business_id: 0,
      code: '',
      name: '',
      email: '',
    }

    router.push('/login')
  }

  const confirm_code = ref(false)
  const getForgotPassword = (email: string) => {
    let url = '/api/auth/forgot-password'
    let params = { email }
    // console.log('data',data)
    helper.http(url, 'get', { params }, 'correo enviado').then(res => {
      confirm_code.value = true
    })
  }

  const confirmForgotPassword = (form: FormConfirmForgotPassword) => {
    let url = '/api/auth/verify-password-recovery'
    let data = { ...form }
    helper.http(url, 'post', { data }, 'contraseña cambiada').then(res => {
      router.push('/login')
    })
  }

  return {
    login,
    register,
    user,
    logout,
    setUser,
    confirm_code,
    getForgotPassword,
    confirmForgotPassword,
    validateKyc,
    loading,
    errorsKyc,
    steps
  }

  interface FormConfirmForgotPassword {
    code: string
    password: string
    password_confirmation: string
  }

  interface userModel {
    id: number
    business_id: number
    code: string
    name: string
    email: string
    parent_id?: null
    root_id?: null
    password?: string
    // created_at?: "2023-01-26T16:42:08.000000Z",
    // updated_at: "2023-01-26T16:42:08.000000Z",
    // deleted_at: null
  }

  interface formLoginInterface {
    email: string
    password: string
  }

  interface formRegisterInterface {
    business_code: string
    name: string
    email: string
    password: string
    password_confirmation: string
  }

  interface formKycInterface {
    document_type_id: number
    country_id: number
    city: string
    address: string
    birthdate: string
    selfie: object
    front_document: object
    reverse_document: object
  }
})
