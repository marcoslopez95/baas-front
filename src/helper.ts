import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const helperStore = defineStore('helper',() => {
  const items = ref()
  const item = ref()
  const router = useRouter()

  const paginated = ref({
    "currentPage":1,
    "perPage":6,
  })
  const isAutenticated = () => {
    return localStorage.getItem('token') || false
  }

  const http = (url:string,method: Method = 'get', options: AxiosRequestConfig = {}) => {
    return new Promise(async (resolve, reject) => {
      try{
        let config: AxiosRequestConfig = {
          url,
          method,
          ...options
        }
        // console.log('asd',config)
        if(isAutenticated()){
          config.headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        let response: AxiosResponse = await axios(config)
        resolve(response)
      }catch(error: AxiosResponse | any){
        // console.log('aqui')
        if(error.response && error.response.status === 401){
          // console.log('aq2')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
        }
        reject(error)
      }
    })
  }
  return {
    isAutenticated,
    items,
    item,
    http,
    paginated
  }
})

export const isAutenticated = () => {
  return localStorage.getItem('token') || false
}

