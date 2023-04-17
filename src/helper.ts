import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { ToastOptions, toast } from 'vue3-toastify';

export const helperStore = defineStore('helper',() => {
  
  const loading = ref(false);
  const baseUrl = ref(import.meta.env.VITE_API_URL)
  const items = ref()
  const item = ref()
  const router = useRouter()
  const form = ref()
  const paginated = ref({
    "currentPage":1,
    "perPage":6,
  })
  const isAutenticated = () => {
    return localStorage.getItem('token') || false
  }
  
  const http = (url:string,method: Method = 'get', options: AxiosRequestConfig = {}, notification = '') => {
    return new Promise(async (resolve, reject) => {
      try{ 
        loading.value = true;

        let config: AxiosRequestConfig = {
          url,
          method,
          baseURL: baseUrl.value,
          ...options
        }
        // console.log('asd',config)
        if(isAutenticated()){
          config.headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        let response: AxiosResponse = await axios(config)
        if(notification){
          showNotify(notification)
        }
        resolve(response)
      }catch(error: AxiosResponse | any){
        console.log(error.response)
        if(error.response.data?.errors)
        getErrors(error.response.data.errors)

        else if(error.response.data?.message )
        toast(error.response.data.message, {
          theme: 'colored',          
          type: 'error'
        }); 
        else if(error.response.data?.data?.message )
        toast(error.response.data.data.message, {
          theme: 'colored',          
          type: 'error'
        }); 
        if(error.response && error.response.status === 401){
          // console.log('aq2')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
        }
        reject(error)
      }
      finally{
        loading.value = false
      }
    })
  }
  const url = ref('')

  const pagination = reactive({
    perPage: 15,
    currentPage: 1,
    to: 1,
    total: 0,
  })

  const perPage = [5, 10, 15]
  const index = async (params: any = {}) => {
    items.value = []
    let response: any = await http(url.value, 'get', {
      params: {
        ...params,
        perPage: pagination.perPage,
        currentPage: pagination.currentPage,
        paginated: 1
      },
    })
    items.value = response.data.data
    pagination.to = response.data.to
    pagination.total = response.data.last_page
  }

  const getErrors = (errors:any) => {
    let error:string[] = []
    let op:ToastOptions = {
      type: 'error',
    }
    if(errors){
    // console.log('asd',errors)
    for(let err in errors){
      // console.log('er',errors[err][0])
      error.push(errors[err][0])
    }
    }
    // console.log(error)
    error.forEach(er => showNotify(er,op))
    
  }

  const showNotify = (msg:string, options: ToastOptions = {type:'success'}) => {
    toast(msg, {
      theme: 'colored',
      ...options
    }); // ToastOptions
  }
  return {
    isAutenticated,
    items,
    item,
    http,
    paginated,
    form,
    showNotify,
    getErrors,
    baseUrl,
    pagination,
    index,
    perPage,
    url,
    loading
  }
})

export const isAutenticated = () => {
  return localStorage.getItem('token') || false
}

