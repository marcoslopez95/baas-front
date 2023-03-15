import { helperStore } from '../helper'

export const configStore = defineStore('configs', () => {
  const helper = helperStore()

  const { url, baseUrl, pagination } = storeToRefs(helper)
  pagination.value.currentPage = 1
  baseUrl.value = import.meta.env.VITE_API_URL
  url.value = '/api/configs/countries'

  const countries = ref<Countries[]>([])
  const documentsTypes = ref<TypeDocument[]>([])
  const documenType = ref<object>({id:null, name:''})

  const setTypeDocument =(value: object)=>{
    console.log('store', value)
    documenType.value =  value
  }
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

  const index = () => {
    helper.index()
  }
  const form = ref({
    name: '',
    abbreviation: '',
    citizenship: '',
    phone_code: '',
    description: '',
  })

  return {
    form,
    index,
    countries,
    documentsTypes,
    getCountries,
    getDocumentTypes,
    documenType,
    setTypeDocument
  }

  interface Countries {
    abbreviation: string
    citizenship: string
    created_at: Date
    deleted_at?: Date
    description?: string
    id: number
    name: string
    phone_code: string
  }

  interface TypeDocument {
    id: number
    name: string
    description: string
    createdAt: Date
    deletedAt?: Date
  }
})
