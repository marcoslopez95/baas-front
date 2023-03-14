import { helperStore } from '../helper'

export const Store = defineStore('configs', () => {
  const helper = helperStore()
  
  const { url,baseUrl,pagination } = storeToRefs(helper)
  pagination.value.currentPage = 1
  baseUrl.value = import.meta.env.VITE_API_URL
  url.value = '/api/configs/countries'

  const countries = ref()
  const documentsTypes = ref()

  const getCountries = () => {
    url.value = '/api/configs/countries'
    helper.http(url.value, 'get').then((res: any) => {
      countries.value = res.data.data
      console.log('countries', countries)
    })
  }

  const getDocumentTypes = () => {
    url.value = '/api/configs/document-types'
    helper.http(url.value, 'get').then((res: any) => {
      documentsTypes.value = res.data.data
      console.log('countries', documentsTypes)
    })
  }


  const index = () =>{
    helper.index()
  }
  const form = ref({
    name:"",
    abbreviation:"",
    citizenship:"",
    phone_code:"",
    description:"",

  })

  

  return {
    form,
    index,
    getCountries,
    getDocumentTypes
  }
})
