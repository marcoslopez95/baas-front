import { defineStore } from 'pinia'
export const helperStore = defineStore('helper',() => {

  const isAutenticated = () => {
    return localStorage.getItem('token') || false
  }

  return {
    isAutenticated
  }
})

export const isAutenticated = () => {
  return localStorage.getItem('token') || false
}
