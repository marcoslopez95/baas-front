import { defineStore } from 'pinia'

export const helperStore = defineStore('helper',() => {
  const items = ref()
  const item = ref()

  const isAutenticated = () => {
    return localStorage.getItem('token') || false
  }

  const getError = () => {
    
  }
  return {
    isAutenticated,
    items,
    item
  }
})

export const isAutenticated = () => {
  return localStorage.getItem('token') || false
}
