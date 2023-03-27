import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { helperStore } from './../helper'
import { langTypes } from './../lang/index'

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
    data.append('document_type_id', `${form.document_type_id}`)
    data.append('country_id', `${form.country_id}`)
    data.append('city', form.city)
    data.append('address', form.address)
    data.append('birthdate', form.birthdate)
    data.append('phone_number', form.phone_number)
    data.append('selfie', form.selfie as Blob)
    data.append('front_document', form.front_document as Blob)
    if (form.reverse_document) data.append('reverse_document', form.reverse_document as Blob)
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
        await getUser()

        if (err.response.status == 423) {
          helper.showNotify(`${err.response.data.message}, tus documentos pasaran a verificacion manual`, {
            type: 'error',
          })
          router.push('/profile')
        } else if (err.response?.data?.data?.body) {
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
  const loadingProfile = ref(false)

  const updateProfile = (form: formRegisterInterface) => {
    let url = '/api/auth/update-profile'
    loadingProfile.value = true
    helper
      .http(url, 'post', { data: form }, 'Perfil editado correctamente')
      .then(res => {
        getUser()
        loadingProfile.value = false
      })
      .catch(err => {
        loadingProfile.value = false

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
  const statusKyc = ref<String>()
  const setUser = () => {
    let get_user = localStorage.getItem('user')
    if (!get_user) return null
    let user_local: userModel = JSON.parse(get_user)
    user.value = user_local
    statusKyc.value = user_local?.profile?.kycVerification?.general_status
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
    router.push('/login')

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    user.value = {
      id: 0,
      business_id: 0,
      code: '',
      name: '',
      email: '',
    }
  }

  const confirm_code = ref(false)
  const getForgotPassword = (email: string) => {
    let url = '/api/auth/forgot-password'
    let params = { email }
    // console.log('data',data)
    helper.http(url, 'get', { params }, 'Código enviado').then(res => {
      confirm_code.value = true
    })
  }

  const confirmForgotPassword = (form: FormConfirmForgotPassword, type: string) => {
    let url = '/api/auth/verify-password-recovery'
    let data = { ...form }
    helper.http(url, 'post', { data }, 'contraseña cambiada').then(res => {
      type == 'Recover' ? router.push('/login') : router.push('/profile')
    })
  }
  const sendCode = ref(false)
  const formEmail = ref({ email_token: '',sms_token: '', email: '' })
  const getResendCodeEmail = () => {
    let url = '/api/auth/change-email'
    let params = { email: formEmail.value.email }
    // console.log('data',data)
    sendCode.value = false
    helper.http(url, 'get', { params }, 'Código enviado').then(res => {
      // confirm_code.value = true
      sendCode.value = true
    })
  }

  const getVerifyUpdateEmail =() => {
    let url = '/api/auth/verify-change-email'
    let data = { ...formEmail.value }

    // console.log('data',data)
    helper.http(url, 'post', {data}, 'Correo actualizado correctamente').then(res => {
   formEmail.value = { email_token: '',sms_token: '', email: '' }

    sendCode.value = false

      getUser()

    })
  }
  const lang = ref<langTypes>('')
  lang.value = localStorage.getItem('lang')
  watch(lang, () => {
    if (localStorage.getItem('lang')) {
      localStorage.removeItem('lang')
    }
    localStorage.setItem('lang', lang.value)
  })

  const changeLang = (lang_i: langTypes) => {
    lang.value = lang_i
    if (localStorage.getItem('lang')) {
      localStorage.removeItem('lang')
    }
    localStorage.setItem('lang', lang.value)
    window.location.reload()
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
    steps,
    statusKyc,
    changeLang,
    lang,
    getUser,
    updateProfile,
    getResendCodeEmail,
    getVerifyUpdateEmail,
    loadingProfile,
    sendCode,
    formEmail
  }

  interface FormConfirmForgotPassword {
    code: string
    password: string
    password_confirmation: string
  }
  interface FormConfirmVerifyEmail {
    sms_token: string
    email_token: string
    email: string
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
    document_type_id: number | null
    country_id: number | null
    city: string
    address: string
    birthdate: string
    phone_number: string
    selfie: object | '' | string | Blob
    front_document: object | '' | string | Blob
    reverse_document: object | '' | string | Blob
  }
})
